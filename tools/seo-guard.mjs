import fs from "fs";
import path from "path";

const root = process.cwd();
const skipDirs = new Set(["node_modules", ".git", "assets", "tools", "scripts", "partials"]);
const htmlFiles = [];

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skipDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(full);
  }
};
walk(root);

const requiredPatterns = [
  { name: "title", re: /<title>[^<]+<\/title>/i },
  { name: "meta description", re: /<meta name="description" content="[^"]+"/i },
  { name: "canonical", re: /<link rel="canonical" href="https:\/\/illyrianpixel\.com\/[^"]*"\s*\/?>/i },
  { name: "og:title", re: /<meta property="og:title" content="[^"]+"/i },
  { name: "og:description", re: /<meta property="og:description" content="[^"]+"/i },
  { name: "og:url", re: /<meta property="og:url" content="https:\/\/illyrianpixel\.com\/[^"]*"\s*\/?>/i },
  { name: "twitter:title", re: /<meta name="twitter:title" content="[^"]+"/i },
  { name: "twitter:description", re: /<meta name="twitter:description" content="[^"]+"/i },
  { name: "h1", re: /<h1[\s>][\s\S]*?<\/h1>/i },
];

const badChars = /�|ï¿½/;
const issues = [];

for (const file of htmlFiles) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const src = fs.readFileSync(file, "utf8");

  if (badChars.test(src)) issues.push(`${rel}: contains encoding artifacts`);
  if (!/<meta charset="UTF-8"\s*\/?>/i.test(src)) issues.push(`${rel}: missing UTF-8 charset`);

  // 404 and redirect-only resource pages can be exceptions for h1/content patterns.
  const relaxH1 = rel === "404.html" || rel === "resources/index.html";

  for (const rule of requiredPatterns) {
    if (relaxH1 && rule.name === "h1") continue;
    if (!rule.re.test(src)) issues.push(`${rel}: missing ${rule.name}`);
  }
}

if (issues.length) {
  console.error(`SEO guard failed with ${issues.length} issue(s):`);
  issues.forEach((i) => console.error(`- ${i}`));
  process.exit(1);
}

console.log(`SEO guard passed on ${htmlFiles.length} HTML files.`);
