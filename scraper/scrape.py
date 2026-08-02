"""
Scrapes peptidetech.is (the user's own site) into structured JSON + a local
image folder, for the Django seed_from_scrape management command to consume.

Content is server-rendered Next.js HTML, so plain requests + BeautifulSoup is
enough — no headless browser needed here (that's reserved for the separate
visual-capture pass). Product/category/blog pages embed schema.org JSON-LD
(Product, BreadcrumbList, FAQPage, Article, CollectionPage) which is used as
the primary structured-data source since it's more reliable than parsing the
inline-styled markup.
"""

import hashlib
import json
import re
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

BASE = "https://peptidetech.is"
OUT_DIR = Path(__file__).parent / "scraped_data"
IMAGES_DIR = OUT_DIR / "images"
SESSION = requests.Session()
SESSION.headers["User-Agent"] = "PeptideTechRebuildScraper/1.0 (+owner-authorized rebuild)"


def fetch(url):
    resp = SESSION.get(url, timeout=30)
    resp.raise_for_status()
    return resp.text


def get_sitemap_urls():
    xml = fetch(f"{BASE}/sitemap.xml")
    return re.findall(r"<loc>([^<]+)</loc>", xml)


def json_ld_blocks(soup):
    blocks = []
    for tag in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(tag.string)
        except (TypeError, ValueError):
            continue
        blocks.append(data)
    return blocks


def find_by_type(blocks, type_name):
    for b in blocks:
        types = b.get("@type")
        if types == type_name or (isinstance(types, list) and type_name in types):
            return b
    return None


_downloaded = {}


def download_image(url):
    """Downloads an image once, dedupes by URL, returns local relative path."""
    if url in _downloaded:
        return _downloaded[url]
    parsed = urlparse(url)
    ext = Path(parsed.path).suffix or ".jpg"
    digest = hashlib.sha1(url.encode()).hexdigest()[:12]
    base_name = Path(parsed.path).stem or "image"
    base_name = re.sub(r"[^a-zA-Z0-9_-]", "-", base_name)
    filename = f"{base_name}-{digest}{ext}"
    dest = IMAGES_DIR / filename
    if not dest.exists():
        try:
            resp = SESSION.get(url, timeout=30)
            resp.raise_for_status()
            dest.write_bytes(resp.content)
        except requests.RequestException as e:
            print(f"  ! image download failed: {url} ({e})")
            return None
    rel = f"images/{filename}"
    _downloaded[url] = rel
    return rel


def clean_html_fragment(tag):
    """Returns inner HTML of a bs4 tag as a string, or '' if None."""
    if tag is None:
        return ""
    return tag.decode_contents().strip()


def scrape_product(url, slug):
    html = fetch(url)
    soup = BeautifulSoup(html, "lxml")
    blocks = json_ld_blocks(soup)
    product = find_by_type(blocks, "Product")
    breadcrumbs = find_by_type(blocks, "BreadcrumbList")
    faq = find_by_type(blocks, "FAQPage")

    if not product:
        print(f"  ! no Product JSON-LD found for {url}, skipping")
        return None

    category_slug = None
    category_name = None
    if breadcrumbs:
        items = breadcrumbs.get("itemListElement", [])
        for item in items:
            item_url = item.get("item", "")
            if "/c/" in item_url:
                category_slug = item_url.rstrip("/").split("/c/")[-1]
                category_name = item.get("name")

    images = []
    for i, img_url in enumerate(product.get("image", [])):
        if "pubchem.ncbi.nlm.nih.gov" in img_url:
            continue  # third-party reference diagram, not a product photo — skip
        local = download_image(img_url)
        if local:
            images.append({"path": local, "position": i})

    variants = []
    offers = product.get("offers", {})
    offer_list = offers.get("offers") if isinstance(offers, dict) else None
    if offer_list:
        for i, offer in enumerate(offer_list):
            variants.append(
                {
                    "sku": offer.get("sku") or f"{product.get('sku', slug.upper())}-{i}",
                    "label": (offer.get("name") or "").replace(product.get("name", ""), "").strip()
                    or offer.get("name", f"Option {i + 1}"),
                    "price": offer.get("price"),
                    "in_stock": "OutOfStock" not in offer.get("availability", ""),
                    "position": i,
                }
            )
    elif isinstance(offers, dict) and offers.get("price"):
        variants.append(
            {
                "sku": product.get("sku", slug.upper()),
                "label": "Default",
                "price": offers.get("price"),
                "in_stock": True,
                "position": 0,
            }
        )

    faq_items = []
    if faq:
        for q in faq.get("mainEntity", []):
            faq_items.append(
                {
                    "question": q.get("name", ""),
                    "answer": q.get("acceptedAnswer", {}).get("text", ""),
                }
            )

    purity = ""
    for item in faq_items:
        m = re.search(r"(≥?\s?\d{2,3}(?:\.\d+)?%)\s*purity", item["answer"], re.I)
        if m:
            purity = m.group(1).replace("≥", "≥").strip()
            break

    return {
        "slug": slug,
        "title": product.get("name", ""),
        "short_description": product.get("description", ""),
        "description_html": f"<p>{product.get('description', '')}</p>",
        "purity": purity,
        "category_slug": category_slug,
        "category_name": category_name,
        "images": images,
        "variants": variants,
        "faq_items": faq_items,
    }


