import fs from "fs";
import path from "path";

const root = process.cwd();

const routeMap = new Map([
  ["index.html", "/"],
  ["services.html", "/services/"],
  ["website.html", "/services/website/"],
  ["ecommerce.html", "/services/ecommerce/"],
  ["marketing.html", "/services/marketing/"],
  ["photography.html", "/services/photography/"],
  ["branding.html", "/services/branding/"],
  ["maintenance.html", "/services/maintenance/"],
  ["work.html", "/work/"],
  ["case-study-website-tirane.html", "/work/case-study-website-tirane/"],
  ["case-study-ecommerce-shqiperi.html", "/work/case-study-ecommerce-shqiperi/"],
  ["pricing.html", "/pricing/"],
  ["process.html", "/process/"],
  ["faq.html", "/faq/"],
  ["contact.html", "/contact/"],
  ["blog.html", "/blog/"],
  ["seo-kosto-website-shqiperi-2026.html", "/blog/seo-kosto-website-shqiperi-2026/"],
  ["privacy.html", "/legal/privacy/"],
  ["terms.html", "/legal/terms/"],
  ["resources.html", "/resources/"],
  ["404.html", "/404.html"],
]);

const htmlFiles = Array.from(routeMap.keys()).filter((f) => fs.existsSync(path.join(root, f)));

const copyStatic = ["assets", "robots.txt", "sitemap.xml"];

const preserveDirs = ["tools", "scripts", "partials", "node_modules", ".github", ".vscode", "assets", "mcps", ".git"];

const toPublicPath = (href) => {
  if (!href) return href;
  if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) return href;

  const clean = href.replace(/^\.\//, "");

  if (clean.startsWith("assets/")) return `/${clean}`;

  const [filePart, hashPart] = clean.split("#");
  const [basePart, queryPart] = filePart.split("?");

  if (routeMap.has(basePart)) {
    let dest = routeMap.get(basePart);
    if (queryPart) dest += `?${queryPart}`;
    if (hashPart) dest += `#${hashPart}`;
    return dest;
  }

  if (basePart.endsWith(".html")) {
    const bare = basePart.replace(/\.html$/, "");
    let dest = `/${bare}/`;
    if (queryPart) dest += `?${queryPart}`;
    if (hashPart) dest += `#${hashPart}`;
    return dest;
  }

  return href;
};

const rewriteHtml = (src) => {
  let out = src;

  out = out.replace(/(href|src)="([^"]+)"/g, (_, attr, val) => `${attr}="${toPublicPath(val)}"`);

  out = out.replace(/<link rel="canonical" href="https:\/\/illyrianpixel\.com\/[^\"]*"\s*\/>/g, (m) => {
    const match = m.match(/href="https:\/\/illyrianpixel\.com\/([^\"]*)"/);
    const original = match?.[1] || "";
    const filename = original === "" ? "index.html" : original.replace(/^\/+/, "");
    const mapped = routeMap.get(filename) ?? `/${filename.replace(/\.html$/, "")}/`;
    return `<link rel="canonical" href="https://illyrianpixel.com${mapped}" />`;
  });

  out = out.replace(/<meta property="og:url" content="https:\/\/illyrianpixel\.com\/([^\"]*)"\s*\/>/g, (_, original) => {
    const filename = original === "" ? "index.html" : original.replace(/^\/+/, "");
    const mapped = routeMap.get(filename) ?? `/${filename.replace(/\.html$/, "")}/`;
    return `<meta property="og:url" content="https://illyrianpixel.com${mapped}" />`;
  });

  out = out.replace(/<meta http-equiv="refresh" content="0;url=([^\"]+)"\s*\/>/g, (_, url) => {
    return `<meta http-equiv="refresh" content="0;url=${toPublicPath(url)}" />`;
  });

  out = out.replace(/location\.replace\("([^"]+)"\)/g, (_, url) => `location.replace("${toPublicPath(url)}")`);

  return out;
};

const ensureDir = (p) => fs.mkdirSync(p, { recursive: true });

const routeToDisk = (route) => {
  if (route === "/") return path.join(root, "index.html");
  if (route.endsWith(".html")) return path.join(root, route.replace(/^\//, ""));
  return path.join(root, route.replace(/^\//, ""), "index.html");
};

// Write new structured pages
for (const file of htmlFiles) {
  const sourcePath = path.join(root, file);
  const raw = fs.readFileSync(sourcePath, "utf8");
  const transformed = rewriteHtml(raw);
  const route = routeMap.get(file);
  const targetPath = routeToDisk(route);
  ensureDir(path.dirname(targetPath));
  fs.writeFileSync(targetPath, transformed, "utf8");
}

// Create legacy redirects for old .html files (except index and 404)
for (const file of htmlFiles) {
  if (file === "index.html" || file === "404.html") continue;
  const route = routeMap.get(file);
  const redirect = `<!doctype html>\n<html lang="sq">\n<head>\n  <meta charset="utf-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1" />\n  <meta name="robots" content="noindex,follow" />\n  <title>Duke ridrejtuar…</title>\n  <meta http-equiv="refresh" content="0;url=${route}" />\n  <link rel="canonical" href="https://illyrianpixel.com${route}" />\n  <script>location.replace("${route}");</script>\n</head>\n<body>\n  <p>Faqja është zhvendosur. <a href="${route}">Vazhdo</a>.</p>\n</body>\n</html>\n`;
  fs.writeFileSync(path.join(root, file), redirect, "utf8");
}

// Update sitemap URLs to clean routes
const sitemapPath = path.join(root, "sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  let sm = fs.readFileSync(sitemapPath, "utf8");
  for (const [oldFile, route] of routeMap.entries()) {
    if (oldFile === "404.html" || oldFile === "resources.html") continue;
    const oldLoc = oldFile === "index.html" ? "https://illyrianpixel.com/" : `https://illyrianpixel.com/${oldFile}`;
    const newLoc = `https://illyrianpixel.com${route}`;
    sm = sm.split(oldLoc).join(newLoc);
  }
  fs.writeFileSync(sitemapPath, sm, "utf8");
}

console.log("Site restructured to clean routes with legacy redirects.");
