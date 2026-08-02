from rest_framework.routers import DefaultRouter

from .views import BlogPostViewSet, LearnArticleViewSet, SiteDisclaimerViewSet, StaticPageViewSet

router = DefaultRouter()
router.register("blog", BlogPostViewSet, basename="blogpost")
router.register("learn", LearnArticleViewSet, basename="learnarticle")
router.register("pages", StaticPageViewSet, basename="staticpage")
router.register("disclaimers", SiteDisclaimerViewSet, basename="sitedisclaimer")

urlpatterns = router.urls
