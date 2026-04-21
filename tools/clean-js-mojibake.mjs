import fs from "fs";
import path from "path";
const dir = path.join(process.cwd(), "assets", "js", "modules");
const files = fs.readdirSync(dir).filter(f=>f.endsWith('.js'));
for (const f of files){
  const p = path.join(dir,f);
  let s = fs.readFileSync(p,'utf8');
  s = s.split('��').join('€');
  s = s.split('�').join('');
  s = s.replace(/(\d)-(\d)\s*dit/g,'$1-$2 dit');
  s = s.replace(/(\d)-(\d)\s*jav/g,'$1-$2 jav');
  s = s.replace(/\s<\/span>`;/g,' →</span>`;');
  fs.writeFileSync(p,s,'utf8');
}
console.log(`Cleaned mojibake tokens in ${files.length} JS modules.`);
