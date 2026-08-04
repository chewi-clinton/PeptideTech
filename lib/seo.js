export const SITE_URL = "https://peptidetech.cc";
export const SITE_NAME = "Peptide Technologies";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function truncate(text, max = 160) {
  if (!text) return undefined;
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

// Some scraped body_html (learn articles, static pages) already carries its
// own schema.org <script> blocks from the original site. Reuse the real
// `description` those already embed for our own <meta name="description">
// instead of writing a second, possibly-diverging one by hand.
export function extractJsonLdField(html, field) {
  if (!html) return undefined;
  const match = html.match(new RegExp(`"${field}"\\s*:\\s*"([^"]*)"`));
  if (!match) return undefined;
  try {
    return JSON.parse(`"${match[1]}"`);
  } catch {
    return match[1];
  }
}

export function buildMetadata({
  title,
  description,
  keywords,
  path,
  image,
  type = "website",
  noIndex = false,
  // Bypasses the root layout's `%s — Peptide Technologies` title template —
  // for pages (like the homepage) whose title already includes the brand
  // name, so it isn't appended a second time.
  absoluteTitle = false,
}) {
  const url = path ? absoluteUrl(path) : undefined;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type,
      ...(url ? { url } : {}),
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "Peptech",
    url: SITE_URL,
    logo: absoluteUrl("/icon.png"),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(product, path) {
  const variant = product.variants?.find((v) => v.is_default) || product.variants?.[0];
  const image = product.images?.find((img) => img.is_primary)?.image || product.images?.[0]?.image;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: truncate(stripHtml(product.short_description), 500),
    ...(image ? { image: [image] } : {}),
    ...(variant?.sku ? { sku: variant.sku } : {}),
    ...(product.category?.name ? { category: product.category.name } : {}),
    brand: { "@type": "Brand", name: SITE_NAME },
    ...(variant
      ? {
          offers: {
            "@type": "Offer",
            url: absoluteUrl(path),
            priceCurrency: "USD",
            price: variant.price,
            availability: variant.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        }
      : {}),
  };
}

export function articleJsonLd({ title, description, image, datePublished, path, author = "Peptech Lab" }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    ...(description ? { description } : {}),
    ...(image ? { image: [image] } : {}),
    ...(datePublished ? { datePublished, dateModified: datePublished } : {}),
    author: { "@type": "Organization", name: author },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
  };
}
