import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "scraped_data", "rendered");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const SLUGS = [
  "peptides",
  "peptide-blends",
  "cases-accessories",
  "liquids-aminos-solvents",
  "capsules",
  "bioregulators",
  "glp-peptides",
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  for (const slug of SLUGS) {
    const page = await browser.newPage();
    await page.goto(`https://peptidetech.is/c/${slug}`, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1200));
    const html = await page.content();
    fs.writeFileSync(path.join(OUT_DIR, `category-${slug}.html`), html);
    console.log(`rendered /c/${slug} -> category-${slug}.html (${html.length} bytes)`);
    await page.close();
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
