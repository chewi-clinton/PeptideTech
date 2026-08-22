import { api } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";

// Reflects live catalog/blog data, and the backend isn't reachable during
// the Docker build step anyway (see app/layout.js) — force per-request
// rendering instead of baking in whatever (usually empty) data was
// fetchable at build time.
export const dynamic = "force-dynamic";

const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/shop", priority: 0.9, changeFrequency: "daily" },
  { path: "/blog", priority: 0.8, changeFrequency: "daily" },
  { path: "/coa", priority: 0.6, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/pricelist", priority: 0.4, changeFrequency: "monthly" },
  { path: "/build-a-kit", priority: 0.6, changeFrequency: "monthly" },
];

// These slugs are served by their own dedicated route folder rather than
// the generic /[slug] catch-all (which reads the same /api/pages/ data) —
// skip them here so the same URL isn't listed twice.
const DEDICATED_ROUTE_SLUGS = new Set([
  "shop",
  "blog",
  "coa",
  "faq",
  "contact",
  "price-match",
  "build-a-kit",
  "order-status",
]);

export default async function sitemap() {
  const [products, categories, posts, learnArticles, pages] = await Promise.all([
    api.products.list().catch(() => []),
    api.categories.list().catch(() => []),
    api.blog.list().catch(() => []),
    api.learn.list().catch(() => []),
    api.pages.list().catch(() => []),
  ]);

  const now = new Date();

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...products.map((p) => ({
      url: `${SITE_URL}/p/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    ...categories.map((c) => ({
      url: `${SITE_URL}/c/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.published_at ? new Date(post.published_at) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    ...learnArticles.map((a) => ({
      url: `${SITE_URL}/learn/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    ...pages
      .filter((pg) => !DEDICATED_ROUTE_SLUGS.has(pg.slug))
      .map((pg) => ({
        url: `${SITE_URL}/${pg.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.4,
      })),
  ];
}
