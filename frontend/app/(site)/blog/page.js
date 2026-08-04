import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { BLOG_CATEGORIES, BLOG_CATEGORY_TABS } from "@/lib/blogCategories";

export const metadata = { title: "Research Insights — Peptide Technologies" };

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function BlogIndexPage({ searchParams }) {
  const { category } = await searchParams;
  const active = BLOG_CATEGORY_TABS.includes(category) ? category : "All";

  const allPosts = await api.blog.list().catch(() => []);
  const filtered = active === "All" ? allPosts : allPosts.filter((p) => BLOG_CATEGORIES[p.slug] === active);
  const posts = filtered.slice(0, 12);

  return (
    <div>
      <section style={{ background: "var(--bg-tint)", padding: "40px 24px" }}>
        <div className="container">
          <nav style={{ fontSize: 12, color: "var(--ink-4)" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
            {" / "}
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>Blog</span>
          </nav>
          <h1 style={{ fontSize: 34, marginTop: 10 }}>Research Insights</h1>
          <p style={{ marginTop: 8, color: "var(--ink-3)", fontSize: 15 }}>
            Peptide science, analytical methods, and lab techniques from the Peptech team.
          </p>

          <div className="pep-no-scrollbar" style={{ display: "flex", gap: 6, overflowX: "auto", paddingTop: 14, paddingBottom: 2 }}>
            {BLOG_CATEGORY_TABS.map((tab) => {
              const isActive = tab === active;
              const href = tab === "All" ? "/blog" : `/blog?category=${encodeURIComponent(tab)}`;
              return (
                <Link
                  key={tab}
                  href={href}
                  style={{
                    flexShrink: 0,
                    padding: "8px 16px",
                    fontSize: 13,
                    fontWeight: 500,
                    borderRadius: 999,
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                    background: isActive ? "var(--navy)" : "var(--bg-tint)",
                    color: isActive ? "#fff" : "var(--ink-2)",
                  }}
                >
                  {tab}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: "40px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card"
              style={{ overflow: "hidden", textDecoration: "none" }}
            >
              {post.cover_image && (
                <div style={{ position: "relative", aspectRatio: "16/9", background: "var(--bg-tint)" }}>
                  <Image src={post.cover_image} alt={post.title} fill style={{ objectFit: "cover" }} />
                </div>
              )}
              <div style={{ padding: 16 }}>
                {BLOG_CATEGORIES[post.slug] && (
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 10px",
                      fontSize: 11,
                      fontWeight: 600,
                      borderRadius: 999,
                      background: "var(--brand-tint)",
                      color: "var(--brand)",
                    }}
                  >
                    {BLOG_CATEGORIES[post.slug]}
                  </span>
                )}
                <div style={{ marginTop: 8, fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>{post.title}</div>
                {post.excerpt && <p style={{ marginTop: 8, fontSize: 13, color: "var(--ink-3)" }}>{post.excerpt}</p>}
                <div style={{ marginTop: 10, fontSize: 12, color: "var(--ink-4)" }}>
                  Peptech Lab {post.published_at && `· ${formatDate(post.published_at)}`}
                </div>
              </div>
            </Link>
          ))}
          {posts.length === 0 && <p style={{ color: "var(--ink-4)" }}>No articles in this category yet.</p>}
        </div>
      </div>
    </div>
  );
}
