import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import BuildAKitClient from "./BuildAKitClient";

export async function generateMetadata() {
  try {
    const page = await api.pages.get("build-a-kit");
    return buildMetadata({
      title: page.title,
      description: page.meta_description,
      keywords: ["custom peptide case", "build a kit", "deluxe vial case", "Peptech"],
      path: "/build-a-kit",
    });
  } catch {
    return {};
  }
}

export default function BuildAKitPage() {
  return <BuildAKitClient />;
}
