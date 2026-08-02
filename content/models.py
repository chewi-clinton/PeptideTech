from django.db import models


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    excerpt = models.TextField(blank=True)
    body_html = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to="blog/", blank=True, null=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-published_at"]

    def __str__(self):
        return self.title


class LearnArticle(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    body_html = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to="learn/", blank=True, null=True)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title


class StaticPage(models.Model):
    """Generic content model for legal/marketing pages (about, faq, shipping,
    returns, terms, privacy, compliance, wholesale, membership, giving, heroes,
    affiliates, build-a-kit, price-match, purity-guarantee-terms,
    verified-peptides, coa, contact) — scraped verbatim from the live site."""

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    body_html = models.TextField(blank=True)
    meta_description = models.CharField(max_length=500, blank=True)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title


class SiteDisclaimer(models.Model):
    """Reusable regulatory disclaimer blocks (RUO, FDA non-evaluation, liability,
    21+/lawful-research-use language) scraped verbatim and reused across the
    footer and product pages, keyed by a stable identifier."""

    key = models.SlugField(max_length=100, unique=True)
    label = models.CharField(max_length=255, blank=True)
    body_html = models.TextField()

    def __str__(self):
        return self.key
