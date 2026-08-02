"""
Parses the post-hydration /coa page dump (scraped_data/rendered/coa.html,
produced by visual/render_dynamic.mjs headless-browser pass, since this page
has no server-rendered content) into structured COA lot records, matched to
scraped products by slugified title.

This is a bounded, best-effort capture (whatever loaded during a scripted
scroll pass), not the full 264-lot library the live page reports — noted
explicitly rather than presented as complete.
"""

import json
import re
from pathlib import Path

from bs4 import BeautifulSoup

BASE_DIR = Path(__file__).parent
RENDERED = BASE_DIR / "scraped_data" / "rendered" / "coa.html"
PRODUCTS = BASE_DIR / "scraped_data" / "products.json"
OUT = BASE_DIR / "scraped_data" / "coa_records.json"


def slugify(text):
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def main():
    products = json.loads(PRODUCTS.read_text())
    by_norm_title = {slugify(p["title"]): p["slug"] for p in products}

    soup = BeautifulSoup(RENDERED.read_text(), "lxml")
    main_el = soup.find("main", id="main-content")
    cards = main_el.find_all(
        "div",
        style=lambda s: s and "border-radius: 16px" in s and "border: 1px solid var(--line)" in s,
    )

    records = []
    unmatched = []
    for card in cards:
        text = card.get_text(" | ", strip=True)
        parts = [p.strip() for p in text.split("|")]
        if len(parts) < 10:
            continue
        product_name = parts[0]
        lot_match = re.search(r"Lot\s+([A-Z0-9-]+)", text)
        purity_match = re.search(r"([\d.]+%)", text)
        date_match = re.search(r"Tested\s*\|?\s*([A-Za-z]+ \d{1,2}, \d{4})", text)
        lab_match = re.search(r"Testing lab\s*\|?\s*([^|]+)", text)

        product_slug = by_norm_title.get(slugify(product_name))
        record = {
            "product_name": product_name,
            "product_slug": product_slug,
            "lot_number": lot_match.group(1) if lot_match else "",
            "purity_percent": purity_match.group(1) if purity_match else "",
            "test_date": date_match.group(1) if date_match else "",
            "issuing_lab": lab_match.group(1).strip() if lab_match else "",
        }
        records.append(record)
        if not product_slug:
            unmatched.append(product_name)

    OUT.write_text(json.dumps(records, indent=2))
    print(f"wrote {len(records)} COA records ({len(records) - len(unmatched)} matched to products)")
    if unmatched:
        print("unmatched product names:", unmatched)


if __name__ == "__main__":
    main()
