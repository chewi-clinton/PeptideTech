from rest_framework import permissions, viewsets

from .models import BlogPost, LearnArticle, SiteDisclaimer, StaticPage
from .serializers import (
    BlogPostDetailSerializer,
    BlogPostListSerializer,
    LearnArticleSerializer,
    SiteDisclaimerSerializer,
    StaticPageSerializer,
)


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.all()
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "list":
            return BlogPostListSerializer
        return BlogPostDetailSerializer


class LearnArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LearnArticle.objects.all()
    serializer_class = LearnArticleSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"


class StaticPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StaticPage.objects.all()
    serializer_class = StaticPageSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"


class SiteDisclaimerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteDisclaimer.objects.all()
    serializer_class = SiteDisclaimerSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "key"
