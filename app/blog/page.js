import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";

export const metadata = { title: "Research Insights — Peptide Technologies" };

export default async function BlogIndexPage() {
  const posts = await api.blog.list().catch(() => []);
  return (
    <div className="container" style={{ padding: "40px 24px" }}>
      <h1 style={{ fontSize: 34 }}>Research Insights</h1>
      <div
        style={{
          marginTop: 28,
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
