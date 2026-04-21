import fs from "fs";
import path from "path";

const root = process.cwd();
const navPath = path.join(root, "partials", "nav.html");
const footerPath = path.join(root, "partials", "footer.html");

if (!fs.existsSync(navPath) || !fs.existsSync(footerPath)) {
  throw new Error("Missing partials/nav.html or partials/footer.html");
}

const navHome = fs.readFileSync(navPath, "utf8").trim();
const navInner = navHome.replace(
  'href="#top" aria-label="Illyrian Pixel – Kryefaqja"',
  'href="/" aria-label="Illyrian Pixel – Kryefaqja"'
);
const footer = fs.readFileSync(footerPath, "utf8").trim() + "\n";

const htmlFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git", "assets", "tools", "scripts", "partials"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(full);
  }
};
walk(root);

const navRegex = /<nav[\s\S]*?id="ipNavbar"[\s\S]*?<\/nav>\s*/;
const footerRegex = /(?:<!-- FOOTER -->\s*)?<footer class="footer ip-footer[^\"]*"[\s\S]*?<\/footer>\s*/;

let updated = 0;
for (const full of htmlFiles) {
  const rel = path.relative(root, full).replace(/\\/g, "/");
  const src = fs.readFileSync(full, "utf8");
  if (!src.includes('id="ipNavbar"') || !src.includes("<footer")) continue;
  const nav = rel === "index.html" ? navHome : navInner;
  const withNav = src.replace(navRegex, `${nav}\n`);
  const withFooter = withNav.replace(footerRegex, footer);
  if (withFooter !== src) {
    fs.writeFileSync(full, withFooter, "utf8");
    updated += 1;
    console.log(`updated ${rel}`);
  }
}
console.log(`synced ${updated} html files`);
