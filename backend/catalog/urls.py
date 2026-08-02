from rest_framework.routers import DefaultRouter

from .views import CategoryViewSet, COALibraryViewSet, ProductViewSet

router = DefaultRouter()
router.register("products", ProductViewSet, basename="product")
router.register("categories", CategoryViewSet, basename="category")
router.register("coa-library", COALibraryViewSet, basename="coa-library")

urlpatterns = router.urls
