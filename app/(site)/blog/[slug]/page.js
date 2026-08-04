import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const post = await api.blog.get(slug);
    return { title: `${post.title} — Peptide Technologies`, description: post.excerpt };
  } catch {
    return {};
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  let post;
  try {
    post = await api.blog.get(slug);
  } catch {
    notFound();
  }

  const allPosts = await api.blog.list().catch(() => []);
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // The scraped body already carries its own bare, unstyled <h1> with the
  // same title — drop it so it doesn't duplicate the styled hero above.
  const bodyHtml = post.body_html?.replace(/<h1[^>]*>.*?<\/h1>/i, "") ?? "";

  return (
    <div>
      <section style={{ background: "var(--bg-tint)", padding: "40px 24px" }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <nav style={{ fontSize: 12, color: "var(--ink-4)" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
            {" / "}
            <Link href="/blog" style={{ textDecoration: "none", color: "inherit" }}>
              Blog
            </Link>
          </nav>
          <h1 style={{ fontSize: 34, marginTop: 12 }}>{post.title}</h1>
          {post.excerpt && (
            <p style={{ marginTop: 10, fontSize: 15, color: "var(--ink-3)" }}>{post.excerpt}</p>
          )}
          <div style={{ marginTop: 14, fontSize: 13, color: "var(--ink-3)" }}>
            <strong style={{ color: "var(--ink)" }}>Peptech Lab</strong>
            {post.published_at && ` · ${formatDate(post.published_at)}`}
          </div>
        </div>
      </section>

      <article className="container" style={{ padding: "40px 24px", maxWidth: 780 }}>
        {post.cover_image && (
          <div
            className="card"
            style={{ position: "relative", aspectRatio: "16/9", background: "var(--bg-tint)" }}
          >
            <Image src={post.cover_image} alt={post.title} fill style={{ objectFit: "cover" }} />
          </div>
        )}
        <div
          className="pep-pdp-prose"
          style={{ marginTop: 28, fontSize: 15, lineHeight: 1.75, color: "var(--ink-2)" }}
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        <div style={{ marginTop: 32 }}>
          <Link href="/blog" style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-2)", textDecoration: "none" }}>
            ← Back to blog
          </Link>
        </div>

        {related.length > 0 && (
          <section style={{ marginTop: 48, borderTop: "1px solid var(--line)", paddingTop: 32 }}>
            <h2 style={{ fontSize: 22 }}>Related articles</h2>
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="card" style={{ padding: 16, textDecoration: "none" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{p.title}</div>
                  <div style={{ marginTop: 6, fontSize: 12, color: "var(--ink-4)" }}>
                    Peptech Lab {p.published_at && `· ${formatDate(p.published_at)}`}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
