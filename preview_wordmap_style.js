(function () {
  const ENABLE_PREVIEW_CHROME = false;

  function cleanTitle(rawTitle) {
    if (!rawTitle) return "Generator Preview";
    return rawTitle
      .replace(/\s*-\s*PREVIEW MODE.*$/i, "")
      .replace(/\s*\(Generate Enabled\)\s*/gi, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function ensureStyle() {
    if (document.getElementById("wordmapPreviewChromeStyles")) return;

    const style = document.createElement("style");
    style.id = "wordmapPreviewChromeStyles";
    style.textContent = `
      .wordmap-preview-hero {
        margin: 0 0 12px;
        padding: 14px 16px;
        border: 2px solid #111;
        border-radius: 14px;
        background: #fff;
        text-align: center;
        box-shadow: 0 8px 18px rgba(16, 24, 40, 0.08);
      }

      .wordmap-preview-hero h1 {
        margin: 0 0 4px;
        font-size: clamp(1.5rem, 2.5vw, 2rem);
        line-height: 1.15;
        font-weight: 800;
        color: #1f365f;
      }

      .wordmap-preview-hero p {
        margin: 0;
        color: #4e5d74;
        font-size: 0.95rem;
        font-weight: 600;
      }

      .wordmap-how-card {
        margin: 0 0 12px;
        padding: 14px 16px;
        border: 2px solid #111;
        border-radius: 14px;
        background: #fff;
        box-shadow: 0 8px 18px rgba(16, 24, 40, 0.08);
      }

      .wordmap-how-card h2 {
        margin: 0 0 8px;
        font-size: 1rem;
        font-weight: 800;
        color: #1f365f;
      }

      .wordmap-how-list {
        margin: 0;
        padding-left: 18px;
        color: #2d3f59;
        font-size: 0.92rem;
        line-height: 1.5;
        font-weight: 600;
      }

      .wordmap-how-list li + li {
        margin-top: 4px;
      }
    `;

    document.head.appendChild(style);
  }

  function addWordMapChrome() {
    const page = document.querySelector("main.page");
    if (!page || page.dataset.wordmapChrome === "1") return;

    const titleText = cleanTitle(document.title);

    const hero = document.createElement("section");
    hero.className = "wordmap-preview-hero";
    const heroTitle = document.createElement("h1");
    heroTitle.textContent = titleText;
    const heroSubtitle = document.createElement("p");
    heroSubtitle.textContent = "Simple preview mode so you can quickly see what the generator does.";
    hero.appendChild(heroTitle);
    hero.appendChild(heroSubtitle);

    const how = document.createElement("section");
    how.className = "wordmap-how-card";
    const howHeading = document.createElement("h2");
    howHeading.textContent = "How It Works";
    const howList = document.createElement("ol");
    howList.className = "wordmap-how-list";

    const stepOne = document.createElement("li");
    stepOne.textContent = "Set options in the generator preview below.";
    const stepTwo = document.createElement("li");
    stepTwo.textContent = "Click Generate as often as you want.";
    const stepThree = document.createElement("li");
    stepThree.textContent = "Use the preview to see the worksheet output and flow.";

    howList.appendChild(stepOne);
    howList.appendChild(stepTwo);
    howList.appendChild(stepThree);
    how.appendChild(howHeading);
    how.appendChild(howList);

    page.prepend(how);
    page.prepend(hero);
    page.dataset.wordmapChrome = "1";
  }

  function init() {
    if (!ENABLE_PREVIEW_CHROME) return;
    if (!document.querySelector("main.page .preview-shell")) return;
    ensureStyle();
    addWordMapChrome();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
