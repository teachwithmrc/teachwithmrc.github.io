// ====== LONG-A (ai/ay) WORD BANKS + LADDERS (PNG-backed) ======
// Generated for TeachwithMrC / Intervention Station

// ==== Long A (ay) — base, PNG-backed
const longA_ay = [
  { word: "bay", pattern: "12", split: ["b","ay"] },
  { word: "day", pattern: "12", split: ["d","ay"] },
  { word: "lay", pattern: "12", split: ["l","ay"] },
  { word: "pay", pattern: "12", split: ["p","ay"] },
  { word: "say", pattern: "12", split: ["s","ay"] },
];

// ==== Long A (ai) — base, PNG-backed
const longA_ai = [
  { word: "aid",  pattern: "21",  split: ["ai","d"] },
  { word: "ail",  pattern: "21",  split: ["ai","l"] },
  { word: "aim",  pattern: "21",  split: ["ai","m"] },
  { word: "fail", pattern: "121", split: ["f","ai","l"] },
  { word: "hail", pattern: "121", split: ["h","ai","l"] },
  { word: "jail", pattern: "121", split: ["j","ai","l"] },
  { word: "mail", pattern: "121", split: ["m","ai","l"] },
  { word: "nail", pattern: "121", split: ["n","ai","l"] },
  { word: "pail", pattern: "121", split: ["p","ai","l"] },
  { word: "pain", pattern: "121", split: ["p","ai","n"] },
  { word: "rain", pattern: "121", split: ["r","ai","n"] },
  { word: "rail", pattern: "121", split: ["r","ai","l"] },
  { word: "sail", pattern: "121", split: ["s","ai","l"] },
  { word: "tail", pattern: "121", split: ["t","ai","l"] },
  { word: "wail", pattern: "121", split: ["w","ai","l"] },
  { word: "chain", pattern: "221", split: ["ch","ai","n"] },
];

// ==== Long A (ay) with blends — PNG-backed
const longA_ay_blends = [
  { word: "gray",  pattern: "112",  split: ["gr","ay"] },
  { word: "play",  pattern: "112",  split: ["pl","ay"] },
  { word: "pray",  pattern: "112",  split: ["pr","ay"] },
  { word: "spray", pattern: "1112", split: ["spr","ay"] },
  { word: "stay",  pattern: "112",  split: ["st","ay"] },
  { word: "stray", pattern: "1112", split: ["str","ay"] },
  { word: "sway",  pattern: "112",  split: ["sw","ay"] },
  { word: "tray",  pattern: "112",  split: ["tr","ay"] },
];

// ==== Long A (ai) with blends — PNG-backed
const longA_ai_blends = [
  { word: "claim",  pattern: "1121",  split: ["cl","ai","m"] },
  { word: "drain",  pattern: "1121",  split: ["dr","ai","n"] },
  { word: "faint",  pattern: "1211",  split: ["f","ai","nt"] },
  { word: "grain",  pattern: "1121",  split: ["gr","ai","n"] },
  { word: "paint",  pattern: "1211",  split: ["p","ai","nt"] },
  { word: "plain",  pattern: "1121",  split: ["pl","ai","n"] },
  { word: "snail",  pattern: "1121",  split: ["sn","ai","l"] },
  { word: "Spain",  pattern: "1121",  split: ["Sp","ai","n"] }, // note: image should be spain.png
  { word: "stain",  pattern: "1121",  split: ["st","ai","n"] },
  { word: "train",  pattern: "1121",  split: ["tr","ai","n"] },
  { word: "sprain", pattern: "11121", split: ["spr","ai","n"] },
  { word: "strain", pattern: "11121", split: ["str","ai","n"] },
];

// ==== Long A (ai/ay) Images ====
const longAImages = {
  // ay base
  "bay": "images/bay.png",
  "day": "images/day.png",
  "lay": "images/lay.png",
  "pay": "images/pay.png",
  "say": "images/say.png",

  // ai base
  "aid": "images/aid.png",
  "ail": "images/ail.png",
  "aim": "images/aim.png",
  "fail": "images/fail.png",
  "hail": "images/hail.png",
  "jail": "images/jail.png",
  "mail": "images/mail.png",
  "nail": "images/nail.png",
  "pail": "images/pail.png",
  "pain": "images/pain.png",
  "rain": "images/rain.png",
  "rail": "images/rail.png",
  "sail": "images/sail.png",
  "tail": "images/tail.png",
  "wail": "images/wail.png",
  "chain": "images/chain.png",

  // ay blends
  "gray": "images/gray.png",
  "play": "images/play.png",
  "pray": "images/pray.png",
  "spray": "images/spray.png",
  "stay": "images/stay.png",
  "stray": "images/stray.png",
  "sway": "images/sway.png",
  "tray": "images/tray.png",

  // ai blends
  "claim": "images/claim.png",
  "drain": "images/drain.png",
  "faint": "images/faint.png",
  "grain": "images/grain.png",
  "paint": "images/paint.png",
  "plain": "images/plain.png",
  "snail": "images/snail.png",
  "spain": "images/spain.png", // lowercase filename
  "stain": "images/stain.png",
  "train": "images/train.png",
  "sprain": "images/sprain.png",
  "strain": "images/strain.png"
};

