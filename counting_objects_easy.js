// counting_objects_easy.js
// Loads easyCountImages.js and exposes it as window.countingObjectSets
import easyCountImages from "./easyCountImages.js";

// ✅ Change this if your images folder is somewhere else
const IMAGE_BASE = ""; 
// Examples:
// const IMAGE_BASE = "";              // if your src already starts with "images/..."
// const IMAGE_BASE = "/";             // if you want "/images/..."
// const IMAGE_BASE = "https://yoursite.com/"; // if you ever move to full URLs

function joinUrl(base, path) {
  if (!path) return "";
  // If already absolute (http/https), leave it alone
  if (/^https?:\/\//i.test(path)) return path;

  // normalize slashes
  const b = (base || "").trim();
  const p = path.trim().replace(/^\.?\//, ""); // strip leading ./ or /
  if (!b) return p; // "images/dog.png"
  return b.replace(/\/?$/, "/") + p;
}

function toObj(item) {
  // Your easyCountImages should look like: { word, file, url } (url is site-relative)
  if (typeof item === "string") {
    const name = item.replace(/\.png$/i, "");
    return { name, src: joinUrl(IMAGE_BASE, item) };
  }

  const fileOrWord = (item.word || item.name || item.file || "").toString();
  const cleanName = fileOrWord.replace(/\.png$/i, "").trim();

  // prefer item.url (your site-relative), fallback to file
  const rawSrc = item.url || item.src || item.file || "";
  return {
    name: cleanName,
    src: joinUrl(IMAGE_BASE, rawSrc),
  };
}

const sets = Array.isArray(easyCountImages) ? easyCountImages.map(toObj).filter(o => o.src) : [];
window.countingObjectSets = sets;

console.log(`✅ Loaded ${sets.length} easy count images`);
