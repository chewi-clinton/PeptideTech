import logging

from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string

logger = logging.getLogger(__name__)


def send_order_confirmation(order):
    subject = f"Order {order.order_number} received"
    body = render_to_string("orders/customer_confirmation.txt", {"order": order})
    try:
        send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, [order.email], fail_silently=False)
    except Exception:
        # The order is already saved by this point — a broken SMTP relay
        # must never turn into a 500 for the customer or lose the order.
        logger.exception("Failed to send order confirmation email for %s", order.order_number)


def send_admin_order_alert(order):
    subject = f"New order {order.order_number}"
    body = render_to_string(
        "orders/admin_alert.txt", {"order": order, "site_url": settings.SITE_URL}
    )
    try:
        send_mail(
            subject,
            body,
            settings.DEFAULT_FROM_EMAIL,
            [settings.ADMIN_ALERT_EMAIL],
            fail_silently=False,
        )
    except Exception:
        logger.exception("Failed to send admin order alert email for %s", order.order_number)
