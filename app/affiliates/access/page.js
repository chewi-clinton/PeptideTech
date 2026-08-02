import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import FaqAccordion from "@/components/FaqAccordion";
import { IconArrowRight } from "@/components/icons";

export const metadata = { title: "Access your affiliate dashboard — Peptide Technologies" };

const STEPS = [
  {
    title: "Create or sign in to your store account",
    body: "Applying to the affiliate program does not create a login. Use the same email you used on your affiliate application. If you shopped on our previous site, your old password did not carry over — contact support for a reset.",
  },
  {
    title: "Open your affiliate dashboard",
    body: "Go to peptidetech.cc/account/affiliate. You'll see your referral link, clicks, commissions, payout options, and code management.",
  },
  {
    title: "Wrong email on your login?",
    body: "If you're signed in but the page says there's no affiliate linked, you may be using a different email than your affiliate record. Contact support with your affiliate code to have your account linked.",
  },
  {
    title: "Commissions look stuck?",
    body: "New or admin-created accounts may need to sign the Affiliate Program Agreement in the dashboard before commissions release. Held sales still count — they unlock once you sign.",
  },
];

const FAQ_ITEMS = [
  {
    question: 'I applied but "View dashboard" asks me to sign in',
    answer:
      "That's expected. Affiliate signup and store login are separate. Contact support to create an account (or sign in) with the same email you used when you applied, then return to the dashboard.",
  },
  {
    question: "My password doesn't work",
    answer:
      "If you ordered on our old site, passwords did not migrate. Contact support for a one-click access link, or to reset your password.",
  },
  {
    question: "I'm signed in but it says I'm not an affiliate",
    answer:
      "You're probably signed in with a different email than your affiliate application. Contact support with your referral code to have your account linked.",
  },
  {
    question: "The email sign-in link didn't work",
    answer:
      "Open the link in the same browser where you requested it. Links expire after about an hour and are single-use. Contact support for a fresh link.",
  },
  {
    question: "Where is my referral code?",
    answer:
      "Check your approval email or the confirmation screen after you applied. Once you're in the dashboard you can view, rename, or add codes (up to your plan limit).",
  },
  {
    question: "Do I need a separate affiliate login?",
    answer:
      "No. One Peptide Tech store account per person. Affiliates use the same sign-in as customers — the dashboard lives at /account/affiliate after you're linked.",
  },
];

export default function AffiliatesAccessPage() {
  return (
    <div>
      <section style={{ background: "var(--bg-tint)", borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ padding: "48px 24px 40px", maxWidth: 900 }}>
          <Eyebrow>Affiliate help</Eyebrow>
          <h1 style={{ marginTop: 12, fontSize: 38, color: "var(--ink)" }}>
            Access your affiliate dashboard
          </h1>
          <p style={{ marginTop: 14, maxWidth: 640, fontSize: 16, lineHeight: 1.6, color: "var(--ink-3)" }}>
            Everything you need to sign in, link your affiliate account, and manage commissions —
            no support ticket required.
          </p>
          <p style={{ marginTop: 12, fontSize: 13 }}>
            <Link href="/affiliates" style={{ color: "var(--brand-2)", fontWeight: 600, textDecoration: "none" }}>
              ← Back to affiliate program
            </Link>
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "40px 24px 64px", maxWidth: 960 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
          <Link href="/contact" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 20px", fontSize: 14, textDecoration: "none" }}>
            Sign in to dashboard
            <IconArrowRight size={15} style={{ color: "#fff" }} />
          </Link>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 44,
              padding: "0 20px",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--brand)",
              color: "var(--brand-2)",
              textDecoration: "none",
            }}
          >
            Create account
          </Link>
          <Link
            href="/account/affiliate"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 44,
              padding: "0 20px",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--brand)",
              color: "var(--brand-2)",
              textDecoration: "none",
            }}
          >
            Open dashboard
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "start" }}>
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 18, color: "var(--ink)" }}>Step-by-step</h2>
            <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
              {STEPS.map((step, i) => (
                <li key={step.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      flexShrink: 0,
                      borderRadius: 999,
                      background: "var(--brand)",
                      color: "#fff",
                      fontFamily: "var(--font-mono-stack)",
                      fontSize: 13,
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {i + 1}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{step.title}</div>
                    <p style={{ margin: "4px 0 0", fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-3)" }}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ margin: "0 0 12px", fontSize: 18, color: "var(--ink)" }}>Quick reference</h2>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10, fontSize: 13.5, color: "var(--ink-2)" }}>
              <li>
                <strong style={{ color: "var(--ink)" }}>Dashboard URL:</strong> peptidetech.cc/account/affiliate
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>Sign in:</strong> use the same email as your affiliate
                application
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>Email mismatch:</strong> contact support with your referral
                code
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>Join the program:</strong>{" "}
                <Link href="/affiliates" style={{ color: "var(--brand-2)" }}>
                  /affiliates
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 20, color: "var(--ink)", marginBottom: 16 }}>Common issues</h2>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </div>
    </div>
  );
}
