import { api } from "@/lib/api";
import { generateQrSvg } from "@/lib/qr";
import COALibraryList from "@/components/COALibraryList";
import Eyebrow from "@/components/Eyebrow";
import WaveBackground from "@/components/WaveBackground";

export const metadata = { title: "COA Library — Peptide Technologies" };

const SITE_URL = "https://peptidetech.cc";

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
      <section style={{ position: "relative", overflow: "hidden", background: "var(--bg-tint)", padding: "56px 0 40px", textAlign: "center" }}>
        <WaveBackground opacity={0.07} />
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
