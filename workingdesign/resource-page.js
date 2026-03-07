(function () {
  const titleEl = document.getElementById("resourceTitle");
  const kickerEl = document.getElementById("resourceKicker");
  const viewport = document.getElementById("resourceViewport");
  const frame = document.getElementById("resourceFrame");
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
        "html,body{margin:0!important;padding:0!important;overflow:visible!important;height:auto!important;min-height:0!important;}" +
        ".top-cta-wrap,.is-ticker,.is-nav,.is-side-stack,.is-mobile-quick-nav,.is-unified-join,.head,.subtitle,.promo-note,.controls-note,.is-page-hero{display:none!important;}" +
        ".wrap{max-width:none!important;margin:0!important;padding:0!important;}" +
        ".is-home-sections .is-layout{grid-template-columns:1fr!important;}" +
        ".is-main{min-width:0!important;width:100%!important;}" +
        ".is-page{border:0!important;padding:0!important;}" +
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
        width: Math.max(1360, html.clientWidth, html.scrollWidth, html.offsetWidth, body.scrollWidth, body.offsetWidth),
        height: Math.max(1200, html.clientHeight, html.scrollHeight, html.offsetHeight, body.clientHeight, body.scrollHeight, body.offsetHeight)
      };
    } catch (_error) {
      return null;
    }
  }

  function fitFrame() {
    const measured = measureFrame();
    const sourceWidth = measured ? measured.width : 1360;
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
