from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string


def send_order_confirmation(order):
    subject = f"Order {order.order_number} received"
    body = render_to_string("orders/customer_confirmation.txt", {"order": order})
    send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, [order.email], fail_silently=False)


def send_admin_order_alert(order):
    subject = f"New order {order.order_number}"
    body = render_to_string(
        "orders/admin_alert.txt", {"order": order, "site_url": settings.SITE_URL}
    )
    send_mail(
        subject,
        body,
        settings.DEFAULT_FROM_EMAIL,
        [settings.ADMIN_ALERT_EMAIL],
        fail_silently=False,
    )
