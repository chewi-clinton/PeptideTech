// Drives the real checkout flow through a real browser against the local
// dev stack (Next.js on :3001, Django on :8001) — add to cart, fill the
// checkout form, pick a payment tile, submit, and verify the rendered
// confirmation + order-status lookup, per the functional QA requirement.

import puppeteer from "puppeteer-core";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SITE = "http://localhost:3001";

async function main() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("response", (res) => {
    if (res.status() >= 400) failedRequests.push(`${res.status()} ${res.url()}`);
  });
  page.on("pageerror", (err) => consoleErrors.push(`PAGEERROR: ${err.message}`));

  console.log("1. Visiting product page…");
  await page.goto(`${SITE}/p/ipamorelin`, { waitUntil: "networkidle2", timeout: 30000 });

  console.log("2. Selecting 10 mg variant and adding to cart…");
  const variantButtons = await page.$$("button");
  for (const btn of variantButtons) {
    const text = await page.evaluate((el) => el.textContent, btn);
    if (text.trim() === "10 mg") {
      await btn.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 200));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const addBtn = btns.find((b) => b.textContent.trim() === "Add to cart");
    addBtn?.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  console.log("3. Going to cart…");
  await page.goto(`${SITE}/cart`, { waitUntil: "networkidle2" });
  const cartText = await page.evaluate(() => document.body.innerText);
  console.log("   cart contains Ipamorelin:", cartText.includes("Ipamorelin"));

  console.log("4. Proceeding to checkout…");
  await page.goto(`${SITE}/checkout`, { waitUntil: "networkidle2" });

  await page.type('input[placeholder="Full name"]', "Jane Researcher");
  await page.type('input[placeholder="Email"]', "jane.researcher@example.com");
  await page.type('input[placeholder="Address line 1"]', "123 Lab Way");
  await page.type('input[placeholder="City"]', "Boulder");
  await page.type('input[placeholder="State"]', "CO");
  await page.type('input[placeholder="ZIP"]', "80301");

  console.log("5. Selecting payment method: Zelle…");
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const zelle = btns.find((b) => b.textContent.trim() === "Zelle");
    zelle?.click();
  });

  console.log("6. Submitting order…");
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const submit = btns.find((b) => b.textContent.trim() === "Place order");
    submit?.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const confirmationText = await page.evaluate(() => document.body.innerText);
  const orderMatch = confirmationText.match(/ZC-[A-Z0-9]+/);
  console.log("7. Confirmation shown:", confirmationText.includes("Order received"));
  console.log("   Order number:", orderMatch ? orderMatch[0] : "NOT FOUND");

  if (orderMatch) {
    console.log("8. Looking up order status…");
    await page.goto(
      `${SITE}/order-status?order_number=${orderMatch[0]}&email=jane.researcher@example.com`,
      { waitUntil: "networkidle2" }
    );
    await new Promise((r) => setTimeout(r, 800));
    const statusText = await page.evaluate(() => document.body.innerText);
    console.log("   lookup shows order:", statusText.includes(orderMatch[0]));
    console.log("   lookup shows status pending:", statusText.toLowerCase().includes("pending"));
  }

  console.log("\n--- console errors ---");
  console.log(consoleErrors.length ? consoleErrors.join("\n") : "none");
  console.log("--- failed requests (4xx/5xx) ---");
  console.log(failedRequests.length ? failedRequests.join("\n") : "none");

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
