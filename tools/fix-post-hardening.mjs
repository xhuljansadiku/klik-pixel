import fs from "fs";
import path from "path";

const root = process.cwd();

// Fix SCSS encoding artifacts
const scssDir = path.join(root, "assets", "scss");
const scssFiles = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.isFile() && e.name.endsWith('.scss')) scssFiles.push(full);
  }
};
walk(scssDir);

for (const file of scssFiles) {
  let s = fs.readFileSync(file, 'utf8');
  s = s.replace(/^\uFEFF/, '');
  s = s.replace(/^�/, '');
  s = s.replace(/[\u0013\u0014]/g, '-');
  fs.writeFileSync(file, s, 'utf8');
}

// Revert skip link target for broad compatibility
const htmlFiles = [];
const walkHtml = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git"].includes(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkHtml(full);
    else if (e.isFile() && e.name.endsWith('.html')) htmlFiles.push(full);
  }
};
walkHtml(root);
for (const file of htmlFiles) {
  let s = fs.readFileSync(file, 'utf8');
  s = s.replace(/href="#main-content" class="visually-hidden-focusable/g, 'href="#top" class="visually-hidden-focusable');
  fs.writeFileSync(file, s, 'utf8');
}

console.log(`Fixed SCSS artifacts (${scssFiles.length} files) and normalized skip-link target.`);
