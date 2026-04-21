const fs = require("fs");
const path = require("path");

const root = process.cwd();
const skipDirs = new Set(["node_modules", ".git", "assets", "tools", "scripts", "partials"]);
const htmlFiles = [];

function walk(dir){
  for (const e of fs.readdirSync(dir, {withFileTypes:true})){
    if (skipDirs.has(e.name)) continue;
    const full = path.join(dir,e.name);
    if (e.isDirectory()) walk(full);
    else if (e.isFile() && e.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(root);

const urlToFile = new Map();
for (const f of htmlFiles){
  const rel = path.relative(root,f).replace(/\\/g,'/');
  if (rel === 'index.html') urlToFile.set('/', f);
  if (rel.endsWith('/index.html')) urlToFile.set('/'+rel.slice(0,-'index.html'.length), f);
  if (/^[^/]+\.html$/.test(rel)) urlToFile.set('/'+rel, f);
}

const hrefRe = /href="([^"]+)"/g;
const idRe = /\sid="([^"]+)"/g;
const issues = [];
let checked = 0;

for (const file of htmlFiles){
  const rel = path.relative(root,file).replace(/\\/g,'/');
  const src = fs.readFileSync(file,'utf8');
  const ids = new Set([...src.matchAll(idRe)].map(m=>m[1]));
  let m;
  while ((m = hrefRe.exec(src)) !== null){
    const href = m[1];
    if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;
    checked++;

    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (id && !ids.has(id)) issues.push(`${rel}: missing local anchor ${href}`);
      continue;
    }

    const [pathPart, hash] = href.split('#');
    const cleaned = pathPart.split('?')[0];

    if (cleaned.startsWith('/assets/')){
      const abs = path.join(root, cleaned.slice(1));
      if (!fs.existsSync(abs)) issues.push(`${rel}: missing asset ${href}`);
      continue;
    }

    if (cleaned.startsWith('/')){
      const candidate = urlToFile.get(cleaned.endsWith('/') ? cleaned : cleaned);
      if (!candidate) issues.push(`${rel}: unresolved absolute link ${href}`);
      else if (hash){
        const t = fs.readFileSync(candidate,'utf8');
        const targetIds = new Set([...t.matchAll(idRe)].map(x=>x[1]));
        if (!targetIds.has(hash)) issues.push(`${rel}: target anchor not found ${href}`);
      }
      continue;
    }

    const abs = path.resolve(path.dirname(file), cleaned);
    if (!fs.existsSync(abs)) issues.push(`${rel}: unresolved relative link ${href}`);
  }
}

console.log(`Checked links: ${checked}`);
if (issues.length){
  console.log(`Broken/unresolved: ${issues.length}`);
  for (const i of issues.slice(0,120)) console.log(i);
  if (issues.length > 120) console.log(`...and ${issues.length-120} more`);
  process.exitCode = 1;
} else {
  console.log('All internal links resolved.');
}
