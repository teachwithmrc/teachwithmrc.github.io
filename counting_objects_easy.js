// counting_objects_easy.js
import * as mod from "./easyCountImages.js";

const IMAGE_BASE = ""; // leave "" if urls already look like "/images/dog.png"

function joinUrl(base, path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const b = (base || "").trim();
  const p = String(path).trim().replace(/^\.?\//, ""); // strip leading ./ or /
  if (!b) return p;
  return b.replace(/\/?$/, "/") + p;
}

function getList() {
  // supports: export default, export const, or window.easyCountImages
  return (
    mod.default ||
    mod.easyCountImages ||
    window.easyCountImages ||
    []
  );
}

function toObj(item) {
  if (typeof item === "string") {
    const name = item.replace(/\.png$/i, "");
    return { name, src: joinUrl(IMAGE_BASE, item) };
  }

  const fileOrWord = (item.word || item.name || item.file || "").toString();
  const cleanName = fileOrWord.replace(/\.png$/i, "").trim();

  const rawSrc = item.url || item.src || item.file || "";
  return { name: cleanName, src: joinUrl(IMAGE_BASE, rawSrc) };
}

const list = getList();
const sets = Array.isArray(list) ? list.map(toObj).filter(o => o.src) : [];

window.countingObjectSets = sets;

console.log("✅ Loaded countingObjectSets:", sets.length, sets[0]);
