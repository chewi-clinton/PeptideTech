from django.db import models

PAYMENT_METHOD_CHOICES = [
    ("zelle", "Zelle"),
    ("chime", "Chime"),
    ("apple_pay", "Apple Pay"),
    ("cash_app", "Cash App"),
    ("e_transfer", "E-Transfer"),
    ("bank_transfer", "Bank Transfer"),
    ("payid", "PayID"),
    ("crypto", "Crypto"),
]

STATUS_CHOICES = [
    ("pending", "Pending"),
    ("paid", "Paid"),
    ("fulfilled", "Fulfilled"),
    ("cancelled", "Cancelled"),
]


class Order(models.Model):
    order_number = models.CharField(max_length=32, unique=True)
    customer_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)

    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=120)
    state = models.CharField(max_length=120, blank=True)
    postal_code = models.CharField(max_length=30)
    country = models.CharField(max_length=120)

    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    total = models.DecimalField(max_digits=10, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.order_number


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product_title = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product_title}"
