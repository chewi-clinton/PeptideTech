from django.contrib import admin

from .models import BlogPost, LearnArticle, SiteDisclaimer, StaticPage


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ["title", "slug", "published_at"]
    prepopulated_fields = {"slug": ("title",)}


@admin.register(LearnArticle)
class LearnArticleAdmin(admin.ModelAdmin):
    list_display = ["title", "slug"]
    prepopulated_fields = {"slug": ("title",)}


@admin.register(StaticPage)
class StaticPageAdmin(admin.ModelAdmin):
    list_display = ["title", "slug"]
    prepopulated_fields = {"slug": ("title",)}


@admin.register(SiteDisclaimer)
class SiteDisclaimerAdmin(admin.ModelAdmin):
    list_display = ["key", "label"]
