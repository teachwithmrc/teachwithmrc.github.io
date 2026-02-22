// Shared image fallback helper for ladder pages.
// If an image is missing, it swaps in a small SVG placeholder with the word text.
(function () {
  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildSvg(word) {
    const label = escapeHtml((word || "?").toUpperCase());
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 110 110">' +
      '<rect width="110" height="110" rx="12" ry="12" fill="#f6f9ff" stroke="#cfd7ef" stroke-width="2"/>' +
      '<text x="55" y="54" text-anchor="middle" font-family="Poppins,Arial,sans-serif" font-size="12" fill="#1f365f">NO IMAGE</text>' +
      '<text x="55" y="72" text-anchor="middle" font-family="Poppins,Arial,sans-serif" font-size="13" fill="#1f365f">' +
      label +
      "</text>" +
      "</svg>"
    );
  }

  function toDataUri(svg) {
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  function getFallback(word) {
    return toDataUri(buildSvg(word));
  }

  function ensureSrc(src, word) {
    return src && String(src).trim() ? src : getFallback(word);
  }

  function handleError(imgEl, word) {
    if (!imgEl) return;
    imgEl.onerror = null;
    imgEl.src = getFallback(word);
  }

  window.ladderImageFallback = {
    ensureSrc,
    handleError,
    getFallback
  };
})();
