import { api } from "@/lib/api";
import COALibraryList from "@/components/COALibraryList";

export const metadata = { title: "COA Library — Peptide Technologies" };

export default async function COALibraryPage() {
  const records = await api.coaLibrary.list().catch(() => []);

  return (
    <div className="container" style={{ padding: "40px 24px", maxWidth: 900 }}>
      <h1 style={{ fontSize: 32 }}>Every batch, verified to the lot.</h1>
      <p style={{ marginTop: 8, color: "var(--ink-3)" }}>
        We test every batch across every product. Search any product or the lot number on your
        vial to pull its third-party Certificate of Analysis.
      </p>
      <div style={{ marginTop: 24 }}>
        <COALibraryList records={records} />
      </div>
    </div>
  );
}
