// Renders client-hydrated pages (build-a-kit, coa) that have no meaningful
// server-rendered HTML, and dumps the post-hydration DOM for the Python
// scraper to re-parse. Confirmed client-side-only via the "Loading the
// configurator…" / React Suspense placeholders seen in the raw curl output.

import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "scraped_data", "rendered");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "https://peptidetech.is";

const PAGES = ["/build-a-kit", "/coa"];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  for (const p of PAGES) {
    const page = await browser.newPage();
    await page.goto(`${BASE}${p}`, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1500)); // let any late hydration settle

    if (p === "/coa") {
      // COA library is infinite-scroll — scroll repeatedly to load more of the
      // real lot records (a bounded, best-effort pass, not exhaustive).
      let lastHeight = 0;
      for (let i = 0; i < 25; i++) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await new Promise((r) => setTimeout(r, 900));
        const height = await page.evaluate(() => document.body.scrollHeight);
        if (height === lastHeight) break;
        lastHeight = height;
      }
    }

    const html = await page.content();
    const slug = p.replace(/^\//, "");
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
