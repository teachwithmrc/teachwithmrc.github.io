(function () {
  const FRAME_BOUND_ATTR = "data-is-customize-frame-bound";
  const DOC_WIRED_ATTR = "data-is-customize-doc-wired";
  const TOGGLE_SCRIPT = "generator_customize_toggle.js?v=20260224-preview-only";

  function wireFrameDocument(frame) {
    try {
      const frameDoc = frame.contentDocument || (frame.contentWindow && frame.contentWindow.document);
      if (!frameDoc || !frameDoc.documentElement || !frameDoc.head) return;
      if (frameDoc.documentElement.getAttribute(DOC_WIRED_ATTR) === "1") return;

      const existing = frameDoc.querySelector('script[src*="generator_customize_toggle.js"]');
      if (!existing) {
        const script = frameDoc.createElement("script");
        script.src = TOGGLE_SCRIPT;
        script.defer = true;
        frameDoc.head.appendChild(script);
      }

      frameDoc.documentElement.setAttribute(DOC_WIRED_ATTR, "1");
    } catch (_) {
      // Ignore cross-origin or transient iframe access errors.
    }
  }

  function bindFrame(frame) {
    if (!frame || frame.getAttribute(FRAME_BOUND_ATTR) === "1") return;
    frame.setAttribute(FRAME_BOUND_ATTR, "1");

    frame.addEventListener("load", function () {
      wireFrameDocument(frame);
    });

    wireFrameDocument(frame);
  }

  function init() {
    document.querySelectorAll("iframe").forEach(bindFrame);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
