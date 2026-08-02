import Image from "next/image";
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

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  let post;
  try {
    post = await api.blog.get(slug);
  } catch {
    notFound();
  }

  return (
    <article className="container" style={{ padding: "40px 24px", maxWidth: 780 }}>
      <h1 style={{ fontSize: 36 }}>{post.title}</h1>
      {post.cover_image && (
        <div
          className="card"
          style={{ position: "relative", aspectRatio: "16/9", marginTop: 20, background: "var(--bg-tint)" }}
        >
          <Image src={post.cover_image} alt={post.title} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <div
        className="pep-pdp-prose"
        style={{ marginTop: 28, fontSize: 15, lineHeight: 1.75, color: "var(--ink-2)" }}
        dangerouslySetInnerHTML={{ __html: post.body_html }}
      />
    </article>
  );
}
