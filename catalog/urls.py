from rest_framework.routers import DefaultRouter

from .views import CategoryViewSet, COALibraryViewSet, ProductAdminViewSet, ProductViewSet

router = DefaultRouter()
router.register("products", ProductViewSet, basename="product")
router.register("categories", CategoryViewSet, basename="category")
router.register("coa-library", COALibraryViewSet, basename="coa-library")
router.register("admin/products", ProductAdminViewSet, basename="admin-product")

urlpatterns = router.urls
