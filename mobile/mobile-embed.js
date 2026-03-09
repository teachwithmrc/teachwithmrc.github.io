const GENERATORS = {
  "fluency-grid": {
    title: "Fluency Grid",
    category: "Reading",
    src: "https://teachwithmrc.github.io/mobile/generators/fluency-grid.html",
    width: 488,
    height: 1180
  },
  "word-mapping": {
    title: "Word Mapping",
    category: "Reading",
    src: "https://teachwithmrc.github.io/mobile/generators/word-mapping.html",
    width: 488,
    height: 1240
  },
  "roll-and-read": {
    title: "Roll and Read",
    category: "Reading",
    src: "https://teachwithmrc.github.io/mobile/generators/roll-and-read.html",
    width: 488,
    height: 1260
  },
  "pyramid-spelling": {
    title: "Pyramid Spelling",
    category: "Reading",
    src: "https://teachwithmrc.github.io/mobile/generators/pyramid-spelling.html",
    width: 488,
    height: 1340
  },
  "long-division-scaffold": {
    title: "Long Division Scaffold",
    category: "Math",
    src: "https://teachwithmrc.github.io/mobile/generators/long-division-scaffold.html",
    width: 1160,
    height: 1540
  },
  "partial-products": {
    title: "Partial Products",
    category: "Math",
    src: "https://teachwithmrc.github.io/mobile/generators/partial-products.html",
    width: 460,
    height: 1320
  },
  "coin-counter": {
    title: "Coin Counter",
    category: "Math",
    src: "https://teachwithmrc.github.io/mobile/generators/coin-counter.html",
    width: 460,
    height: 1180
  },
  "math-roll-and-read": {
    title: "Math Roll and Read",
    category: "Math",
    src: "https://teachwithmrc.github.io/mobile/generators/math-roll-and-read.html",
    width: 460,
    height: 1260
  },
  "long-division": {
    title: "Long Division",
    category: "Math",
    src: "https://teachwithmrc.github.io/mobile/generators/long-division.html",
    width: 480,
    height: 1280
  }
};

const previewFrame = document.getElementById("previewFrame");
const previewViewport = document.getElementById("previewViewport");
const previewTitle = document.getElementById("previewTitle");
const previewCategory = document.getElementById("previewCategory");
const previewEmpty = document.getElementById("previewEmpty");
const pickerButtons = Array.from(document.querySelectorAll(".me-pill"));

let currentId = null;

function fitPreview(item) {
  if (!item) return;

  const frameWidth = item.width;
  const frameHeight = item.height;
  const viewportWidth = previewViewport.clientWidth || frameWidth;
  const scale = viewportWidth / frameWidth;

  previewFrame.style.width = `${frameWidth}px`;
  previewFrame.style.height = `${frameHeight}px`;
  previewFrame.style.transform = `scale(${scale})`;
  previewViewport.style.height = `${Math.ceil(frameHeight * scale)}px`;
}

function setActiveButton(id) {
  pickerButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.item === id);
  });
}

function loadGenerator(id) {
  const item = GENERATORS[id];
  if (!item) return;

  currentId = id;
  setActiveButton(id);
  previewTitle.textContent = item.title;
  previewCategory.textContent = item.category;
  previewFrame.title = `Intervention Station Generator Preview - ${item.title}`;
  previewEmpty.style.display = "none";
  previewFrame.style.display = "block";
  previewFrame.src = item.src;
  fitPreview(item);
}

pickerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    loadGenerator(button.dataset.item);
  });
});

window.addEventListener("resize", () => {
  if (currentId) {
    fitPreview(GENERATORS[currentId]);
  }
});

previewFrame.addEventListener("load", () => {
  if (currentId) {
    fitPreview(GENERATORS[currentId]);
  }
});