def scrape_category(url, slug):
    html = fetch(url)
    soup = BeautifulSoup(html, "lxml")
    blocks = json_ld_blocks(soup)
    collection = find_by_type(blocks, "CollectionPage")
    if not collection:
        print(f"  ! no CollectionPage JSON-LD for {url}")
        return {"slug": slug, "name": slug.replace("-", " ").title(), "description": ""}
    return {
        "slug": slug,
        "name": collection.get("name", slug),
        "description": collection.get("description", ""),
    }


def scrape_blog_post(url, slug):
    html = fetch(url)
    soup = BeautifulSoup(html, "lxml")
    blocks = json_ld_blocks(soup)
    article = find_by_type(blocks, "Article")
    body_tag = soup.select_one("article.prose")
    body_html = clean_html_fragment(body_tag)

    cover_image = None
    if article and article.get("image"):
        img_url = article["image"][0] if isinstance(article["image"], list) else article["image"]
        cover_image = download_image(img_url)

    return {
        "slug": slug,
        "title": article.get("headline", "") if article else "",
        "excerpt": article.get("description", "") if article else "",
        "body_html": body_html,
        "cover_image": cover_image,
        "published_at": article.get("datePublished") if article else None,
    }


def scrape_generic_page(url, slug, model="static"):
    """Used for /learn/<slug> and static/legal pages. Pulls <h1>, meta
    description, and the <main id="main-content"> fragment as body HTML."""
    html = fetch(url)
    soup = BeautifulSoup(html, "lxml")
    h1 = soup.find("h1")
    title = h1.get_text(strip=True) if h1 else slug.replace("-", " ").title()
    meta = soup.find("meta", attrs={"name": "description"})
    meta_description = meta["content"] if meta and meta.has_attr("content") else ""
    main = soup.find("main", id="main-content")
    body_html = clean_html_fragment(main)

    cover_image = None
    article = find_by_type(json_ld_blocks(soup), "Article")
    if article and article.get("image"):
        img_url = article["image"][0] if isinstance(article["image"], list) else article["image"]
        cover_image = download_image(img_url)

    return {
        "slug": slug,
        "title": title,
        "meta_description": meta_description,
        "body_html": body_html,
        "cover_image": cover_image,
    }


FOOTER_DISCLAIMER_SECTIONS = [
    "Research Use Only (RUO) labeling",
    "Not a compounding pharmacy or outsourcing facility",
    "Not drugs, supplements, or food",
    "Controlled substances & doping",
    "Jurisdiction, import & export",
    "California Proposition 65",
    "Limitation of liability",
]


