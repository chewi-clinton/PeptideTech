"""
Django settings for the Peptide Technologies backend.
"""

from pathlib import Path

import dj_database_url
from decouple import Csv, config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("SECRET_KEY", default="django-insecure-local-dev-only-change-me")
DEBUG = config("DEBUG", default=True, cast=bool)
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="localhost,127.0.0.1", cast=Csv())

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework.authtoken",
    "django_filters",
    "corsheaders",
    "catalog",
    "content",
    "orders",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# Database — DATABASE_URL drives everything (real Postgres via docker-compose
# locally, the user's VPS Postgres URL in prod). Falls back to sqlite only if
# DATABASE_URL isn't set at all, so `manage.py` works before docker-compose is up.
# Read via decouple.config() (not dj_database_url.config(), which only checks
# real process env vars) so a local .env file is honored the same way it is
# for every other setting below.
DATABASES = {
    "default": dj_database_url.parse(
        config("DATABASE_URL", default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}"),
        conn_max_age=600,
    )
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --- REST framework ---------------------------------------------------------

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ],
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
}

# --- CORS --------------------------------------------------------------------

CORS_ALLOWED_ORIGINS = config(
    "CORS_ALLOWED_ORIGINS",
    default="http://localhost:3000,http://127.0.0.1:3000",
    cast=Csv(),
)

# --- Static files --------------------------------------------------------------

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# --- Media / MinIO (S3-compatible) -------------------------------------------
# MinIO speaks the S3 API, so django-storages' S3Boto3Storage talks to it
# directly via boto3 — no MinIO-specific SDK needed. When MINIO_* env vars
# aren't set (e.g. running manage.py without docker-compose), media falls back
# to local filesystem storage so nothing breaks without real credentials.

MINIO_ENDPOINT = config("MINIO_ENDPOINT", default="")
MINIO_ACCESS_KEY = config("MINIO_ACCESS_KEY", default="")
MINIO_SECRET_KEY = config("MINIO_SECRET_KEY", default="")
MINIO_BUCKET_NAME = config("MINIO_BUCKET_NAME", default="peptidetech")
MINIO_USE_SSL = config("MINIO_USE_SSL", default=False, cast=bool)
# Host:port the *browser* can reach (e.g. "localhost:13002" in dev, the VPS's
# public MinIO host:port in prod) — distinct from MINIO_ENDPOINT, which is
# the internal address Django/boto3 uses to talk to MinIO directly (e.g. the
# "minio:9000" Docker-network hostname, unreachable from outside the network).
# Without this split, image URLs returned by the API embed the internal
# hostname and 404 for every real client.
MINIO_PUBLIC_ENDPOINT = config("MINIO_PUBLIC_ENDPOINT", default="localhost:13002")

if MINIO_ENDPOINT and MINIO_ACCESS_KEY and MINIO_SECRET_KEY:
    AWS_ACCESS_KEY_ID = MINIO_ACCESS_KEY
    AWS_SECRET_ACCESS_KEY = MINIO_SECRET_KEY
    AWS_STORAGE_BUCKET_NAME = MINIO_BUCKET_NAME
    AWS_S3_ENDPOINT_URL = MINIO_ENDPOINT
    AWS_S3_CUSTOM_DOMAIN = f"{MINIO_PUBLIC_ENDPOINT}/{MINIO_BUCKET_NAME}"
    AWS_S3_URL_PROTOCOL = "https:" if MINIO_USE_SSL else "http:"
    AWS_S3_USE_SSL = MINIO_USE_SSL
    AWS_S3_VERIFY = MINIO_USE_SSL
    AWS_S3_ADDRESSING_STYLE = "path"
    AWS_DEFAULT_ACL = "public-read"
    AWS_QUERYSTRING_AUTH = False
    AWS_S3_FILE_OVERWRITE = False

    STORAGES = {
        "default": {"BACKEND": "storages.backends.s3.S3Storage"},
        "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
    }
else:
    MEDIA_URL = "/media/"
    MEDIA_ROOT = BASE_DIR / "media"
    STORAGES = {
        "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
        "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
    }

# --- Email ---------------------------------------------------------------------
# Order confirmation / admin alert emails. Falls back to the console backend
# (prints to stdout) when SMTP env vars aren't set, so local dev/testing works
# without real credentials — same fallback philosophy as MinIO above.

EMAIL_HOST = config("EMAIL_HOST", default="")
if EMAIL_HOST:
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    EMAIL_PORT = config("EMAIL_PORT", default=587, cast=int)
    EMAIL_HOST_USER = config("EMAIL_HOST_USER", default="")
    EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD", default="")
    EMAIL_USE_TLS = config("EMAIL_USE_TLS", default=True, cast=bool)
else:
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL", default="orders@peptidetech.is")
ADMIN_ALERT_EMAIL = config("ADMIN_ALERT_EMAIL", default="orders@peptidetech.is")
SITE_URL = config("SITE_URL", default="http://localhost:3000")
