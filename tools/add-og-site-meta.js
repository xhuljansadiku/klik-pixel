const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const block =
  '  <meta property="og:site_name" content="Illyrian Pixel" />\n' +
  '  <meta property="og:locale" content="sq_AL" />\n';

let n = 0;
for (const f of fs.readdirSync(root)) {
  if (!f.endsWith(".html")) continue;
  const p = path.join(root, f);
  let s = fs.readFileSync(p, "utf8");
  if (!s.includes('property="og:url"') || s.includes('property="og:site_name"')) continue;
  s = s.replace(/(<meta property="og:url"[^\n]+\r?\n)(\s*<meta name="twitter)/, `$1${block}$2`);
  if (!s.includes('property="og:site_name"')) continue;
  fs.writeFileSync(p, s, "utf8");
  n++;
  console.log("og:site", f);
}
console.log("total", n);
