from rest_framework import serializers

from .models import COA, Category, Product, ProductImage, ProductVariant


class ProductVariantWriteSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = ProductVariant
        fields = [
            "id",
            "label",
            "sku",
            "price",
            "compare_at_price",
            "in_stock",
            "is_default",
            "position",
        ]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "extra_html", "faq_html", "position"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "alt_text", "position", "is_primary"]


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = [
            "id",
            "label",
            "sku",
            "price",
            "compare_at_price",
            "in_stock",
            "is_default",
            "position",
        ]


class COASerializer(serializers.ModelSerializer):
    class Meta:
        model = COA
        fields = ["id", "lot_number", "purity_percent", "test_date", "issuing_lab", "file"]


class COALibrarySerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source="product.title", read_only=True)
    product_slug = serializers.CharField(source="product.slug", read_only=True)

    class Meta:
        model = COA
        fields = [
            "id",
            "lot_number",
            "purity_percent",
            "test_date",
            "issuing_lab",
            "file",
            "product_title",
            "product_slug",
        ]


class ProductListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    primary_image = serializers.SerializerMethodField()
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "slug",
            "short_description",
            "purity",
            "category",
            "primary_image",
            "variants",
        ]

    def get_primary_image(self, obj):
        image = obj.images.filter(is_primary=True).first() or obj.images.first()
        if not image:
            return None
        request = self.context.get("request")
        url = image.image.url
        return request.build_absolute_uri(url) if request else url


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    coas = COASerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "slug",
            "short_description",
            "description_html",
            "purity",
            "disclaimer_html",
            "faq_html",
            "category",
            "images",
            "variants",
            "coas",
        ]


class ProductAdminSerializer(serializers.ModelSerializer):
    """Full read/write serializer for the admin product manager. Variants are
    replaced wholesale on write (simplest correct behavior for a catalog of
    this size — a handful of variants per product, not hundreds)."""

    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), allow_null=True, required=False
    )
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantWriteSerializer(many=True, required=False)
    coas = COASerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "slug",
            "short_description",
            "description_html",
            "purity",
            "disclaimer_html",
            "faq_html",
            "category",
            "is_active",
            "images",
            "variants",
            "coas",
        ]

    def create(self, validated_data):
        variants_data = validated_data.pop("variants", [])
        product = Product.objects.create(**validated_data)
        for variant_data in variants_data:
            variant_data.pop("id", None)
            ProductVariant.objects.create(product=product, **variant_data)
        return product

    def update(self, instance, validated_data):
        variants_data = validated_data.pop("variants", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if variants_data is not None:
            existing_ids = {v["id"] for v in variants_data if "id" in v}
            instance.variants.exclude(id__in=existing_ids).delete()
            for variant_data in variants_data:
                variant_id = variant_data.pop("id", None)
                if variant_id:
                    ProductVariant.objects.filter(id=variant_id, product=instance).update(
                        **variant_data
                    )
                else:
                    ProductVariant.objects.create(product=instance, **variant_data)
        return instance
