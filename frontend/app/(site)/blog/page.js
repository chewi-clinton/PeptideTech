import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";

export const metadata = { title: "Research Insights — Peptide Technologies" };

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function BlogIndexPage() {
  const posts = await api.blog.list().then((all) => all.slice(0, 12)).catch(() => []);
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
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>{post.title}</div>
                {post.excerpt && (
                  <p style={{ marginTop: 8, fontSize: 13, color: "var(--ink-3)" }}>{post.excerpt}</p>
                )}
                <div style={{ marginTop: 10, fontSize: 12, color: "var(--ink-4)" }}>
                  Peptech Lab {post.published_at && `· ${formatDate(post.published_at)}`}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