def scrape_site_disclaimers():
    """Extracts the sitewide RUO/FDA/liability disclaimer footer block
    (present verbatim on every page) plus the compact top-bar strip.

    Structure (from the live DOM): each itemized section is a single <p> whose
    text starts with a bold <strong>Section title.</strong> lead-in followed by
    the body sentence(s) as plain text within the same <p>.
    """
    html = fetch(f"{BASE}/compliance")
    soup = BeautifulSoup(html, "lxml")
    disclaimers = []

    banner = soup.find(string=re.compile(r"For laboratory research use only"))
    if banner:
        disclaimers.append(
            {"key": "top-banner", "label": "Top banner strip", "body_html": f"<p>{banner.strip()}</p>"}
        )

    intro = soup.find(string=re.compile(r"By purchasing or using any product"))
    if intro:
        p = intro.find_parent("p") or intro.parent
        disclaimers.append(
            {
                "key": "footer-intro",
                "label": "Footer disclaimer — intro",
                "body_html": f"<p>{p.get_text(' ', strip=True)}</p>",
            }
        )

    for section_title in FOOTER_DISCLAIMER_SECTIONS:
        strong = None
        for candidate in soup.find_all("strong"):
            if candidate.get_text(strip=True).rstrip(".").strip() == section_title:
                strong = candidate
                break
        if not strong:
            print(f"  ! disclaimer section not found: {section_title}")
            continue
        p = strong.find_parent("p")
        if not p:
            continue
        full_text = p.get_text(" ", strip=True)
        title_text = strong.get_text(strip=True).rstrip(".")
        body_text = full_text[len(title_text):].lstrip(". ").strip() if full_text.startswith(title_text) else full_text
        key = re.sub(r"[^a-z0-9]+", "-", section_title.lower()).strip("-")
        disclaimers.append(
            {
                "key": key,
                "label": section_title,
                "body_html": f"<h4>{section_title}</h4><p>{body_text}</p>",
            }
        )

    return disclaimers


def slug_from(url, prefix):
    return url.rstrip("/").split(prefix)[-1]


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)

    urls = get_sitemap_urls()
    print(f"Sitemap: {len(urls)} URLs")

    products, categories, blog_posts, learn_articles, static_pages = [], [], [], [], []

    for url in urls:
        path = urlparse(url).path
        try:
            if path.startswith("/p/"):
                slug = slug_from(url, "/p/")
                print(f"[product] {slug}")
                data = scrape_product(url, slug)
                if data:
                    products.append(data)
            elif path.startswith("/c/"):
                slug = slug_from(url, "/c/")
                print(f"[category] {slug}")
                categories.append(scrape_category(url, slug))
            elif path.startswith("/blog/"):
                slug = slug_from(url, "/blog/")
                print(f"[blog] {slug}")
                blog_posts.append(scrape_blog_post(url, slug))
            elif path.startswith("/learn/"):
                slug = slug_from(url, "/learn/")
                print(f"[learn] {slug}")
                learn_articles.append(scrape_generic_page(url, slug))
            elif path in ("", "/", "/shop"):
                continue  # homepage/shop listing — no dedicated content model
            else:
                slug = path.strip("/") or "home"
                print(f"[page] {slug}")
                static_pages.append(scrape_generic_page(url, slug))
        except requests.RequestException as e:
            print(f"  ! failed {url}: {e}")
        time.sleep(0.15)  # polite pacing against our own site

    print("[disclaimers] extracting sitewide footer block")
    disclaimers = scrape_site_disclaimers()

    (OUT_DIR / "products.json").write_text(json.dumps(products, indent=2))
    (OUT_DIR / "categories.json").write_text(json.dumps(categories, indent=2))
    (OUT_DIR / "blog_posts.json").write_text(json.dumps(blog_posts, indent=2))
    (OUT_DIR / "learn_articles.json").write_text(json.dumps(learn_articles, indent=2))
    (OUT_DIR / "static_pages.json").write_text(json.dumps(static_pages, indent=2))
    (OUT_DIR / "disclaimers.json").write_text(json.dumps(disclaimers, indent=2))

    print(
        f"\nDone. products={len(products)} categories={len(categories)} "
        f"blog_posts={len(blog_posts)} learn_articles={len(learn_articles)} "
        f"static_pages={len(static_pages)} disclaimers={len(disclaimers)} "
        f"images={len(_downloaded)}"
    )


if __name__ == "__main__":
    main()
