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

const tryNowJumpButtons = Array.from(document.querySelectorAll(".try-now-jump"));

tryNowJumpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.targetSegment;
    const targetButton = targetId ? document.getElementById(targetId) : null;
    if (!targetButton) return;

    targetButton.click();

    const subpanelId = targetButton.getAttribute("aria-controls");
    const launcher = subpanelId
      ? document.querySelector(`#${subpanelId} .generator-lab-controls`)
      : null;

    if (launcher) {
      requestAnimationFrame(() => {
        launcher.scrollIntoView({ behavior: "smooth", block: "start" });
      });
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
  const button = document.querySelector(`.generator-try-button[data-generator-subject="${subject}"]`);
  const featuredCards = Array.from(document.querySelectorAll(`.featured-launch-card[data-generator-subject="${subject}"]`));
  const cardPreviewButtons = Array.from(document.querySelectorAll(`.card-preview-button[data-generator-subject="${subject}"]`));
  const quickPickButtons = Array.from(document.querySelectorAll(`.quick-pick-button[data-generator-subject="${subject}"]`));

  if (!select || !frame || !title || !openLink || !button) return;

  function updateActiveState(control, active) {
    control.dataset.active = active ? "true" : "false";

    if (control.tagName === "BUTTON") {
      control.setAttribute("aria-pressed", active ? "true" : "false");
    }
  }

  function syncButtonState(activeKey) {
    [...featuredCards, ...cardPreviewButtons, ...quickPickButtons].forEach((control) => {
      const active = control.dataset.generatorKey === activeKey;
      updateActiveState(control, active);
    });
  }

  function syncSelection(loadFrame = false) {
    const config = generatorCatalog[subject][select.value];
    if (!config) return;

    title.textContent = config.title;
    openLink.href = config.url;
    syncButtonState(select.value);

    if (loadFrame) {
      frame.src = config.url;
      frame.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  button.addEventListener("click", () => {
    syncSelection(true);
  });

  select.addEventListener("change", () => {
    syncSelection(false);
  });

  quickPickButtons.forEach((quickPickButton) => {
    quickPickButton.addEventListener("click", () => {
      const nextKey = quickPickButton.dataset.generatorKey;
      if (!nextKey || !generatorCatalog[subject][nextKey]) return;

      select.value = nextKey;
      syncSelection(true);
    });
  });

  cardPreviewButtons.forEach((cardPreviewButton) => {
    cardPreviewButton.addEventListener("click", () => {
      const nextKey = cardPreviewButton.dataset.generatorKey;
      if (!nextKey || !generatorCatalog[subject][nextKey]) return;

      select.value = nextKey;
      syncSelection(true);
    });
  });

  featuredCards.forEach((featuredCard) => {
    featuredCard.addEventListener("click", (event) => {
      if (featuredCard.tagName !== "BUTTON" && event.target.closest("a, button")) return;

      const nextKey = featuredCard.dataset.generatorKey;
      if (!nextKey || !generatorCatalog[subject][nextKey]) return;

      select.value = nextKey;
      syncSelection(true);
    });
  });

  syncSelection(false);
}

wireGeneratorLab("math");
wireGeneratorLab("reading");
