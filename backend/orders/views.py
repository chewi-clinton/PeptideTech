from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Order
from .serializers import OrderLookupSerializer, OrderSerializer, OrderStatusUpdateSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.prefetch_related("items").all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action in ("create", "lookup"):
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_serializer_class(self):
        if self.action in ("update", "partial_update"):
            return OrderStatusUpdateSerializer
        if self.action == "lookup":
            return OrderLookupSerializer
        return OrderSerializer

    @action(detail=False, methods=["get"])
    def lookup(self, request):
        order_number = request.query_params.get("order_number", "")
        email = request.query_params.get("email", "")
        try:
            order = Order.objects.get(order_number__iexact=order_number, email__iexact=email)
        except Order.DoesNotExist:
            return Response({"detail": "Order not found."}, status=404)
        return Response(self.get_serializer(order).data)
