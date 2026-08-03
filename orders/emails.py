import logging

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

logger = logging.getLogger(__name__)


def _send_multipart(subject, template_base, to, context):
    context = {**context, "site_url": settings.SITE_URL}
    text_body = render_to_string(f"{template_base}.txt", context)
    html_body = render_to_string(f"{template_base}.html", context)
    message = EmailMultiAlternatives(subject, text_body, settings.DEFAULT_FROM_EMAIL, to)
    message.attach_alternative(html_body, "text/html")
    message.send(fail_silently=False)


def send_order_confirmation(order):
    subject = f"Order {order.order_number} received"
    try:
        _send_multipart(
            subject, "orders/customer_confirmation", [order.email], {"order": order}
        )
    except Exception:
        # The order is already saved by this point — a broken SMTP relay
        # must never turn into a 500 for the customer or lose the order.
        logger.exception("Failed to send order confirmation email for %s", order.order_number)


def send_admin_order_alert(order):
    subject = f"New order {order.order_number}"
    try:
        _send_multipart(
            subject,
            "orders/admin_alert",
            [settings.ADMIN_ALERT_EMAIL],
            {"order": order},
        )
    except Exception:
        logger.exception("Failed to send admin order alert email for %s", order.order_number)
