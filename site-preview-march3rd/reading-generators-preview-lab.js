(function () {
  const config = window.READING_FIT_CONFIG || {};
  const items = [
    {
      id: "fluency-grid",
      title: "Fluency Grid",
      previewUrl: "./desktop-previews/reading/fluencygridpreview-desktop.html"
    },
    {
      id: "word-ladder",
      title: "Word Ladder",
      previewUrl: "./desktop-previews/reading/laddermobilepreview-desktop.html"
    },
    {
      id: "pyramid-spelling",
      title: "Pyramid Spelling",
      previewUrl: "./desktop-previews/reading/pyramidpreview-desktop.html"
    },
    {
      id: "roll-and-read",
      title: "Roll and Read",
      previewUrl: "./desktop-previews/reading/rollread-desktop.html"
    },
    {
      id: "spelling-pictures",
      title: "Spelling with Pictures",
      previewUrl: "./desktop-previews/reading/spellingpicture-desktop.html"
    },
    {
      id: "sor-tic-tac-toe",
      title: "SOR Tic Tac Toe",
      previewUrl: "./desktop-previews/reading/tic-tac-preview-march1st-desktop.html"
    },
    {
      id: "word-mapping",
      title: "Word Mapping",
      previewUrl: "./desktop-previews/reading/wordmapmaster-preview-desktop.html"
    }
  ];
  const titleEl = document.getElementById("pageTitle");
  const pickerEl = document.getElementById("generatorPicker");
  const viewport = document.getElementById("previewViewport");
  const frame = document.getElementById("previewFrame");

  if (!pickerEl || !viewport || !frame) {
    return;
  }

  if (config.pageTitle) {
    document.title = config.pageTitle;
  }

  let currentId = config.initialId || "fluency-grid";

  function currentItem() {
    return items.find(function (item) {
      return item.id === currentId;
    }) || items[0];
  }

  function updateTitle() {
    const item = currentItem();
    const headerText = "Reading Generators - " + item.title;
    if (titleEl) {
      titleEl.textContent = headerText;
    }
    frame.title = headerText;
  }

  function renderPicker() {
    pickerEl.innerHTML = "";
    items.forEach(function (item) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "reading-fit-option";
      if (item.id === currentId) {
        button.classList.add("is-active");
      }
      button.textContent = item.title;
      button.addEventListener("click", function () {
        if (item.id === currentId) {
          return;
        }
        currentId = item.id;
        renderPicker();
        loadCurrentItem();
      });
      pickerEl.appendChild(button);
    });
  }

  function loadCurrentItem() {
    const item = currentItem();
    updateTitle();
    frame.src = item.previewUrl;
  }

  function applyEmbedCleanup(doc) {
    if (!doc || !doc.head) {
      return;
    }

    let style = doc.getElementById("reading-fit-host-overrides");
    if (!style) {
      style = doc.createElement("style");
      style.id = "reading-fit-host-overrides";
      style.textContent =
        "html,body{margin:0!important;padding:0!important;overflow:visible!important;height:auto!important;min-height:0!important;}" +
        ".wrap{max-width:none!important;margin:0!important;padding:0!important;}" +
        ".head,.promo-note,.controls-note,.subtitle{display:none!important;}" +
        ".status:empty{display:none!important;}" +
        ".sheet-wrap,[class*='sheet-wrap'],.page-wrap,[class*='page-wrap']{max-height:none!important;overflow:visible!important;height:auto!important;}" +
        ".controls{margin-top:0!important;}" +
        ".preview-overlay{display:none!important;}";
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
        width: Math.max(
          config.desktopWidth || 1360,
          html.clientWidth,
          html.scrollWidth,
          html.offsetWidth,
          body.scrollWidth,
          body.offsetWidth
        ),
        height: Math.max(
          config.fallbackHeight || 1200,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight,
          body.clientHeight,
          body.scrollHeight,
          body.offsetHeight
        )
      };
    } catch (_error) {
      return null;
    }
  }

  function fitFrame() {
    const measured = measureFrame();
    const sourceWidth = measured ? measured.width : (config.desktopWidth || 1360);
    const sourceHeight = measured ? measured.height : (config.fallbackHeight || 1200);
    const availableWidth = Math.max(320, viewport.clientWidth);
    const scalePadding = typeof config.scalePadding === "number" ? config.scalePadding : 1;
    const scale = Math.min(1, availableWidth / sourceWidth) * scalePadding;
    const fittedWidth = Math.ceil(sourceWidth * scale);
    const fittedHeight = Math.ceil(sourceHeight * scale);

    viewport.style.height = fittedHeight + "px";
    frame.style.width = sourceWidth + "px";
    frame.style.height = sourceHeight + "px";
    frame.style.transform = "scale(" + scale.toFixed(4) + ")";
    frame.style.transformOrigin = "top left";
    frame.style.margin = "0";
    viewport.style.maxWidth = fittedWidth + "px";
  }

  function scheduleFit() {
    window.requestAnimationFrame(fitFrame);
    window.setTimeout(fitFrame, 160);
    window.setTimeout(fitFrame, 700);
    window.setTimeout(fitFrame, 1400);
  }

  frame.addEventListener("load", function () {
    scheduleFit();

    try {
      const doc = frame.contentDocument;
      if (!doc || !doc.body || !window.MutationObserver) {
        return;
      }

      const observer = new MutationObserver(scheduleFit);
      observer.observe(doc.body, {
        childList: true,
        subtree: true,
        attributes: true
      });
    } catch (_error) {
    }
  });

  window.addEventListener("resize", scheduleFit);

  if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(scheduleFit);
    resizeObserver.observe(viewport);
  }

  renderPicker();
  loadCurrentItem();
  scheduleFit();
})();
