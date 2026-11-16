// Prerender static routes into dist/ so the first paint doesn't wait for JS.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);

const de = JSON.parse(fs.readFileSync(path.join(root, "src/locales/de.json"), "utf8"));

// "/" has no file on purpose: vercel.json rewrites pick /en/ or /de/ by cookie or Accept-Language
// (Vercel serves filesystem matches before rewrites, so a dist/index.html would always win).
const routes = [
  { url: "/", lang: "en", files: ["en/index.html"] },
  { url: "/", lang: "de", files: ["de/index.html"] },
  { url: "/impressum", lang: "en", files: ["impressum/index.html"] },
  { url: "/datenschutz", lang: "en", files: ["datenschutz/index.html"] },
];

for (const r of routes) {
  const html = await render(r.url, r.lang);
  let page = template.replace('<div id="root"></div>', `<div id="root" data-prerendered="${r.url}" data-lang="${r.lang}">${html}</div>`);
  if (r.lang === "de") {
    page = page
      .replace('<html lang="en"', '<html lang="de"')
      .replace(/<title>[^<]*<\/title>/, `<title>${de.meta.title}</title>`)
      .replace(/(<meta name="description" content=")[^"]*"/, `$1${de.meta.description}"`);
  }
  if (r.url !== "/") page = page.replace('href="https://www.suku.live/" />', `href="https://www.suku.live${r.url}" />`).replace(/<link rel="canonical" href="https:\/\/www\.suku\.live\/"/, `<link rel="canonical" href="https://www.suku.live${r.url}"`);
  for (const file of r.files) {
    const out = path.join(dist, file);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, page);
    console.log(`prerendered ${r.url} [${r.lang}] -> dist/${file} (${(page.length / 1024).toFixed(1)} kB)`);
  }
}
fs.rmSync(path.join(root, "dist", "index.html"));
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
