import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { IconArrowRight } from "@/components/icons";

const CARDS = [
  {
    href: "/learn/reading-a-coa",
    eyebrow: "Lab notes",
    title: "Learn — peptide standards",
    body: "How to read a COA, cold-chain shipping, third-party testing, and lot traceability.",
    cta: "Read the guides",
  },
  {
    href: "/blog",
    eyebrow: "Research blog",
    title: "Blog — research insights",
    body: "Peptide science deep-dives, methodology, and lab techniques from the Peptech team.",
    cta: "Browse articles",
  },
];

export default function InsightsSection() {
  return (
    <section style={{ background: "var(--bg-tint)", padding: "72px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <Eyebrow>From the lab</Eyebrow>
          <h2 style={{ fontSize: 34, marginTop: 10 }}>Research insights &amp; lab notes</h2>
          <p style={{ marginTop: 10, color: "var(--ink-3)", fontSize: 15 }}>
            Peptide science, analytical methods, and lab standards — written by the Peptech team for
            researchers.
          </p>
        </div>

        <div className="pep-2col" style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 800, margin: "32px auto 0" }}>
          {CARDS.map((c) => (
            <Link key={c.href} href={c.href} className="card" style={{ padding: 24, textDecoration: "none" }}>
              <Eyebrow>{c.eyebrow}</Eyebrow>
              <div style={{ fontWeight: 700, fontSize: 18, color: "var(--ink)", marginTop: 6 }}>{c.title}</div>
              <p style={{ marginTop: 8, fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.6 }}>{c.body}</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 13, fontWeight: 600, color: "var(--brand-2)" }}>
                {c.cta}
                <IconArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
