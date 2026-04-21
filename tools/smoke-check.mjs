import fs from "fs";
import path from "path";

const root = process.cwd();
const pages = [
  "index.html",
  "faq/index.html",
  "contact/index.html",
  "pricing/index.html",
  "process/index.html",
  "work/index.html",
];

const expectations = [
  { file: "index.html", pattern: /id="ipNavbar"/, label: "navbar" },
  { file: "index.html", pattern: /id="footer"/, label: "footer" },
  { file: "faq/index.html", pattern: /id="faqChatWindow"/, label: "faq chat" },
  { file: "contact/index.html", pattern: /id="contactForm"/, label: "contact form" },
  { file: "pricing/index.html", pattern: /id="ipPricingPackages"/, label: "pricing packages" },
  { file: "process/index.html", pattern: /data-ip-proc/, label: "process block" },
];

for (const page of pages) {
  const abs = path.join(root, page);
  if (!fs.existsSync(abs)) throw new Error(`Missing page: ${page}`);
}

for (const item of expectations) {
  const src = fs.readFileSync(path.join(root, item.file), "utf8");
  if (!item.pattern.test(src)) {
    throw new Error(`Smoke check failed: ${item.label} missing in ${item.file}`);
  }
}

const mainJs = fs.readFileSync(path.join(root, "assets/js/main.js"), "utf8");
const jsChecks = [
  /initNavModule/, /initFaqModule/, /initContactModule/, /initPricingPackagesModule/
];
for (const re of jsChecks) {
  if (!re.test(mainJs)) throw new Error(`Smoke check failed: missing JS symbol ${re}`);
}

console.log("Smoke check passed: critical cross-page hooks exist.");
