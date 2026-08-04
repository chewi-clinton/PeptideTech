import Image from "next/image";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { buildMetadata, extractJsonLdField } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const article = await api.learn.get(slug);
    // The scraped body_html already embeds a real Article JSON-LD block
    // with its own `description` — reuse it for <meta name="description">
    // instead of writing a second one that could drift from the on-page copy.
    const description = extractJsonLdField(article.body_html, "description");
    return buildMetadata({
      title: article.title,
      description,
      keywords: [article.title, "peptide research", "laboratory research guide", "Peptech"],
      path: `/learn/${slug}`,
      image: article.cover_image,
      type: "article",
    });
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
