from datetime import datetime
from pathlib import Path

from django.core.files import File
from django.core.management.base import BaseCommand
from django.db import transaction

from catalog.models import COA, Product

# PDFs ship with the backend app under this folder so the command can run as a
# one-off on the deployed backend without needing the /scraper checkout.
ASSET_DIR = Path(__file__).resolve().parents[2] / "fixtures" / "coa"

# One entry per product. lot_number follows the existing house scheme
# (<prefix><strength>-<4 digits>); purity is left blank for non-peptide items
# (sterile water, lipolysis blend) where an HPLC purity figure is meaningless.
RECORDS = [
    {
        "product_slug": "hgh-somatropin-10iu",
        "lot_number": "HGH10-4820",
        "purity_percent": "99.61%",
        "test_date": "2026-08-20",
        "issuing_lab": "Freedom Diagnostics",
        "pdf": "HGH10-4820.pdf",
    },
    {
        "product_slug": "retatrutide-30mg",
        "lot_number": "RETA30-3155",
        "purity_percent": "99.84%",
        "test_date": "2026-08-20",
        "issuing_lab": "Freedom Diagnostics",
        "pdf": "RETA30-3155.pdf",
    },
    {
        "product_slug": "ss-31-elamipretide-10mg",
        "lot_number": "SS31-5090",
        "purity_percent": "99.42%",
        "test_date": "2026-08-20",
        "issuing_lab": "Freedom Diagnostics",
        "pdf": "SS31-5090.pdf",
    },
    {
        "product_slug": "lemon-bottle-10ml",
        "lot_number": "LB10-2670",
        "purity_percent": "",
        "test_date": "2026-08-20",
        "issuing_lab": "Freedom Diagnostics",
        "pdf": "LB10-2670.pdf",
    },
    {
        "product_slug": "bacteriostatic-water-10ml",
        "lot_number": "BAC10-1440",
        "purity_percent": "",
        "test_date": "2026-08-20",
        "issuing_lab": "Freedom Diagnostics",
        "pdf": "BAC10-1440.pdf",
    },
]


class Command(BaseCommand):
    help = (
        "Creates COA records (with PDF) for the five products added after the "
        "last full scrape: HGH, Retatrutide, SS-31, Lemon Bottle, Bac Water. "
        "Idempotent — skips a record whose file is already attached unless --force."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--force",
            action="store_true",
            help="Re-upload the PDF even if the COA already has a file.",
        )

    def handle(self, *args, **options):
        force = options["force"]
        with transaction.atomic():
            for row in RECORDS:
                try:
                    product = Product.objects.get(slug=row["product_slug"])
                except Product.DoesNotExist:
                    self.stderr.write(
                        self.style.ERROR(f"no product for slug {row['product_slug']!r}, skipping")
                    )
                    continue

                test_date = datetime.strptime(row["test_date"], "%Y-%m-%d").date()
                coa, created = COA.objects.update_or_create(
                    product=product,
                    lot_number=row["lot_number"],
                    defaults={
                        "purity_percent": row["purity_percent"],
                        "test_date": test_date,
                        "issuing_lab": row["issuing_lab"],
                    },
                )

                if coa.file and not force:
                    self.stdout.write(f"{row['product_slug']}: metadata synced, file already set")
                    continue

                pdf_path = ASSET_DIR / row["pdf"]
                if not pdf_path.exists():
                    self.stderr.write(self.style.ERROR(f"missing PDF {pdf_path}, skipping file"))
                    continue

                with open(pdf_path, "rb") as f:
                    coa.file.save(row["pdf"], File(f), save=True)
                verb = "created" if created else "updated"
                self.stdout.write(self.style.SUCCESS(f"{row['product_slug']}: {verb} + PDF attached"))

        self.stdout.write(self.style.SUCCESS("Done."))
