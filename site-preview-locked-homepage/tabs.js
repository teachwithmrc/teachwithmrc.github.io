const topTabs = Array.from(document.querySelectorAll(".tool-tab"));
const panels = Array.from(document.querySelectorAll(".main-panel"));
const showcaseShell = document.querySelector(".showcase-shell");
const jumpButtons = Array.from(document.querySelectorAll("[data-target-panel], [data-target-segment]"));

function revealPanel(panelId, options = {}) {
  let activeTab = null;

  panels.forEach((panel) => {
    const isActive = panel.id === panelId;
    panel.hidden = !isActive;

    if (isActive && showcaseShell) {
      showcaseShell.dataset.activeTheme = panel.dataset.theme || "generators";
    }
  });

  topTabs.forEach((tab) => {
    const isActive = tab.dataset.panel === panelId;
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
    tab.tabIndex = isActive ? 0 : -1;

    if (isActive) {
      activeTab = tab;
    }
  });

  if (options.focusTab && activeTab) {
    activeTab.focus();
  }
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

bindTabGroup(topTabs, (tab, focusTab = false) => {
  revealPanel(tab.dataset.panel, { focusTab });
});

function wireSegmentGroup(rootId) {
  const root = document.getElementById(rootId);
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll(".segment-button"));
  const subpanels = buttons
    .map((button) => document.getElementById(button.getAttribute("aria-controls")))
    .filter(Boolean);

  function activateSegment(nextButton, focusButton = false) {
    const panelId = nextButton.getAttribute("aria-controls");

    buttons.forEach((button) => {
      const isActive = button === nextButton;
      button.setAttribute("aria-selected", isActive ? "true" : "false");
      button.tabIndex = isActive ? 0 : -1;
    });

    subpanels.forEach((panel) => {
      panel.hidden = panel.id !== panelId;
    });

    if (focusButton) {
      nextButton.focus();
    }
  }

  bindTabGroup(buttons, (button, focusButton = false) => {
    activateSegment(button, focusButton);
  });

  if (buttons[0]) {
    activateSegment(buttons[0]);
  }
}

wireSegmentGroup("panel-generators");
wireSegmentGroup("panel-organizers");

jumpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const panelId = button.dataset.targetPanel;
    const segmentId = button.dataset.targetSegment;

    if (panelId) {
      revealPanel(panelId);
    }

    if (segmentId) {
      const segmentButton = document.getElementById(segmentId);
      if (segmentButton) {
        segmentButton.click();
      }
    }

    const scrollTarget = showcaseShell || document.getElementById(panelId || "");
    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

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
    "fluency-grid": {
      title: "Fluency Grid Generator",
      url: "../fluencygridpreview.html"
    },
    "word-mapping": {
      title: "Word Mapping Generator",
      url: "../wordmap2preview.html"
    },
    "word-ladder": {
      title: "Word Ladder Generator",
      url: "../wordladderpreview.html"
    },
    "roll-and-read": {
      title: "Roll and Read Generator",
      url: "../rollreadpreview.html"
    },
    "pyramid-spelling": {
      title: "Pyramid Spelling Generator",
      url: "../pyramid-spelling-generator-preview.html"
    },
    "spelling-with-pictures": {
      title: "Spelling With Pictures Generator",
      url: "../spelling-with-pictures-generator-preview.html"
    },
    "reading-tic-tac-toe": {
      title: "Reading Tic Tac Toe Generator",
      url: "../tictacpreview.html"
    }
  }
};

function wireGeneratorLab(subject) {
  const select = document.getElementById(`generator-select-${subject}`);
  const frame = document.getElementById(`generator-frame-${subject}`);
  const title = document.getElementById(`generator-embed-title-${subject}`);
  const openLink = document.getElementById(`generator-open-link-${subject}`);
  const quickPickButtons = Array.from(document.querySelectorAll(`.quick-pick-button[data-generator-subject="${subject}"]`));

  if (!select || !frame || !title || !openLink) return;

  function updateQuickPickState(activeKey) {
    quickPickButtons.forEach((button) => {
      const isActive = button.dataset.generatorKey === activeKey;
      button.dataset.active = isActive ? "true" : "false";
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function applySelection(nextKey) {
    const key = nextKey || select.value;
    const config = generatorCatalog[subject][key];
    if (!config) return;

    select.value = key;
    title.textContent = config.title;
    frame.src = config.url;
    frame.title = `${config.title} preview`;
    openLink.href = config.url;
    openLink.setAttribute("aria-label", `Open full preview for ${config.title}`);
    updateQuickPickState(key);
  }

  select.addEventListener("change", () => {
    applySelection(select.value);
  });

  quickPickButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextKey = button.dataset.generatorKey;
      if (!nextKey) return;

      applySelection(nextKey);
    });
  });

  applySelection(select.value);
}

wireGeneratorLab("math");
wireGeneratorLab("reading");
revealPanel("panel-generators");
