# Deploying to Dokploy

Repo layout: `main` is the source of truth (monorepo with `/frontend`, `/backend`,
`/minio`); the `frontend`, `backend`, and `minio` branches are root-level
mirrors of those folders (via `git subtree split`), so each Dokploy app can
point at its branch directly with no build-path configuration. Re-run the
subtree split + push after merging changes to `main` that touch a given
folder:

```
git subtree split --prefix=backend -b backend-split && git push origin backend-split:backend --force
git subtree split --prefix=frontend -b frontend-split -f && git push origin frontend-split:frontend --force
git subtree split --prefix=minio -b minio-split -f && git push origin minio-split:minio --force
git branch -D backend-split frontend-split minio-split
```

## `minio` app

| Env var | Notes |
|---|---|
| `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD` | credentials for the bucket |
| `MINIO_API_PORT` / `MINIO_CONSOLE_PORT` | host ports (defaults 13002/13003 — pick new ones if these collide on the VPS) |
| `MINIO_BUCKET_NAME` | defaults to `peptidetech` |

## `backend` app

| Env var | Notes |
|---|---|
| `SECRET_KEY` | real random value, not the dev default |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | backend's public domain/host |
| `DATABASE_URL` | the user's VPS Postgres URL |
| `CORS_ALLOWED_ORIGINS` | the frontend's public origin(s) |
| `MINIO_ENDPOINT` | address the backend uses to *reach* MinIO (internal/private network address) |
| `MINIO_PUBLIC_ENDPOINT` | `host:port` a browser can reach — used only to build image URLs. **Must differ from `MINIO_ENDPOINT`** if that's an internal-only address, or every image URL in the API 404s (see `backend/config/settings.py` comment) |
| `MINIO_ACCESS_KEY` / `MINIO_SECRET_KEY` / `MINIO_BUCKET_NAME` / `MINIO_USE_SSL` | match the `minio` app |
| `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_HOST_USER` / `EMAIL_HOST_PASSWORD` / `EMAIL_USE_TLS` | real SMTP creds for order emails; left unset falls back to console logging (no emails actually sent) |
| `DEFAULT_FROM_EMAIL` / `ADMIN_ALERT_EMAIL` | order notification addresses |
| `SITE_URL` | frontend's public URL (used in email templates) |

## `frontend` app

| Env var | Notes |
|---|---|
| `NEXT_PUBLIC_API_URL` | backend's public URL + `/api` — used by the browser |
| `API_URL_INTERNAL` | backend's address reachable from *inside* the frontend container (e.g. an internal Dokploy network hostname) — used by server components. If frontend and backend share a network, prefer this over the public URL for server-side fetches; otherwise omit and it falls back to `NEXT_PUBLIC_API_URL` |

Product/blog images are served directly from MinIO, unoptimized by Next's
Image component (see `frontend/next.config.mjs` comment) — no
`images.remotePatterns` configuration is needed regardless of MinIO's host.

## After deploying

Run once against the backend app (shell/one-off command):

```
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_from_scrape --data-dir /path/to/scraper/scraped_data
```

The scraped data directory isn't part of the `backend` branch (it lives in
`/scraper` on `main` only) — copy it over or run the seed from a checkout of
`main` pointed at the production `DATABASE_URL`/`MINIO_*` env vars instead.
