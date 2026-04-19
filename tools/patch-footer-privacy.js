const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..");
const old = `          <li><a class="footer-link ip-footer-luxe__link" href="faq.html">FAQ</a></li>
          <li><a class="footer-link ip-footer-luxe__link" href="contact.html">Kontakt</a></li>`;
const neu = `          <li><a class="footer-link ip-footer-luxe__link" href="faq.html">FAQ</a></li>
          <li><a class="footer-link ip-footer-luxe__link" href="privacy.html">Privatësia</a></li>
          <li><a class="footer-link ip-footer-luxe__link" href="contact.html">Kontakt</a></li>`;

let patched = 0;
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".html") || f === "privacy.html") continue;
  const p = path.join(dir, f);
  let s = fs.readFileSync(p, "utf8");
  if (s.includes('href="privacy.html">Privatësia</a></li>')) continue;
  if (s.includes(old)) {
    s = s.replace(old, neu);
    fs.writeFileSync(p, s, "utf8");
    patched++;
    continue;
  }
  const oldLf = old.replace(/\r\n/g, "\n");
  if (s.includes(oldLf)) {
    s = s.replace(oldLf, neu.replace(/\r\n/g, "\n"));
    fs.writeFileSync(p, s, "utf8");
    patched++;
  }
}
console.log("patched", patched);
