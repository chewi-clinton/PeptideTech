from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response

from .models import COA, Category, Product, ProductImage
from .serializers import (
    CategorySerializer,
    COALibrarySerializer,
    ProductAdminSerializer,
    ProductDetailSerializer,
    ProductImageSerializer,
    ProductListSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
    filterset_fields = ["category__slug"]

    def get_serializer_class(self):
        if self.action == "list":
            return ProductListSerializer
        return ProductDetailSerializer

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True).select_related("category")
        # The list serializer never touches `coas` — skip prefetching it
        # there so every list request doesn't also pull (and discard) every
        # COA row for every product.
        if self.action == "list":
            return qs.prefetch_related("images", "variants")
        return qs.prefetch_related("images", "variants", "coas")


class COALibraryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = COA.objects.select_related("product").order_by("-test_date")
    serializer_class = COALibrarySerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ["product__slug"]


class ProductAdminViewSet(viewsets.ModelViewSet):
    """Full product management for the admin panel — separate from the
    public read-only ProductViewSet so the public catalog API's permissions
    and serializer shape never have to compromise for admin needs."""

    queryset = Product.objects.select_related("category").prefetch_related(
        "images", "variants", "coas"
    )
    serializer_class = ProductAdminSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    @action(detail=True, methods=["post"], url_path="images")
    def upload_image(self, request, pk=None):
        product = self.get_object()
        image = request.FILES.get("image")
        if not image:
            return Response({"detail": "No image file provided."}, status=400)
        instance = ProductImage.objects.create(
            product=product,
            image=image,
            alt_text=request.data.get("alt_text", ""),
            is_primary=request.data.get("is_primary") in ("true", "True", "1", True),
            position=product.images.count(),
        )
        return Response(ProductImageSerializer(instance).data, status=201)

    @action(detail=True, methods=["delete"], url_path="images/(?P<image_id>[^/.]+)")
    def delete_image(self, request, pk=None, image_id=None):
        product = self.get_object()
        deleted, _ = ProductImage.objects.filter(id=image_id, product=product).delete()
        if not deleted:
            return Response({"detail": "Image not found."}, status=404)
        return Response(status=204)
