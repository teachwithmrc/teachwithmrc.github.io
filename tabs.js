const laneTabs = Array.from(document.querySelectorAll(".lane-button"));
const stagePanels = Array.from(document.querySelectorAll(".stage-panel"));
const stageContent = document.querySelector(".stage-content");
const jumpButtons = Array.from(document.querySelectorAll("[data-target-panel]"));

function activatePanel(panelId, options = {}) {
  let activeTab = null;

  stagePanels.forEach((panel) => {
    const isActive = panel.id === panelId;
    panel.hidden = !isActive;

    if (isActive && stageContent) {
      stageContent.dataset.activeTheme = panel.dataset.theme || "generators";
    }
  });

  laneTabs.forEach((tab) => {
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

function bindArrowTabs(tabs, activate) {
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activate(tab);
    });

    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;

      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabs.length;

      tabs[nextIndex].focus();
      activate(tabs[nextIndex], true);
    });
  });
}

bindArrowTabs(laneTabs, (tab, focusTab = false) => {
  activatePanel(tab.dataset.panel, { focusTab });
});

jumpButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const panelId = button.dataset.targetPanel;
    const href = button.getAttribute("href");

    if (!panelId) return;

    if (href && href.startsWith("#")) {
      event.preventDefault();
    }

    activatePanel(panelId);

    const scrollTarget = document.getElementById("homepage-stage");
    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const generatorCatalog = {
  math: {
    "long-division-scaffold": {
      title: "Long Division Scaffold",
      tag: "Division Support",
      description: "Preview scaffolded long division pages with built-in structure.",
      url: "mobile/generators/long-division-scaffold.html"
    },
    "partial-products": {
      title: "Partial Products",
      tag: "Multiplication Support",
      description: "Build partial products practice with a clean visual scaffold.",
      url: "mobile/generators/partial-products.html"
    },
    "coin-counter": {
      title: "Coin Counter",
      tag: "Money Practice",
      description: "Create coin-counting practice with a visual money routine.",
      url: "mobile/generators/coin-counter.html"
    },
    "math-roll-and-read": {
      title: "Math Roll and Read",
      tag: "Math Fluency",
      description: "Open a quick math review format that feels easy to use right away.",
      url: "mobile/generators/math-roll-and-read.html"
    },
    "long-division": {
      title: "Long Division",
      tag: "Division Support",
      description: "Preview a guided long division generator with step-by-step support.",
      url: "mobile/generators/long-division.html"
    }
  },
  reading: {
    "fluency-grid": {
      title: "Fluency Grid Generator",
      tag: "Reading Fluency",
      description: "Create fresh fluency pages for centers, intervention, and take-home review.",
      url: "mobile/generators/fluency-grid.html"
    },
    "word-mapping": {
      title: "Word Mapping Generator",
      tag: "Phonics Routine",
      description: "Build mapping pages that match the sound-spelling focus you are teaching.",
      url: "mobile/generators/word-mapping.html"
    },
    "roll-and-read": {
      title: "Roll and Read Generator",
      tag: "Fluency Game",
      description: "Open a classroom-ready practice format for centers and partner review.",
      url: "mobile/generators/roll-and-read.html"
    },
    "pyramid-spelling": {
      title: "Pyramid Spelling Generator",
      tag: "Spelling Practice",
      description: "Use a familiar repeated-practice routine that feels simple and fast to explain.",
      url: "mobile/generators/pyramid-spelling.html"
    }
  }
};

function wireGeneratorSubjectTabs() {
  const buttons = Array.from(document.querySelectorAll(".subject-button"));
  const panels = Array.from(document.querySelectorAll(".generator-subpanel"));

  function showPanel(button, focusButton = false) {
    const nextId = button.getAttribute("aria-controls");

    buttons.forEach((item) => {
      const isActive = item === button;
      item.setAttribute("aria-selected", isActive ? "true" : "false");
      item.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== nextId;
    });

    if (focusButton) {
      button.focus();
    }
  }

  bindArrowTabs(buttons, (button, focusButton = false) => {
    showPanel(button, focusButton);
  });

  if (buttons[0]) {
    showPanel(buttons[0]);
  }
}

function wireGeneratorLab(subject) {
  const select = document.getElementById(`generator-select-${subject}`);
  const frame = document.getElementById(`generator-frame-${subject}`);
  const title = document.getElementById(`generator-embed-title-${subject}`);
  const openLink = document.getElementById(`generator-open-link-${subject}`);
  const quickPickButtons = Array.from(document.querySelectorAll(`.quick-pick-button[data-generator-subject="${subject}"]`));
  const tag = document.getElementById(`generator-tag-${subject}`);
  const focusTitle = document.getElementById(`generator-title-${subject}`);
  const summary = document.getElementById(`generator-summary-${subject}`);

  if (!select || !frame || !title || !openLink || !tag || !focusTitle || !summary) return;

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
    tag.textContent = config.tag;
    focusTitle.textContent = config.title;
    summary.textContent = config.description;
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

wireGeneratorSubjectTabs();
wireGeneratorLab("math");
wireGeneratorLab("reading");
activatePanel("panel-generators");
