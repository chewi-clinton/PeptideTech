from rest_framework import permissions, viewsets

from .models import COA, Category, Product
from .serializers import (
    CategorySerializer,
    COALibrarySerializer,
    ProductDetailSerializer,
    ProductListSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_active=True).select_related("category").prefetch_related(
        "images", "variants", "coas"
    )
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
    filterset_fields = ["category__slug"]

    def get_serializer_class(self):
        if self.action == "list":
            return ProductListSerializer
        return ProductDetailSerializer


class COALibraryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = COA.objects.select_related("product").order_by("-test_date")
    serializer_class = COALibrarySerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ["product__slug"]
