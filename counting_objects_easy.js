// counting_objects_easy.js
// Uses absolute URLs (full links) for every image
import * as mod from "./easyCountImages.js";

// Change this ONLY if your domain changes
const SITE_ORIGIN = "https://teachwithmrc.github.io";

function toAbsoluteUrl(u) {
  if (!u) return "";
  const s = String(u).trim();

  // already absolute
  if (/^https?:\/\//i.test(s)) return s;

  // site-relative (/images/dog.png)
  if (s.startsWith("/")) return SITE_ORIGIN + s;

  // relative (images/dog.png or dog.png) -> force under site root
  return SITE_ORIGIN + "/" + s.replace(/^\.?\//, "");
}

function getList() {
  // supports either: export default [...]  OR export const easyCountImages = [...]
  return mod.default || mod.easyCountImages || window.easyCountImages || [];
}

function toObj(item) {
  if (typeof item === "string") {
    const name = item.replace(/\.png$/i, "");
    return { name, src: toAbsoluteUrl(item) };
  }

  const name = String(item.word || item.name || item.file || item.src || item.url || "")
    .replace(/\.png$/i, "")
    .trim();

  // Prefer url first (what you asked for)
  const src = toAbsoluteUrl(item.url || item.src || item.file || "");

  return { name, src };
}

const list = getList();
const sets = Array.isArray(list) ? list.map(toObj).filter(o => o.src) : [];

window.countingObjectSets = sets;

console.log("✅ Loaded easy count images:", sets.length);
console.log("🔎 Example:", sets[0]);
