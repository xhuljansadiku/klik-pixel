const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const re =
  /<li><a class="footer-link ip-footer-luxe__link" href="faq.html">FAQ<\/a><\/li>\s*<li><a class="footer-link ip-footer-luxe__link" href="contact.html">Kontakt<\/a><\/li>/;
const replacement = `<li><a class="footer-link ip-footer-luxe__link" href="faq.html">FAQ</a></li>
          <li><a class="footer-link ip-footer-luxe__link" href="privacy.html">Privatësia</a></li>
          <li><a class="footer-link ip-footer-luxe__link" href="contact.html">Kontakt</a></li>`;

let patched = 0;
for (const f of fs.readdirSync(root)) {
  if (!f.endsWith(".html")) continue;
  const p = path.join(root, f);
  let s = fs.readFileSync(p, "utf8");
  if (s.includes('href="privacy.html">Privatësia')) continue;
  if (!re.test(s)) continue;
  s = s.replace(re, replacement);
  fs.writeFileSync(p, s, "utf8");
  patched++;
  console.log("patched", f);
}
console.log("total", patched);
