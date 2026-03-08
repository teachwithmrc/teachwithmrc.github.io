const GENERATORS = {
  "fluency-grid": {
    title: "Fluency Grid",
    src: "https://teachwithmrc.github.io/mobile/generators/fluency-grid.html",
    width: 488,
    height: 1180
  },
  "word-mapping": {
    title: "Word Mapping",
    src: "https://teachwithmrc.github.io/mobile/generators/word-mapping.html",
    width: 488,
    height: 1240
  },
  "word-ladder": {
    title: "Word Ladder",
    src: "https://teachwithmrc.github.io/mobile/generators/word-ladder.html",
    width: 488,
    height: 1280
  },
  "roll-and-read": {
    title: "Roll and Read",
    src: "https://teachwithmrc.github.io/mobile/generators/roll-and-read.html",
    width: 488,
    height: 1240
  },
  "pyramid-spelling": {
    title: "Pyramid Spelling",
    src: "https://teachwithmrc.github.io/mobile/generators/pyramid-spelling.html",
    width: 488,
    height: 1340
  }
};

const previewFrame = document.getElementById("previewFrame");
const previewViewport = document.getElementById("previewViewport");
const pickerButtons = Array.from(document.querySelectorAll(".me-pill"));

let currentId = "fluency-grid";

function fitPreview(item) {
  const frameWidth = item.width;
  const frameHeight = item.height;
  const viewportWidth = previewViewport.clientWidth;
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
  previewFrame.title = `Reading Generators - ${item.title}`;
  previewFrame.src = item.src;
  fitPreview(item);
}

pickerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    loadGenerator(button.dataset.item);
  });
});

window.addEventListener("resize", () => {
  fitPreview(GENERATORS[currentId]);
});

previewFrame.addEventListener("load", () => {
  fitPreview(GENERATORS[currentId]);
});

loadGenerator(currentId);
