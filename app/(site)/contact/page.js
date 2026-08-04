import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { buildMetadata } from "@/lib/seo";
import {
  IconClock,
  IconFileText,
  IconFlag,
  IconFlask,
  IconGift,
  IconHeadphones,
  IconIdentity,
  IconMail,
  IconPhone,
  IconShield,
  IconSms,
  IconTag,
  IconWarningTriangle,
} from "@/components/icons";

export const metadata = buildMetadata({
  title: "Contact & Support",
  description:
    "Self-service support for Peptech — order tracking, free reships for stuck packages, photo refund claims, COA lookup, account, and legal contact.",
  keywords: ["contact Peptide Technologies", "Peptech support", "order tracking", "COA lookup"],
  path: "/contact",
});

const SUPPORT_EMAIL = "support@peptidetech.cc";
const LEGAL_EMAIL = "support@peptidetech.cc";

// Real topic tiles + copy from the live /contact page's support hub. The
// live site hands each topic to an AI chat agent for instant resolution —
// we don't have that backend, so each tile instead links to the real page
// or support inbox that actually handles it.
const TOPICS = [
  {
    icon: IconFlag,
    title: "Where's my order?",
    body: "Shipping status, tracking, delivery updates — live carrier data, and a free reship if it's stuck.",
    href: "/order-status",
  },
  {
    icon: IconWarningTriangle,
    title: "Refunds & order issues",
    body: "Damaged or gelled product, never delivered, returns — most claims resolve in one pass.",
    href: `mailto:${SUPPORT_EMAIL}?subject=Refund%20or%20order%20issue`,
  },
  {
    icon: IconShield,
    title: "File a shipping claim",
    body: "Lost, stolen, or damaged insured order? File a Shipping Protection claim — we file with the insurer and reship or refund.",
    href: `mailto:${SUPPORT_EMAIL}?subject=Shipping%20claim`,
  },
  {
    icon: IconIdentity,
    title: "COA & product lookup",
    body: "Find the Certificate of Analysis for any lot number or product — purity, identity, testing lab.",
    href: "/coa",
  },
  {
    icon: IconGift,
    title: "Account & PepPoints",
    body: "Can't sign in, password resets, how points are earned and spent, account changes.",
    href: `mailto:${SUPPORT_EMAIL}?subject=Account%20%26%20PepPoints`,
  },
  {
    icon: IconTag,
    title: "Payments & billing",
    body: "Charge on a canceled order, card declines, crypto and bank-transfer payments, refund timing.",
    href: `mailto:${SUPPORT_EMAIL}?subject=Payments%20%26%20billing`,
  },
  {
    icon: IconFlask,
    title: "Product & research help",
    body: "Storage and handling, batch variation, purity documentation, research-use policy.",
    href: `mailto:${SUPPORT_EMAIL}?subject=Product%20%26%20research%20help`,
  },
  {
    icon: IconHeadphones,
    title: "Affiliate program",
    body: "Commissions, referral links, payouts, and the 2× store-credit option.",
    href: "/affiliates",
  },
  {
    icon: IconFileText,
    title: "Wholesale & bulk orders",
    body: "Volume pricing for labs and resellers — what to include for a fast quote.",
    href: "/wholesale",
  },
  {
    icon: IconShield,
    title: "Legal & service of process",
    body: "Where and how to send legal notices to Peptide Tech LLC.",
    href: `mailto:${LEGAL_EMAIL}?subject=Legal%20notice`,
  },
  {
    icon: IconMail,
    title: "Something else",
    body: "Order lookups, claims, billing fixes — send it over and our team will pick it up.",
    href: `mailto:${SUPPORT_EMAIL}?subject=Support%20request`,
  },
];

export default function ContactPage() {
  return (
    <div>
      <section style={{ background: "var(--bg-tint)", padding: "56px 24px" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <nav style={{ fontSize: 12, color: "var(--ink-4)" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
            {" / "}
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>Contact</span>
          </nav>
          <Eyebrow>Support</Eyebrow>
          <h1 style={{ fontSize: 38, marginTop: 8 }}>How can we help?</h1>
          <p style={{ marginTop: 10, fontSize: 15.5, color: "var(--ink-3)", maxWidth: 620 }}>
            Pick a topic — most things resolve right here: live tracking, free reships for stuck
            packages, photo refund claims, COA lookups, and more.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "40px 24px", maxWidth: 900 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {TOPICS.map((t) => (
            <Link key={t.title} href={t.href} className="card" style={{ padding: 18, textDecoration: "none" }}>
              <span
                style={{
                  width: 34,
                  height: 34,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--brand-tint)",
                  color: "var(--brand-2)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <t.icon size={17} />
              </span>
              <div style={{ marginTop: 10, fontWeight: 700, fontSize: 14.5, color: "var(--ink)" }}>{t.title}</div>
              <p style={{ marginTop: 6, fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.55 }}>{t.body}</p>
            </Link>
          ))}
        </div>

        <div
          className="card"
          style={{ marginTop: 24, padding: 22, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                width: 40,
                height: 40,
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--brand-tint)",
                color: "var(--brand-2)",
                borderRadius: "50%",
              }}
            >
              <IconPhone size={18} />
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>
                <a href="tel:+12816828987" style={{ color: "inherit", textDecoration: "none" }}>
                  +1 (281) 682-8987
                </a>
              </div>
              <div style={{ marginTop: 4, fontSize: 13, color: "var(--ink-2)", display: "flex", alignItems: "center", gap: 6 }}>
                <IconSms size={13} style={{ color: "var(--ink-3)" }} />
                <a href="sms:+12816828987" style={{ color: "inherit", textDecoration: "none" }}>
                  +1 (281) 682-8987
                </a>
              </div>
              <div style={{ marginTop: 4, fontSize: 13, color: "var(--ink-2)" }}>
                <a
                  href="https://wa.me/19162926748"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  WhatsApp: +1 (916) 292-6748
                </a>
              </div>
              <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--ink-3)" }}>
                <IconClock size={13} />
                Team follow-up Mon–Fri 9 AM–6 PM ET · Sat 10 AM–2 PM ET (Sun & holidays next business day)
              </div>
            </div>
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}
          >
            <IconMail size={15} style={{ color: "#fff" }} />
            Email support
          </a>
        </div>

        <div
          role="note"
          aria-label="Refunds and chargebacks"
          className="card"
          style={{ marginTop: 20, padding: "16px 18px", display: "flex", gap: 12, background: "var(--bg-tint)" }}
        >
          <span style={{ flexShrink: 0, color: "#b3261e", marginTop: 1 }}>
            <IconWarningTriangle size={18} />
          </span>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-2)", margin: 0 }}>
            Requesting a refund or have a billing dispute? Please contact us first — we&apos;re happy to
            help resolve it. Per our Terms, chargebacks filed without contacting us may be sent to
            collections and reported to credit bureaus.
          </p>
        </div>
      </div>
    </div>
  );
}
