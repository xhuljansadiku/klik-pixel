const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
let n = 0;
for (const f of fs.readdirSync(root)) {
  if (!f.endsWith(".html")) continue;
  const p = path.join(root, f);
  let s = fs.readFileSync(p, "utf8");
  const next = s.replace(/<html lang="sq"([^>]*)>/, (m, rest) => {
    if (rest.includes("data-ip-ga-id")) return m;
    return `<html lang="sq" data-ip-ga-id=""${rest}>`;
  });
  if (next !== s) {
    fs.writeFileSync(p, next, "utf8");
    n++;
    console.log("ga-attr", f);
  }
}
console.log("total", n);
