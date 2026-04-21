�import fs from "fs";
import path from "path";

const root = process.cwd();
const skip = new Set(["node_modules", ".git", "assets", "scripts", "tools"]);

const replacements = new Map([
  ["për", "p�r"],["Për", "P�r"],["në", "n�"],["Në", "N�"],["ë", "�"],["�!", "�"],["ç", "�"],
  ["është", "�sht�"],["Shërbimet", "Sh�rbimet"],["shërb", "sh�rb"],["Merr ofertë", "Merr ofert�"],
  ["menynë", "menyn�"],["Mirëmbajtje", "Mir�mbajtje"],["Punët", "Pun�t"],["Privatësia", "Privat�sia"],
  ["Të gjitha", "T� gjitha"],["Të", "T�"],["të", "t�"],["që", "q�"],["më", "m�"],["Dërgo", "D�rgo"],
  ["Kërkesë", "K�rkes�"],["Zgjidh shërbimin", "Zgjidh sh�rbimin"],["shërbimin", "sh�rbimin"],["shërbim", "sh�rbim"],
  ["Përgjigje", "P�rgjigje"],["përfshin", "p�rfshin"],["përmbajtja", "p�rmbajtja"],["përmbajtje", "p�rmbajtje"],
  ["� ", "�"],["·", "�"],["�", ""],["�", ""],["�S"", ""],["©", "�"],["�S", "\""],["⬝", "\""],
  ["�0", "�"],["�", "�"]
]);

function walk(dir, out=[]) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && e.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const files = walk(root);
let touched = 0;
for (const file of files) {
  let s = fs.readFileSync(file, "utf8");
  const before = s;

  s = s.replace(/<meta charset="utf-8"\s*\/>/i, '<meta charset="UTF-8" />');

  for (const [bad, good] of replacements.entries()) {
    s = s.split(bad).join(good);
  }

  if (s.includes("�") || s.includes("�") || s.includes("�") || s.includes("� ") || s.includes("�S")) {
    const recovered = Buffer.from(s, "latin1").toString("utf8");
    const badScore = (txt) => (txt.match(/�|�|�|� |�S/g) || []).length;
    if (badScore(recovered) < badScore(s)) s = recovered;
  }

  if (s !== before) {
    fs.writeFileSync(file, s, "utf8");
    touched += 1;
  }
}

console.log(`Normalized encoding on ${touched} HTML files.`);
