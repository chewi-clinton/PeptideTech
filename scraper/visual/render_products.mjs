// Product pages hydrate a rich "Overview" content block (Research Background,
// Specifications table, Storage & Handling, etc. — real per-product content)
// client-side after initial load; it's absent from the raw curl HTML, only
// confirmed present post-hydration. Renders every product page and dumps the
// `.pep-pdp-overview` fragment for the Python scraper to merge in.

import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "scraped_data", "rendered_products");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "https://peptidetech.is";

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "scraped_data", "products.json"), "utf-8")
);

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage();

  for (const [i, product] of products.entries()) {
    const slug = product.slug;
    const dest = path.join(OUT_DIR, `${slug}.html`);
    if (fs.existsSync(dest)) continue; // resumable
    try {
      await page.goto(`${BASE}/p/${slug}`, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForSelector(".pep-pdp-overview", { timeout: 15000 }).catch(() => null);
      await new Promise((r) => setTimeout(r, 400));
      const fragment = await page.evaluate(() => {
        const el = document.querySelector(".pep-pdp-overview");
        return el ? el.outerHTML : null;
      });
      if (fragment) {
        fs.writeFileSync(dest, fragment);
        console.log(`[${i + 1}/${products.length}] ${slug} OK (${fragment.length} bytes)`);
      } else {
        console.log(`[${i + 1}/${products.length}] ${slug} NO OVERVIEW FOUND`);
      }
    } catch (e) {
      console.log(`[${i + 1}/${products.length}] ${slug} FAILED: ${e.message}`);
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
