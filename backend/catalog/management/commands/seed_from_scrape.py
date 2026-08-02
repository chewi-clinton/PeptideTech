import json
from datetime import datetime
from pathlib import Path

from django.core.files import File
from django.core.management.base import BaseCommand
from django.db import transaction

from catalog.models import COA, Category, Product, ProductImage, ProductVariant
from content.models import BlogPost, LearnArticle, SiteDisclaimer, StaticPage


class Command(BaseCommand):
    help = "Seeds the database from scraper/scraped_data/*.json, uploading images to the configured storage backend (MinIO, or local filesystem in dev)."

    def add_arguments(self, parser):
        default_dir = Path(__file__).resolve().parents[4] / "scraper" / "scraped_data"
        parser.add_argument("--data-dir", default=str(default_dir))

    def handle(self, *args, **options):
        data_dir = Path(options["data_dir"])
        if not data_dir.exists():
            self.stderr.write(self.style.ERROR(f"No such directory: {data_dir}"))
            return

        with transaction.atomic():
            self.seed_categories(data_dir)
            self.seed_products(data_dir)
            self.seed_blog_posts(data_dir)
            self.seed_learn_articles(data_dir)
            self.seed_static_pages(data_dir)
            self.seed_disclaimers(data_dir)
            self.seed_coa_records(data_dir)

        self.stdout.write(self.style.SUCCESS("Seed complete."))

    def _load(self, data_dir, name):
        path = data_dir / name
        if not path.exists():
            self.stdout.write(self.style.WARNING(f"missing {name}, skipping"))
            return []
        return json.loads(path.read_text())

    def _attach_image(self, field, local_path, images_root):
        full_path = images_root / local_path
        if not full_path.exists():
            return
        with open(full_path, "rb") as f:
            field.save(full_path.name, File(f), save=True)

    def seed_categories(self, data_dir):
        rows = self._load(data_dir, "categories.json")
        for i, row in enumerate(rows):
            Category.objects.update_or_create(
                slug=row["slug"],
                defaults={"name": row["name"], "description": row.get("description", ""), "position": i},
            )
        self.stdout.write(f"categories: {len(rows)}")

    def seed_products(self, data_dir):
        rows = self._load(data_dir, "products.json")
        images_root = data_dir
        for row in rows:
            category = None
            if row.get("category_slug"):
                category, _ = Category.objects.get_or_create(
                    slug=row["category_slug"],
                    defaults={"name": row.get("category_name") or row["category_slug"]},
                )

            faq_html = "".join(
                f"<div class=\"faq-item\"><h4>{item['question']}</h4><p>{item['answer']}</p></div>"
                for item in row.get("faq_items", [])
            )

            product, _ = Product.objects.update_or_create(
                slug=row["slug"],
                defaults={
                    "title": row["title"],
                    "category": category,
                    "short_description": row.get("short_description", ""),
                    "description_html": row.get("description_html", ""),
                    "purity": row.get("purity", ""),
                    "faq_html": faq_html,
                    "is_active": True,
                },
            )

            product.images.all().delete()
            for img in row.get("images", []):
                image = ProductImage(
                    product=product,
                    alt_text=product.title,
                    position=img["position"],
                    is_primary=(img["position"] == 0),
                )
                self._attach_image(image.image, img["path"], images_root)

            product.variants.all().delete()
            for v in row.get("variants", []):
                ProductVariant.objects.create(
                    product=product,
                    label=v["label"],
                    sku=v["sku"],
                    price=v["price"] or 0,
                    in_stock=v.get("in_stock", True),
                    is_default=(v["position"] == 0),
                    position=v["position"],
                )
        self.stdout.write(f"products: {len(rows)}")

    def seed_blog_posts(self, data_dir):
        rows = self._load(data_dir, "blog_posts.json")
        images_root = data_dir
        for row in rows:
            post, _ = BlogPost.objects.update_or_create(
                slug=row["slug"],
                defaults={
                    "title": row.get("title", ""),
                    "excerpt": row.get("excerpt", ""),
                    "body_html": row.get("body_html", ""),
                    "published_at": row.get("published_at"),
                },
            )
            if row.get("cover_image"):
                self._attach_image(post.cover_image, row["cover_image"], images_root)
        self.stdout.write(f"blog_posts: {len(rows)}")

    def seed_learn_articles(self, data_dir):
        rows = self._load(data_dir, "learn_articles.json")
        images_root = data_dir
        for row in rows:
            article, _ = LearnArticle.objects.update_or_create(
                slug=row["slug"],
                defaults={"title": row.get("title", ""), "body_html": row.get("body_html", "")},
            )
            if row.get("cover_image"):
                self._attach_image(article.cover_image, row["cover_image"], images_root)
        self.stdout.write(f"learn_articles: {len(rows)}")

    def seed_static_pages(self, data_dir):
        rows = self._load(data_dir, "static_pages.json")
        for row in rows:
            StaticPage.objects.update_or_create(
                slug=row["slug"],
                defaults={
                    "title": row.get("title", ""),
                    "body_html": row.get("body_html", ""),
                    "meta_description": row.get("meta_description", ""),
                },
            )
        self.stdout.write(f"static_pages: {len(rows)}")

    def seed_disclaimers(self, data_dir):
        rows = self._load(data_dir, "disclaimers.json")
        for row in rows:
            SiteDisclaimer.objects.update_or_create(
                key=row["key"],
                defaults={"label": row.get("label", ""), "body_html": row.get("body_html", "")},
            )
        self.stdout.write(f"disclaimers: {len(rows)}")

    def seed_coa_records(self, data_dir):
        rows = self._load(data_dir, "coa_records.json")
        created = 0
        for row in rows:
            if not row.get("product_slug") or not row.get("lot_number"):
                continue
            try:
                product = Product.objects.get(slug=row["product_slug"])
            except Product.DoesNotExist:
                continue

            test_date = None
            if row.get("test_date_iso"):
                try:
                    test_date = datetime.strptime(row["test_date_iso"], "%Y-%m-%d").date()
                except ValueError:
                    test_date = None
            elif row.get("test_date"):
                try:
                    test_date = datetime.strptime(row["test_date"], "%b %d, %Y").date()
                except ValueError:
                    test_date = None

            coa, _ = COA.objects.update_or_create(
                product=product,
                lot_number=row["lot_number"],
                defaults={
                    "purity_percent": row.get("purity_percent") or "",
                    "test_date": test_date,
                    "issuing_lab": row.get("issuing_lab") or "",
                },
            )
            if row.get("pdf_file"):
                self._attach_image(coa.file, row["pdf_file"], data_dir)
            created += 1
        self.stdout.write(f"coa_records: {created}")
