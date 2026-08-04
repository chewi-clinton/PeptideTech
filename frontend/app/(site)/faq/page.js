import Link from "next/link";
import { api } from "@/lib/api";
import Eyebrow from "@/components/Eyebrow";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ — Compliance, COAs, Shipping & Guarantees",
  description:
    "Answers on compliance, Certificate of Analysis lookups, shipping, and the Peptide Technologies purity guarantee.",
  keywords: ["research peptide FAQ", "peptide shipping policy", "COA questions", "Peptech"],
  path: "/faq",
});

// The real FAQ content is embedded as a schema.org FAQPage JSON-LD block
// inside the scraped body_html (the rest of that markup is a static,
// pre-rendered accordion with no JS behind it). Pulling the structured data
// straight out is more reliable than re-parsing the display HTML, and gives
// every question/answer pair verbatim from the live site.
function extractFaqItems(html) {
  if (!html) return [];
  const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  for (const block of blocks) {
    const json = block.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");
    try {
      const parsed = JSON.parse(json);
      if (parsed["@type"] === "FAQPage") {
        return parsed.mainEntity.map((q) => ({
          question: q.name,
          answer: q.acceptedAnswer?.text || "",
        }));
      }
    } catch {
      // not the FAQPage block, keep looking
    }
  }
  return [];
}

export default async function FaqPage() {
  const page = await api.pages.get("faq").catch(() => null);
  const items = extractFaqItems(page?.body_html);

  return (
    <div>
      {items.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }}
        />
      )}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--bg-tint)", borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ position: "relative", padding: "68px 24px", maxWidth: 820 }}>
          <nav style={{ fontSize: 12, color: "var(--ink-4)" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
            {" / "}
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>FAQ</span>
          </nav>
          <Eyebrow>Help center</Eyebrow>
          <h1 style={{ fontSize: 44, marginTop: 10 }}>
            Questions,{" "}
            <em className="font-serif-italic" style={{ color: "var(--brand-2)" }}>
              answered.
            </em>
          </h1>
          <p style={{ marginTop: 14, maxWidth: 560, fontSize: 16, color: "var(--ink-3)" }}>
            Compliance, COAs, shipping, and guarantees. If your question isn&apos;t here, our{" "}
            <Link href="/contact" style={{ color: "var(--brand-2)" }}>
              support team
            </Link>{" "}
            answers 24/7.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "40px 24px 88px", maxWidth: 820 }}>
        {items.length > 0 ? (
          <FaqAccordion items={items} />
        ) : (
          <p style={{ color: "var(--ink-4)" }}>FAQ content is temporarily unavailable.</p>
        )}
      </div>
    </div>
  );
}
