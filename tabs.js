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
  button.addEventListener("click", (event) => {
    const panelId = button.dataset.targetPanel;
    const segmentId = button.dataset.targetSegment;
    const href = button.getAttribute("href");

    if ((panelId || segmentId) && href && href.startsWith("#")) {
      event.preventDefault();
    }

    if (panelId) {
      revealPanel(panelId);
    }

    if (segmentId) {
      const segmentButton = document.getElementById(segmentId);
      if (segmentButton) {
        segmentButton.click();
      }
    }

    if (panelId || segmentId) {
      const scrollTarget = document.getElementById("membership-tabs") || showcaseShell || document.getElementById(panelId || "");
      if (scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

const generatorCatalog = {
  math: {
    addition: {
      title: "Addition Organizer",
      tag: "Printable Organizer",
      description: "Build clean addition organizers for reteach, intervention, and extra practice without starting from scratch.",
      url: "site-preview-march3rd/mobile-preview-safe/addition-graphic-organizer-preview-mobile-fit.html"
    },
    subtraction: {
      title: "Subtraction Organizer",
      tag: "Printable Organizer",
      description: "Create subtraction practice with the same structured look teachers already use in small groups.",
      url: "site-preview-march3rd/mobile-preview-safe/subtraction-graphic-organizer-preview-mobile-fit.html"
    },
    "partial-products": {
      title: "Partial Products",
      tag: "Multiplication Support",
      description: "Show a stronger multiplication strategy with an organizer that feels more advanced than a basic fact page.",
      url: "site-preview-march3rd/mobile-preview-safe/partial-products-2x1-generator-preview-mobile-fit.html"
    },
    "long-division": {
      title: "Long Division",
      tag: "Division Support",
      description: "Use a color-coded long division preview to show exactly how scaffolded the math side of the membership can be.",
      url: "site-preview-march3rd/mobile-preview-safe/long-division-colorcoded-generator-preview-mobile-fit.html"
    },
    "division-organizer": {
      title: "Division Organizer",
      tag: "Guided Practice",
      description: "Open a structured division organizer that slows the work down for students who need more support.",
      url: "divisionorganizermobile.html"
    },
    manipulatives: {
      title: "Manipulatives Add/Subtract",
      tag: "Concept Builder",
      description: "Preview manipulatives-based add and subtract practice for students who need more visual support.",
      url: "site-preview-march3rd/mobile-preview-safe/manipulatives-add-sub-generator-preview-mobile-fit.html"
    }
  },
  reading: {
    "fluency-grid": {
      title: "Fluency Grid Generator",
      tag: "Reading Fluency",
      description: "Create fresh fluency pages that match the skill you are teaching and feel ready for centers, small groups, or take-home review.",
      url: "site-preview-march3rd/fluencygridpreview.html"
    },
    "word-mapping": {
      title: "Word Mapping Generator",
      tag: "Phonics Routine",
      description: "Build mapping pages that match the sound-spelling focus you are actually teaching.",
      url: "site-preview-march3rd/word-map-preview.html"
    },
    "word-ladder": {
      title: "Word Ladder Generator",
      tag: "Word Work",
      description: "Generate ladders that help students track sound changes and transfer phonics patterns.",
      url: "site-preview-march3rd/wordladderpreview.html"
    },
    "roll-and-read": {
      title: "Roll and Read Generator",
      tag: "Fluency Game",
      description: "Open a classroom-ready practice format that works for centers, intervention, or quick partner review.",
      url: "site-preview-march3rd/rollreadpreview.html"
    },
    "pyramid-spelling": {
      title: "Pyramid Spelling Generator",
      tag: "Spelling Practice",
      description: "Use a familiar repeated-practice routine that feels simple, visual, and fast to explain.",
      url: "site-preview-march3rd/pyramid-spelling-generator-preview.html"
    },
    "spelling-with-pictures": {
      title: "Spelling With Pictures Generator",
      tag: "Visual Support",
      description: "Show a more visual entry point for spelling practice and phonics review.",
      url: "site-preview-march3rd/spelling-with-pictures-generator-preview.html"
    },
    "reading-tic-tac-toe": {
      title: "Reading Tic Tac Toe Generator",
      tag: "Interactive Review",
      description: "Preview a review format that feels more playful while still staying aligned to reading practice.",
      url: "site-preview-march3rd/tictacpreview.html"
    }
  }
};

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

function wirePreviewSlider() {
  const track = document.getElementById("previewSliderTrack");
  if (!track) return;

  const slider = track.closest(".preview-slider");
  if (!slider) return;

  const prevButton = slider.querySelector(".preview-slider-prev");
  const nextButton = slider.querySelector(".preview-slider-next");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function slideStep() {
    const firstSlide = track.querySelector(".preview-slide");
    if (!firstSlide) return track.clientWidth;
    return firstSlide.getBoundingClientRect().width;
  }

  function go(direction) {
    track.scrollBy({ left: direction * slideStep(), behavior: "smooth" });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => go(-1));
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => go(1));
  }

  if (reducedMotion.matches) return;

  let timer = null;

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function start() {
    stop();
    timer = window.setInterval(() => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const atEnd = track.scrollLeft >= maxScroll - 4;

      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        go(1);
      }
    }, 4200);
  }

  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);
  slider.addEventListener("touchstart", stop, { passive: true });
  slider.addEventListener("touchend", start, { passive: true });

  start();
}

wireGeneratorLab("math");
wireGeneratorLab("reading");
wirePreviewSlider();
revealPanel("panel-generators");
