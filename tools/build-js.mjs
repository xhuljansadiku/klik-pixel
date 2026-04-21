import fs from "fs";
import path from "path";

const root = process.cwd();
const modulesDir = path.join(root, "assets", "js", "modules");
const outFile = path.join(root, "assets", "js", "main.js");

const orderedFiles = [
  "00-core-start.js",
  "01-reveal.js",
  "02-faq.js",
  "03-contact.js",
  "10-pricing.js",
  "15-footer-interactions.js",
  "20-nav.js",
];

const chunks = orderedFiles.map((file) => {
  const abs = path.join(modulesDir, file);
  if (!fs.existsSync(abs)) {
    throw new Error(`Missing JS module: ${file}`);
  }
  return fs.readFileSync(abs, "utf8").trimEnd();
});

const output = `${chunks.join("\n\n")}` + "\n";
fs.writeFileSync(outFile, output, "utf8");
console.log(`Built ${path.relative(root, outFile)} from ${orderedFiles.length} modules.`);
