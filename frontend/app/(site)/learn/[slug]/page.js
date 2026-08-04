import Image from "next/image";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const article = await api.learn.get(slug);
    return { title: `${article.title} — Peptide Technologies` };
  } catch {
    return {};
  }
}

export default async function LearnArticlePage({ params }) {
  const { slug } = await params;
  let article;
  try {
    article = await api.learn.get(slug);
  } catch {
    notFound();
  }

  return (
    <article className="container" style={{ padding: "40px 24px", maxWidth: 780 }}>
      {/* article.body_html already ships its own full h1/byline/disclaimer
          hero section (scraped verbatim from the live page) — don't
          duplicate the title here. */}
      {article.cover_image && (
        <div
          className="card"
          style={{ position: "relative", aspectRatio: "16/9", marginTop: 20, background: "var(--bg-tint)" }}
        >
          <Image src={article.cover_image} alt={article.title} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <div
        className="pep-pdp-prose"
        style={{ marginTop: 28, fontSize: 15, lineHeight: 1.75, color: "var(--ink-2)" }}
        dangerouslySetInnerHTML={{ __html: article.body_html }}
      />
    </article>
  );
}
