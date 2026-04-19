const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const needle = '<meta name="theme-color" content="#d5cea3" />';
const insert = `${needle}\n  <meta name="ip-ga-measurement-id" content="" />`;

let n = 0;
for (const f of fs.readdirSync(root)) {
  if (!f.endsWith(".html") || f === "index.html") continue;
  const p = path.join(root, f);
  let s = fs.readFileSync(p, "utf8");
  if (s.includes('name="ip-ga-measurement-id"')) continue;
  if (!s.includes(needle)) continue;
  s = s.replace(needle, insert);
  fs.writeFileSync(p, s, "utf8");
  n++;
  console.log("ga-meta", f);
}
console.log("total", n);
