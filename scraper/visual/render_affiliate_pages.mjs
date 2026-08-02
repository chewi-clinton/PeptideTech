import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "scraped_data", "rendered");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const PAGES = [
  ["/account/affiliate", "account-affiliate"],
  ["/affiliates/access", "affiliates-access"],
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  for (const [p, slug] of PAGES) {
    const page = await browser.newPage();
    await page.goto(`https://peptidetech.is${p}`, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1500));
    const html = await page.content();
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.html`), html);
    console.log(`rendered ${p} -> ${slug}.html (${html.length} bytes)`);
    await page.close();
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
