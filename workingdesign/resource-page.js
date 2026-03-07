(function () {
  const titleEl = document.getElementById("resourceTitle");
  const kickerEl = document.getElementById("resourceKicker");
  const viewport = document.getElementById("resourceViewport");
  const frame = document.getElementById("resourceFrame");
  const shellHero = document.querySelector(".is-generator-browser-page > .is-page-hero");
  const shellPage = document.querySelector(".is-generator-browser-page");
  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
  const params = new URLSearchParams(window.location.search);
  const pageConfig = window.WORKING_RESOURCE_PAGE || {};
  const lane = params.get("lane") || pageConfig.lane || "";
  const title = params.get("title") || pageConfig.title || "Resource Page";
  const src = params.get("src") || pageConfig.src || "";

  function resolveSrc(path) {
    if (!path) {
      return "";
    }
    if (window.location.protocol === "file:") {
      return path;
    }
    return path.replace(/^\.\.\//, "/");
  }

  function applyEmbedCleanup(doc) {
    if (!doc || !doc.head) {
      return;
    }
    let style = doc.getElementById("workingdesign-resource-overrides");
    if (!style) {
      style = doc.createElement("style");
      style.id = "workingdesign-resource-overrides";
      style.textContent =
        "html,body{margin:0!important;padding:0!important;overflow:visible!important;height:auto!important;min-height:0!important;background:#fff!important;}" +
        ".top-cta-wrap,.is-ticker,.is-nav,.is-side-stack,.is-mobile-quick-nav,.is-unified-join,.head,.subtitle,.promo-note,.controls-note,.is-page-hero,.is-value-banner{display:none!important;}" +
        ".wrap,.is-wrap{max-width:none!important;width:100%!important;margin:0!important;padding:0!important;}" +
        ".is-home-sections{padding:0!important;background:#fff!important;}" +
        ".is-home-sections .is-layout{grid-template-columns:1fr!important;gap:0!important;}" +
        ".is-main{min-width:0!important;width:100%!important;margin:0!important;}" +
        ".is-page{border:0!important;border-radius:0!important;padding:0!important;background:#fff!important;box-shadow:none!important;}" +
        ".sheet-wrap,[class*='sheet-wrap'],.page-wrap,[class*='page-wrap'],.preview-shell{max-height:none!important;overflow:visible!important;height:auto!important;}";
      doc.head.appendChild(style);
    }
  }

  function measureFrame() {
    try {
      const doc = frame.contentDocument;
      if (!doc) {
        return null;
      }
      applyEmbedCleanup(doc);
      const html = doc.documentElement;
      const body = doc.body;
      if (!html || !body) {
        return null;
      }
      return {
        width: Math.max(html.clientWidth, html.scrollWidth, html.offsetWidth, body.scrollWidth, body.offsetWidth, 960),
        height: Math.max(html.clientHeight, html.scrollHeight, html.offsetHeight, body.clientHeight, body.scrollHeight, body.offsetHeight, 900)
      };
    } catch (_error) {
      return null;
    }
  }

  function fitFrame() {
    const measured = measureFrame();
    const sourceWidth = measured ? measured.width : Math.max(960, viewport.clientWidth);
    const sourceHeight = measured ? measured.height : 1200;
    const availableWidth = Math.max(320, viewport.clientWidth);
    const scale = Math.min(1, availableWidth / sourceWidth);
    const fittedHeight = Math.ceil(sourceHeight * scale);

    viewport.style.height = fittedHeight + "px";
    frame.style.width = sourceWidth + "px";
    frame.style.height = sourceHeight + "px";
    frame.style.transform = "scale(" + scale.toFixed(4) + ")";
    frame.style.transformOrigin = "top center";
    frame.style.margin = "0 auto";
  }

  function scheduleFit() {
    window.requestAnimationFrame(fitFrame);
    window.setTimeout(fitFrame, 160);
    window.setTimeout(fitFrame, 700);
    window.setTimeout(fitFrame, 1400);
  }

  navLinks.forEach(function (link) {
    const isCurrent = link.dataset.nav === lane;
    link.classList.toggle("is-current", isCurrent);
    link.classList.toggle("is-active", isCurrent);
  });

  if (kickerEl) {
    kickerEl.textContent = lane ? lane.replace(/-/g, " ") : "Collection Page";
  }
  if (titleEl) {
    titleEl.textContent = title;
  }
  document.title = "Intervention Station | " + title;

  if (shellHero) {
    shellHero.style.display = "none";
  }
  if (shellPage) {
    shellPage.style.padding = "0";
    shellPage.style.border = "0";
  }
  if (viewport) {
    viewport.style.background = "#fff";
  }

  if (src) {
    frame.src = resolveSrc(src);
  }

  frame.addEventListener("load", scheduleFit);
  window.addEventListener("resize", scheduleFit);

  if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(scheduleFit);
    resizeObserver.observe(viewport);
  }

  scheduleFit();
})();
