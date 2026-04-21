import fs from "fs";
import path from "path";

const root = process.cwd();
const files = [];
function walk(dir){
  for (const e of fs.readdirSync(dir,{withFileTypes:true})){
    if (["node_modules",".git"].includes(e.name)) continue;
    const full = path.join(dir,e.name);
    if (e.isDirectory()) walk(full);
    else if (e.isFile() && e.name.endsWith('.html')) files.push(full);
  }
}
walk(root);

let updated=0;
for (const file of files){
  let s = fs.readFileSync(file,'utf8');
  const before = s;

  s = s.replace(/href="#top" class="visually-hidden-focusable[^"]*"/g, (m)=>m.replace('href="#top"','href="#main-content"'));

  s = s.replace(/<main>/g, '<main id="main-content" tabindex="-1">');

  s = s.replace(/<img\b([^>]*?)>/g, (m, attrs) => {
    if (/loading=/.test(attrs)) return m;
    if (/hero-bg-3\.png/.test(attrs) || /loading="eager"/.test(attrs)) return m;
    return `<img${attrs} loading="lazy" decoding="async">`;
  });

  s = s.replace(/<meta charset="utf-8"\s*\/>/ig,'<meta charset="UTF-8" />');

  if (s !== before) { fs.writeFileSync(file,s,'utf8'); updated++; }
}
console.log(`Applied accessibility/performance hardening on ${updated} html files.`);
