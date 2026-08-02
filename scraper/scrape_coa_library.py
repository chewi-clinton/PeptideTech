"""
Full COA library scrape via the site's own public first-party API
(`/api/coa/library`), discovered by inspecting network requests the live
/coa page makes client-side (no Supabase credentials involved — this is an
unauthenticated endpoint the site's own frontend calls). Replaces the
partial 24/264-record DOM-scroll capture with the complete real dataset,
plus downloads the real per-lot COA PDFs.
"""

import json
import re
from pathlib import Path

import requests

BASE = "https://peptidetech.is"
OUT_DIR = Path(__file__).parent / "scraped_data"
COA_PDF_DIR = OUT_DIR / "coa_pdfs"
SESSION = requests.Session()
SESSION.headers["User-Agent"] = "PeptideTechRebuildScraper/1.0 (+owner-authorized rebuild)"


def fetch_all_records():
    records = []
    page = 1
    page_size = 60
    while True:
        resp = SESSION.get(
            f"{BASE}/api/coa/library",
            params={"sort": "date", "page": page, "pageSize": page_size},
            timeout=30,
        )
        resp.raise_for_status()
        data = resp.json()
        records.extend(data["items"])
        print(f"page {page}: {len(data['items'])} items (total so far: {len(records)}/{data['total']})")
        if len(records) >= data["total"] or not data["items"]:
            break
        page += 1
    return records


def download_pdf(lot_number):
    dest = COA_PDF_DIR / f"{lot_number}.pdf"
    if dest.exists():
        return f"coa_pdfs/{dest.name}"
    resp = SESSION.get(f"{BASE}/coa/file/{lot_number}", timeout=30)
    if resp.status_code != 200 or "pdf" not in resp.headers.get("content-type", "").lower():
        return None
    dest.write_bytes(resp.content)
    return f"coa_pdfs/{dest.name}"


def main():
    COA_PDF_DIR.mkdir(parents=True, exist_ok=True)
    records = fetch_all_records()

    out = []
    for r in records:
        pdf_path = download_pdf(r["lotNumber"])
        analysis_date = r.get("analysisDate", "")
        date_str = re.match(r"(\d{4}-\d{2}-\d{2})", analysis_date or "")
        out.append(
            {
                "product_name": r.get("productName", ""),
                "product_slug": r.get("productSlug"),
                "lot_number": r.get("lotNumber", ""),
                "purity_percent": r.get("purity", ""),
                "test_date_iso": date_str.group(1) if date_str else None,
                "issuing_lab": r.get("lab", ""),
                "pdf_file": pdf_path,
            }
        )

    (OUT_DIR / "coa_records.json").write_text(json.dumps(out, indent=2))
    matched = sum(1 for r in out if r["product_slug"])
    with_pdf = sum(1 for r in out if r["pdf_file"])
    print(f"\nWrote {len(out)} COA records ({matched} matched to a product slug, {with_pdf} with a downloaded PDF)")


if __name__ == "__main__":
    main()
