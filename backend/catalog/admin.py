from django.contrib import admin

from .models import COA, Category, Product, ProductImage, ProductVariant


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 0


class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 0


class COAInline(admin.TabularInline):
    model = COA
    extra = 0


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "position"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["title", "slug", "category", "is_active"]
    list_filter = ["category", "is_active"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ProductImageInline, ProductVariantInline, COAInline]