// ==== AY Ladders ====
const ayWordLadders = [
  ["bay", "stay", "lay", "pray", "sway", "play"],
  ["bay", "play", "tray", "gray", "sway", "stay"],
  ["bay", "spray", "stray", "say", "pay", "play"],
  ["day", "play", "sway", "pray", "stray", "say"],
  ["day", "gray", "play", "say", "pray", "tray"],
  ["day", "pay", "gray", "bay", "sway", "stay"],
  ["lay", "bay", "spray", "sway", "stray", "pay"],
  ["lay", "pray", "stay", "tray", "day", "spray"],
  ["lay", "sway", "stay", "say", "stray", "gray"],
  ["pay", "lay", "spray", "stray", "stay", "tray"],
  ["pay", "bay", "sway", "stay", "say", "stray"],
  ["pay", "stay", "lay", "pray", "sway", "tray"],
  ["say", "pay", "lay", "stray", "play", "day"],
  ["say", "pay", "stray", "day", "pray", "lay"],
  ["say", "tray", "stray", "stay", "gray", "pray"],
  ["gray", "tray", "stray", "spray", "pray", "sway"],
  ["gray", "pray", "spray", "play", "say", "pay"],
  ["gray", "tray", "day", "stray", "pay", "pray"],
  ["play", "gray", "lay", "tray", "stay", "bay"],
  ["play", "bay", "tray", "say", "lay", "stray"],
  ["play", "pray", "spray", "stay", "pay", "tray"],
  ["pray", "day", "play", "tray", "gray", "bay"],
  ["pray", "lay", "play", "stray", "day", "spray"],
  ["pray", "play", "stray", "gray", "say", "sway"],
  ["spray", "say", "day", "play", "bay", "tray"],
  ["spray", "tray", "stray", "stay", "pay", "lay"],
  ["spray", "day", "stray", "bay", "gray", "play"],
  ["stay", "pray", "pay", "say", "bay", "stray"],
  ["stay", "gray", "play", "bay", "sway", "tray"],
  ["stay", "play", "pay", "bay", "gray", "pray"],
  ["stray", "pay", "play", "pray", "bay", "day"],
  ["stray", "stay", "spray", "play", "say", "gray"],
  ["stray", "gray", "bay", "say", "play", "pay"],
  ["sway", "stray", "gray", "lay", "spray", "bay"],
  ["sway", "pay", "spray", "gray", "play", "say"],
  ["sway", "pray", "stay", "stray", "tray", "pay"],
  ["tray", "stay", "spray", "play", "lay", "say"],
  ["tray", "pray", "pay", "bay", "spray", "stay"],
  ["tray", "lay", "day", "gray", "spray", "sway"],
];

// ==== AI Ladders ====
const aiWordLadders = [
  ["fail", "sail", "hail", "rail", "tail", "jail"],
  ["fail", "nail", "jail", "tail", "pail", "rail"],
  ["fail", "nail", "hail", "mail", "jail", "wail"],
  ["hail", "sail", "rail", "fail", "tail", "mail"],
  ["hail", "tail", "nail", "wail", "jail", "pail"],
  ["hail", "rail", "tail", "sail", "mail", "wail"],
  ["jail", "pail", "fail", "nail", "tail", "wail"],
  ["jail", "hail", "tail", "nail", "wail", "fail"],
  ["jail", "mail", "fail", "pail", "wail", "nail"],
  ["mail", "hail", "nail", "jail", "wail", "tail"],
  ["mail", "fail", "wail", "jail", "tail", "sail"],
  ["mail", "pail", "nail", "fail", "hail", "sail"],
  ["nail", "mail", "hail", "pail", "sail", "rail"],
  ["nail", "fail", "jail", "hail", "tail", "wail"],
  ["nail", "rail", "sail", "jail", "mail", "pail"],
  ["pail", "jail", "tail", "nail", "mail", "rail"],
  ["pail", "mail", "fail", "nail", "rail", "tail"],
  ["pail", "rail", "nail", "sail", "tail", "jail"],
  ["pain", "pail", "hail", "wail", "mail", "jail"],
  ["pain", "rain", "rail", "nail", "tail", "jail"],
  ["pain", "pail", "jail", "mail", "hail", "tail"],
  ["rain", "rail", "fail", "pail", "nail", "sail"],
  ["rain", "rail", "mail", "nail", "jail", "tail"],
  ["rain", "pain", "pail", "fail", "jail", "rail"],
  ["rail", "tail", "jail", "mail", "hail", "nail"],
  ["rail", "hail", "sail", "nail", "pail", "tail"],
  ["rail", "hail", "tail", "jail", "nail", "wail"],
  ["sail", "pail", "rail", "mail", "nail", "tail"],
  ["sail", "rail", "jail", "pail", "tail", "mail"],
  ["sail", "hail", "fail", "tail", "rail", "pail"],
  ["tail", "rail", "nail", "mail", "hail", "fail"],
  ["tail", "nail", "rail", "fail", "wail", "mail"],
  ["tail", "wail", "hail", "pail", "rail", "fail"],
  ["wail", "jail", "fail", "tail", "rail", "mail"],
  ["wail", "jail", "nail", "fail", "sail", "mail"],
  ["wail", "pail", "hail", "rail", "tail", "jail"],
];

// === Expose globals for non-module HTML (mirrors digraph file) ===
if (typeof window !== 'undefined') {
  // word banks
  window.longA_ai         = longA_ai;
  window.longA_ay         = longA_ay;
  window.longA_ai_blends  = longA_ai_blends;
  window.longA_ay_blends  = longA_ay_blends;

  // ladders
  window.aiWordLadders    = aiWordLadders;
  window.ayWordLadders    = ayWordLadders;

  // images
  window.longAImages      = longAImages;
}
