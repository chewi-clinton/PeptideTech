from rest_framework import serializers

from .models import BlogPost, LearnArticle, SiteDisclaimer, StaticPage


class BlogPostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ["id", "title", "slug", "excerpt", "cover_image", "published_at"]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ["id", "title", "slug", "excerpt", "body_html", "cover_image", "published_at"]


class LearnArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearnArticle
        fields = ["id", "title", "slug", "body_html", "cover_image"]


class StaticPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaticPage
        fields = ["id", "title", "slug", "body_html", "meta_description"]


class SiteDisclaimerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteDisclaimer
        fields = ["key", "label", "body_html"]
