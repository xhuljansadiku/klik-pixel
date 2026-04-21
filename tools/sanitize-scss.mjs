import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "assets", "scss");
const files = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.isFile() && e.name.endsWith('.scss')) files.push(full);
  }
};
walk(root);

const map = new Map([
  ['ë','e'],['Ë','E'],['ç','c'],['Ç','C'],['–','-'],['—','-'],['’',"'"],['“','"'],['”','"'],['•','-']
]);

for (const file of files) {
  let s = fs.readFileSync(file, 'utf8');
  s = s.replace(/^\uFEFF/, '');
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  for (const [a,b] of map.entries()) s = s.split(a).join(b);
  s = s.replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '');
  fs.writeFileSync(file, s, 'utf8');
}
console.log(`Sanitized ${files.length} SCSS files to valid UTF-8 ASCII-safe content.`);
