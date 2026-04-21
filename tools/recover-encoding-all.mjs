�import fs from "fs";
import path from "path";

const root = process.cwd();
const exts = new Set([".html", ".js", ".mjs", ".cjs", ".scss", ".css"]);
const skip = new Set(["node_modules", ".git"]);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (exts.has(path.extname(e.name))) out.push(full);
  }
  return out;
}

const badPattern = /�|�|�|� |�S|�/g;
let changed = 0;
for (const file of walk(root)) {
  const src = fs.readFileSync(file, "utf8");
  const rec = Buffer.from(src, "latin1").toString("utf8");
  const badSrc = (src.match(badPattern) || []).length;
  const badRec = (rec.match(badPattern) || []).length;
  if (badRec < badSrc) {
    fs.writeFileSync(file, rec, "utf8");
    changed += 1;
  }
}
console.log(`Recovered encoding in ${changed} files.`);
