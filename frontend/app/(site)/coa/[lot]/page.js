import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { IconArrowRight, IconDownload, IconShield } from "@/components/icons";

export async function generateMetadata({ params }) {
  const { lot } = await params;
  return { title: `Verify batch ${lot} — Peptide Technologies` };
}

export default async function COAVerifyPage({ params }) {
  const { lot } = await params;
  const records = await api.coaLibrary.list().catch(() => []);
  const record = records.find((r) => r.lot_number.toLowerCase() === lot.toLowerCase());

  if (!record) return notFound();

  return (
    <div className="container" style={{ padding: "40px 24px 64px", maxWidth: 620 }}>
      <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", background: "linear-gradient(135deg, var(--brand), var(--brand-2))", padding: "32px 32px 28px", textAlign: "center" }}>
        <div
          style={{
            width: 44,
            height: 44,
            margin: "0 auto",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <IconShield size={20} />
        </div>
        <div style={{ marginTop: 14, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
          Verified batch
        </div>
        <h1 style={{ marginTop: 6, fontSize: 24, color: "#fff" }}>{record.product_title}</h1>
        <p style={{ marginTop: 4, fontSize: 14, color: "rgba(255,255,255,0.85)" }}>{record.product_title}</p>
        <p style={{ marginTop: 6, fontSize: 13.5, fontFamily: "var(--font-mono-stack)", color: "rgba(255,255,255,0.85)" }}>
          Lot {record.lot_number}
        </p>
      </div>

      <div className="card" style={{ marginTop: 20, padding: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 10 }}>
          Analytical results
        </div>
        <Row label="HPLC purity" value={record.purity_percent || "—"} highlight />
        <Row label="Testing lab" value={record.issuing_lab || "—"} />
        <Row label="Tested" value={formatDate(record.test_date)} last />

        <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
          {record.file && (
            <a
              href={record.file}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none" }}
            >
              <IconDownload size={14} style={{ color: "#fff" }} />
              View full COA (PDF)
            </a>
          )}
          <Link
            href={`/p/${record.product_slug}`}
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "11px 0",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--brand)",
              color: "var(--brand-2)",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Shop this product
          </Link>
        </div>
      </div>

      {record.file && (
        <div className="card" style={{ marginTop: 20, padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 12 }}>
            Full certificate
          </div>
          <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-md)", overflow: "hidden", height: 640 }}>
            <object data={record.file} type="application/pdf" width="100%" height="100%">
              <p style={{ padding: 20, fontSize: 13.5, color: "var(--ink-3)" }}>
                Your browser can&apos;t display the certificate inline.{" "}
                <a href={record.file} target="_blank" rel="noopener noreferrer" style={{ color: "var(--brand-2)", fontWeight: 600 }}>
                  Open the full COA
                </a>
                .
              </p>
            </object>
          </div>
        </div>
      )}

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Link href="/coa" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--brand-2)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          Verify another batch
          <IconArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value, highlight, last }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: last ? "none" : "1px solid var(--line)",
        fontSize: 14,
      }}
    >
      <span style={{ color: "var(--ink-3)" }}>{label}</span>
      <span style={{ fontWeight: 700, color: highlight ? "var(--brand-2)" : "var(--ink)" }}>{value}</span>
    </div>
  );
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
