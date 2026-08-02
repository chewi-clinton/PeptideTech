// Captures reference screenshots + computed-style design tokens from the
// live peptidetech.is site, using the system's installed Chrome via
// puppeteer-core (no bundled browser needed). Used to visually match the
// rebuilt frontend in Phase A verification.

import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "reference");
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "https://peptidetech.is";

const BREAKPOINTS = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const PAGES = [
  { name: "home", path: "/" },
  { name: "product", path: "/p/bpc-157" },
  { name: "category", path: "/c/peptides" },
  { name: "blog", path: "/blog/what-is-bpc-157-peptide" },
  { name: "legal", path: "/compliance" },
];

async function extractTokens(page) {
  return page.evaluate(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const cssVars = {};
    for (const sheet of document.styleSheets) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of rules) {
        if (rule.style) {
          for (const prop of rule.style) {
            if (prop.startsWith("--")) {
              cssVars[prop] = rootStyle.getPropertyValue(prop).trim();
            }
          }
        }
      }
    }

    function styleOf(selector) {
      const el = document.querySelector(selector);
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        transition: cs.transition,
        borderRadius: cs.borderRadius,
        padding: cs.padding,
      };
    }

    return {
      cssVars,
      elements: {
        h1: styleOf("h1"),
        h2: styleOf("h2"),
        body: styleOf("body"),
        button: styleOf("button"),
        link: styleOf("a"),
      },
    };
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  const allTokens = {};

  for (const pageDef of PAGES) {
    for (const bp of BREAKPOINTS) {
      const page = await browser.newPage();
      await page.setViewport({ width: bp.width, height: bp.height });
      await page.goto(`${BASE}${pageDef.path}`, { waitUntil: "networkidle0", timeout: 60000 });
      const screenshotPath = path.join(OUT_DIR, `${pageDef.name}-${bp.name}-${bp.width}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`captured ${screenshotPath}`);

      if (bp.name === "desktop") {
        allTokens[pageDef.name] = await extractTokens(page);
      }
      await page.close();
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, "design-tokens.json"), JSON.stringify(allTokens, null, 2));
  await browser.close();
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
