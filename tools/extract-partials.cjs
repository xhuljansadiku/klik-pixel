const fs = require("fs");
const s = fs.readFileSync("index.html", "utf8");
const nav = s.match(/<nav[\s\S]*?id="ipNavbar"[\s\S]*?<\/nav>/);
const foot = s.match(/<!-- FOOTER -->[\s\S]*?<\/footer>/);
if (!nav || !foot) throw new Error("nav/footer not found");
fs.mkdirSync("partials", { recursive: true });
fs.writeFileSync("partials/nav.html", nav[0] + "\n");
fs.writeFileSync("partials/footer.html", foot[0] + "\n");
console.log("Created partials/nav.html and partials/footer.html");
