const topTabs = Array.from(document.querySelectorAll(".tool-tab"));
const panels = Array.from(document.querySelectorAll(".main-panel"));
const showcaseShell = document.querySelector(".showcase-shell");

function revealPanel(panelId) {
  panels.forEach((panel) => {
    panel.hidden = panel.id !== panelId;

    if (!panel.hidden && showcaseShell) {
      showcaseShell.dataset.activeTheme = panel.dataset.theme || "generators";
    }
  });

  topTabs.forEach((tab) => {
    const active = tab.dataset.panel === panelId;
    tab.setAttribute("aria-selected", active ? "true" : "false");
    tab.tabIndex = active ? 0 : -1;

    if (active) {
      tab.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  });
}

function bindTabGroup(tabs, activate) {
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activate(tab);
    });

    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;

      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;

      tabs[nextIndex].focus();
      activate(tabs[nextIndex], true);
    });
  });
}

bindTabGroup(topTabs, (tab) => {
  revealPanel(tab.dataset.panel);
});

function wireSegmentGroup(rootId) {
  const root = document.getElementById(rootId);
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll(".segment-button"));
  const subpanels = buttons
    .map((button) => document.getElementById(button.getAttribute("aria-controls")))
    .filter(Boolean);

  function activateSegment(nextButton) {
    const panelId = nextButton.getAttribute("aria-controls");

    buttons.forEach((button) => {
      const active = button === nextButton;
      button.setAttribute("aria-selected", active ? "true" : "false");
      button.tabIndex = active ? 0 : -1;

      if (active) {
        button.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    });

    subpanels.forEach((panel) => {
      panel.hidden = panel.id !== panelId;
    });
  }

  bindTabGroup(buttons, activateSegment);

  if (buttons[0]) {
    activateSegment(buttons[0]);
  }
}

wireSegmentGroup("panel-generators");
wireSegmentGroup("panel-resources");
revealPanel("panel-generators");

const generatorCatalog = {
  math: {
    addition: {
      title: "Addition Organizer",
      url: "https://teachwithmrc.github.io/site%20previews/mobile-preview-safe/addition-graphic-organizer-preview-mobile-fit.html"
    },
    subtraction: {
      title: "Subtraction Organizer",
      url: "https://teachwithmrc.github.io/site%20previews/mobile-preview-safe/subtraction-graphic-organizer-preview-mobile-fit.html"
    },
    "partial-products": {
      title: "Partial Products",
      url: "https://teachwithmrc.github.io/site%20previews/mobile-preview-safe/partial-products-2x1-generator-preview-mobile-fit.html"
    },
    "long-division": {
      title: "Long Division",
      url: "https://teachwithmrc.github.io/site%20previews/mobile-preview-safe/long-division-colorcoded-generator-preview-mobile-fit.html"
    },
    "division-organizer": {
      title: "Division Organizer",
      url: "https://teachwithmrc.github.io/divisionorganizermobile.html"
    },
    manipulatives: {
      title: "Manipulatives Add/Subtract",
      url: "https://teachwithmrc.github.io/ladder/manipulatives-mobile-preview.html"
    }
  },
  reading: {
    "word-mapping": {
      title: "Word Mapping",
      url: "https://teachwithmrc.github.io/site%20previews/mobile-preview-safe/wordmapmaster-preview-mobile-fit.html"
    },
    "spelling-pictures": {
      title: "Spelling With Pictures",
      url: "https://teachwithmrc.github.io/ladder/spelling-mobile-generator.html"
    },
    "roll-and-read": {
      title: "Reading Roll and Read",
      url: "https://teachwithmrc.github.io/ladder/rollreadpreview31.html"
    },
    "spelling-pyramid": {
      title: "Spelling Pyramid",
      url: "https://teachwithmrc.github.io/ladder/pyramidpreview.html"
    },
    "reading-tic-tac-toe": {
      title: "Reading Tic Tac Toe",
      url: "https://teachwithmrc.github.io/ladder/tic-tac-preview-march1st.html"
    },
    "word-ladder": {
      title: "Word Ladder",
      url: "https://teachwithmrc.github.io/laddermobilepreview.html"
    }
  }
};

function wireGeneratorLab(subject) {
  const select = document.getElementById(`generator-select-${subject}`);
  const frame = document.getElementById(`generator-frame-${subject}`);
  const title = document.getElementById(`generator-embed-title-${subject}`);
  const openLink = document.getElementById(`generator-open-link-${subject}`);
  const button = document.querySelector(`[data-generator-subject="${subject}"]`);

  if (!select || !frame || !title || !openLink || !button) return;

  function applySelection() {
    const config = generatorCatalog[subject][select.value];
    if (!config) return;

    frame.src = config.url;
    title.textContent = config.title;
    openLink.href = config.url;
  }

  button.addEventListener("click", applySelection);
  select.addEventListener("change", () => {
    const config = generatorCatalog[subject][select.value];
    if (!config) return;
    title.textContent = config.title;
    openLink.href = config.url;
  });

  applySelection();
}

wireGeneratorLab("math");
wireGeneratorLab("reading");
