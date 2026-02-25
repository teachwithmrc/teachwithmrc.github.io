(function () {
  const STYLE_ID = "isCustomizeToggleStyle";
  const APPLIED_ATTR = "data-is-customize-applied";
  const NODE_CLASS = "is-customize-node";
  const KEEP_CLASS = "is-customize-keep";

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .is-customize-toggle-row {
        display: flex;
        justify-content: center;
        margin: 8px 0;
      }

      .is-customize-toggle-btn {
        border: 2px solid #000;
        border-radius: 999px;
        background: #fff;
        color: #111;
        font: inherit;
        font-weight: 800;
        font-size: 0.9rem;
        padding: 7px 14px;
        cursor: pointer;
      }

      .is-customize-collapsible.is-customize-collapsed .${NODE_CLASS}:not(.${KEEP_CLASS}) {
        display: none !important;
      }

      .is-customize-collapsible.is-customize-collapsed ~ #floatingActions {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function findGenerateRow(generateBtn, container) {
    const preferred = [".actions", ".btn-row", ".toolbar", ".button-row", ".row", "div"];
    for (const selector of preferred) {
      const row = generateBtn.closest(selector);
      if (row && row !== container && row.parentElement === container) return row;
    }

    let node = generateBtn.parentElement;
    while (node && node !== container) {
      if (node.parentElement === container) return node;
      node = node.parentElement;
    }
    return null;
  }

  function pickContainer(generateBtn) {
    const builderPanel = generateBtn.closest("#builderPanel");
    if (builderPanel) {
      const controls = builderPanel.querySelector(".controls");
      if (controls) return controls;
    }

    const layout = generateBtn.closest(".layout");
    if (layout && layout.querySelector(".left") && layout.querySelector(".right")) {
      return layout;
    }

    const selectors = ["#controlsPanel", ".actions-sticky", ".table-section", ".panel", ".controls"];
    for (const selector of selectors) {
      const found = generateBtn.closest(selector);
      if (found) return found;
    }

    return null;
  }

  function markKeep(container, element) {
    if (!element) return;
    if (!container.contains(element)) return;
    element.classList.add(KEEP_CLASS);
  }

  function markKeepChain(container, element) {
    if (!element || !container.contains(element)) return;
    let node = element;
    while (node && node !== container) {
      node.classList.add(KEEP_CLASS);
      node = node.parentElement;
    }
  }

  function applyToGenerateButton(generateBtn) {
    const container = pickContainer(generateBtn);
    if (!container) return false;
    if (container.getAttribute(APPLIED_ATTR) === "1") return true;

    const generateRow = findGenerateRow(generateBtn, container);
    if (!generateRow) return false;

    container.classList.add("is-customize-collapsible", "is-customize-collapsed");
    container.setAttribute(APPLIED_ATTR, "1");
    container.querySelectorAll("*").forEach((element) => element.classList.add(NODE_CLASS));

    generateRow.classList.add("is-generate-row");
    markKeepChain(container, generateBtn);

    const toggleRow = document.createElement("div");
    toggleRow.className = `is-customize-toggle-row ${NODE_CLASS} ${KEEP_CLASS}`;

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = `is-customize-toggle-btn ${NODE_CLASS} ${KEEP_CLASS}`;
    toggleBtn.textContent = "Customize";
    toggleBtn.setAttribute("aria-expanded", "false");

    toggleBtn.addEventListener("click", function () {
      const collapsed = container.classList.toggle("is-customize-collapsed");
      toggleBtn.textContent = "Customize";
      toggleBtn.setAttribute("aria-expanded", String(!collapsed));
    });

    toggleRow.appendChild(toggleBtn);
    const toggleHost = generateBtn.parentElement;
    if (toggleHost && container.contains(toggleHost)) {
      toggleHost.insertBefore(toggleRow, generateBtn);
    } else {
      container.insertBefore(toggleRow, generateRow);
    }
    markKeep(container, toggleRow);
    markKeep(container, toggleBtn);

    return true;
  }

  function initCustomizeToggle() {
    injectStyle();
    const generateButtons = Array.from(document.querySelectorAll("#btnGenerate, #generateBtn"));
    generateButtons.forEach((button) => applyToGenerateButton(button));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      window.setTimeout(initCustomizeToggle, 0);
    });
  } else {
    window.setTimeout(initCustomizeToggle, 0);
  }
})();
