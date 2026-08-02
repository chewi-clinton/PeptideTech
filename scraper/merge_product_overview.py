"""
Merges the rich, client-hydrated `.pep-pdp-overview` fragment (Research
Background, Specifications table, Storage & Handling, References, etc. —
real per-product content confirmed absent from raw server HTML, captured via
visual/render_products.mjs) into products.json's description_html.
"""

import json
from pathlib import Path

BASE_DIR = Path(__file__).parent
PRODUCTS = BASE_DIR / "scraped_data" / "products.json"
RENDERED_DIR = BASE_DIR / "scraped_data" / "rendered_products"


def main():
    products = json.loads(PRODUCTS.read_text())
    merged = 0
    for p in products:
        f = RENDERED_DIR / f"{p['slug']}.html"
        if not f.exists():
            continue
        fragment = f.read_text().strip()
        if not fragment:
            continue
        p["description_html"] = fragment
        merged += 1
    PRODUCTS.write_text(json.dumps(products, indent=2))
    print(f"merged rich overview content into {merged}/{len(products)} products")


if __name__ == "__main__":
    main()
