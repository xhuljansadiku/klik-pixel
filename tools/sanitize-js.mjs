import fs from "fs";
import path from "path";

const targets = [path.join(process.cwd(), "assets", "js", "modules"), path.join(process.cwd(), "assets", "js")];
const files = [];
for (const t of targets) {
  if (!fs.existsSync(t)) continue;
  for (const e of fs.readdirSync(t, { withFileTypes: true })) {
    const full = path.join(t, e.name);
    if (e.isFile() && e.name.endsWith('.js')) files.push(full);
  }
}

for (const file of files) {
  let s = fs.readFileSync(file, 'utf8');
  s = s.replace(/^\uFEFF/, '');
  s = s.replace(/^�/, '');
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  fs.writeFileSync(file, s, 'utf8');
}
console.log(`Sanitized ${files.length} JS files.`);
