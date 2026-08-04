import { api } from "@/lib/api";
import { generateQrSvg } from "@/lib/qr";
import COALibraryList from "@/components/COALibraryList";
import Eyebrow from "@/components/Eyebrow";
import WaveBackground from "@/components/WaveBackground";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Certificate of Analysis (COA) Library",
  description:
    "Look up the third-party Certificate of Analysis for any Peptide Technologies lot — HPLC purity, mass-spectrometry identity, and lot traceability by QR code.",
  keywords: ["Certificate of Analysis", "COA lookup", "peptide purity testing", "lot traceability", "Peptech"],
  path: "/coa",
});

export default async function COALibraryPage() {
  const rawRecords = await api.coaLibrary.list().catch(() => []);
  const records = await Promise.all(
    rawRecords.map(async (r) => ({
      ...r,
      qrSvg: await generateQrSvg(`${SITE_URL}/coa/${r.lot_number}`),
    }))
  );

  return (
    <div>
      <section style={{ position: "relative", overflow: "hidden", background: "var(--bg)", borderBottom: "1px solid var(--line)", padding: "56px 0 40px", textAlign: "center" }}>
        <WaveBackground />
        <div className="container" style={{ position: "relative", maxWidth: 720 }}>
          <Eyebrow>Lot traceability</Eyebrow>
          <h1 style={{ fontSize: 34, marginTop: 10 }}>
            Every batch, <em className="font-serif-italic" style={{ color: "var(--brand-2)" }}>verified to the lot.</em>
          </h1>
          <p style={{ marginTop: 10, color: "var(--ink-3)", fontSize: 15 }}>
            We test every batch across every product. Search any product or the lot number on your
            vial to pull its third-party Certificate of Analysis.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "32px 24px 64px", maxWidth: 1240 }}>
        <COALibraryList records={records} />
      </div>
    </div>
  );
}
