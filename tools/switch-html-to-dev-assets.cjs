const fs = require("fs");
const path = require("path");
const root = process.cwd();
for (const f of fs.readdirSync(root)) {
  if (!f.endsWith('.html')) continue;
  const p = path.join(root, f);
  let s = fs.readFileSync(p, 'utf8');
  s = s.replace(/assets\/css\/style\.min\.css/g, 'assets/css/style.css');
  s = s.replace(/assets\/js\/main\.min\.js/g, 'assets/js/main.js');
  fs.writeFileSync(p, s, 'utf8');
}
console.log('HTML switched to dev assets');
