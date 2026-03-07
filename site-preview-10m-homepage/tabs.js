const state = {
  activePanel: "panel-generators"
};

const topTabs = Array.from(document.querySelectorAll(".tool-tab"));
const panels = Array.from(document.querySelectorAll(".library-panel"));

function activatePanel(panelId) {
  state.activePanel = panelId;

  panels.forEach((panel) => {
    panel.hidden = panel.id !== panelId;
  });

  topTabs.forEach((tab) => {
    const active = tab.dataset.panel === panelId;
    tab.setAttribute("aria-selected", active ? "true" : "false");
    tab.tabIndex = active ? 0 : -1;
  });
}

topTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    activatePanel(tab.dataset.panel);
  });

  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = topTabs.length - 1;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + topTabs.length) % topTabs.length;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % topTabs.length;

    topTabs[nextIndex].focus();
    activatePanel(topTabs[nextIndex].dataset.panel);
  });
});

function wireSegmentGroup(rootId) {
  const root = document.getElementById(rootId);
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll(".segment-button"));
  const subpanels = buttons
    .map((button) => document.getElementById(button.getAttribute("aria-controls")))
    .filter(Boolean);

  function activateSegment(nextButton, focusButton) {
    const panelId = nextButton.getAttribute("aria-controls");

    buttons.forEach((button) => {
      const active = button === nextButton;
      button.setAttribute("aria-selected", active ? "true" : "false");
      button.tabIndex = active ? 0 : -1;
    });

    subpanels.forEach((panel) => {
      panel.hidden = panel.id !== panelId;
    });

    if (focusButton) {
      nextButton.focus();
    }
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      activateSegment(button);
    });

    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = buttons.length - 1;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;

      activateSegment(buttons[nextIndex], true);
    });
  });

  if (buttons[0]) {
    activateSegment(buttons[0]);
  }
}

wireSegmentGroup("panel-generators");
wireSegmentGroup("panel-resources");
activatePanel(state.activePanel);
