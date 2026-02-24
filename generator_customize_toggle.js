(function () {
  const STYLE_ID = "isCustomizeToggleStyle";
  const APPLIED_ATTR = "data-is-customize-applied";

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

      .is-customize-collapsible.is-customize-collapsed > *:not(.is-customize-keep) {
        display: none !important;
      }

      .is-customize-collapsible.is-customize-collapsed .is-generate-row > :not(#btnGenerate):not(#generateBtn) {
        display: none !important;
      }

      .is-customize-collapsible.is-customize-collapsed .is-generate-row button:not(#btnGenerate):not(#generateBtn) {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function getDirectTitle(container) {
    return Array.from(container.children).find((el) =>
      el.matches(".section-label, .section-title, .layout-title, h2, h3")
    ) || null;
  }

  function getDirectStatus(container) {
    return Array.from(container.children).find((el) =>
      el.id === "status" || el.classList.contains("status") || el.classList.contains("small-meta")
    ) || null;
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

    const selectors = ["#controlsPanel", ".actions-sticky", ".table-section", ".panel", ".controls"];
    for (const selector of selectors) {
      const found = generateBtn.closest(selector);
      if (found) return found;
    }

    return null;
  }

  function markKeep(container, element) {
    if (!element) return;
    if (element.parentElement !== container) return;
    element.classList.add("is-customize-keep");
  }

  function applyToGenerateButton(generateBtn) {
    const container = pickContainer(generateBtn);
    if (!container) return false;
    if (container.getAttribute(APPLIED_ATTR) === "1") return true;

    const generateRow = findGenerateRow(generateBtn, container);
    if (!generateRow) return false;

    const title = getDirectTitle(container);
    const status = getDirectStatus(container);

    container.classList.add("is-customize-collapsible", "is-customize-collapsed");
    container.setAttribute(APPLIED_ATTR, "1");

    generateRow.classList.add("is-generate-row", "is-customize-keep");
    markKeep(container, title);
    markKeep(container, status);

    const toggleRow = document.createElement("div");
    toggleRow.className = "is-customize-toggle-row is-customize-keep";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "is-customize-toggle-btn";
    toggleBtn.textContent = "Customize";
    toggleBtn.setAttribute("aria-expanded", "false");

    toggleBtn.addEventListener("click", function () {
      const collapsed = container.classList.toggle("is-customize-collapsed");
      toggleBtn.textContent = collapsed ? "Customize" : "Hide Customize";
      toggleBtn.setAttribute("aria-expanded", String(!collapsed));
    });

    toggleRow.appendChild(toggleBtn);

    if (title && title.parentElement === container) {
      title.insertAdjacentElement("afterend", toggleRow);
    } else {
      container.insertBefore(toggleRow, generateRow);
    }

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
