(function () {
  const GENERATORS = {
    "fluency-grid": {
      title: "Fluency Grid",
      badge: "Reading",
      category: "reading",
      src: "https://teachwithmrc.github.io/mobile/generators/fluency-grid.html",
      width: 488,
      height: 1180
    },
    "word-mapping": {
      title: "Word Mapping",
      badge: "Reading",
      category: "reading",
      src: "https://teachwithmrc.github.io/mobile/generators/word-mapping.html",
      width: 488,
      height: 1240
    },
    "roll-and-read": {
      title: "Roll and Read",
      badge: "Reading",
      category: "reading",
      src: "https://teachwithmrc.github.io/mobile/generators/roll-and-read.html",
      width: 488,
      height: 1260
    },
    "pyramid-spelling": {
      title: "Pyramid Spelling",
      badge: "Reading",
      category: "reading",
      src: "https://teachwithmrc.github.io/mobile/generators/pyramid-spelling.html",
      width: 488,
      height: 1340
    },
    "long-division-scaffold": {
      title: "Long Division Scaffold",
      badge: "Math",
      category: "math",
      src: "https://teachwithmrc.github.io/mobile/generators/long-division-scaffold.html",
      width: 1160,
      height: 1540
    },
    "partial-products": {
      title: "Partial Products",
      badge: "Math",
      category: "math",
      src: "https://teachwithmrc.github.io/mobile/generators/partial-products.html",
      width: 460,
      height: 1320
    },
    "coin-counter": {
      title: "Coin Counter",
      badge: "Math",
      category: "math",
      src: "https://teachwithmrc.github.io/mobile/generators/coin-counter.html",
      width: 460,
      height: 1180
    },
    "math-roll-and-read": {
      title: "Math Roll and Read",
      badge: "Math",
      category: "math",
      src: "https://teachwithmrc.github.io/mobile/generators/math-roll-and-read.html",
      width: 460,
      height: 1260
    },
    "long-division": {
      title: "Long Division",
      badge: "Math",
      category: "math",
      src: "https://teachwithmrc.github.io/mobile/generators/long-division.html",
      width: 480,
      height: 1280
    }
  };

  function measureHeight() {
    const root = document.querySelector(".mobile-generator-browser");
    if (root) {
      return Math.ceil(root.getBoundingClientRect().height);
    }

    return Math.ceil(
      Math.max(
        document.documentElement.scrollHeight,
        document.body ? document.body.scrollHeight : 0
      )
    );
  }

  function reportHeight() {
    const height = measureHeight();

    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        {
          type: "intervention-embed-height",
          height: Math.max(260, height)
        },
        "*"
      );
    }
  }

  function initBrowser(root) {
    const categoryButtons = Array.from(root.querySelectorAll(".me-category"));
    const categoryPanels = Array.from(root.querySelectorAll(".me-picker-group"));
    const pillButtons = Array.from(root.querySelectorAll(".me-pill"));
    const previewFrame = root.querySelector("#previewFrame");
    const previewEmpty = root.querySelector("#previewEmpty");
    const previewTitle = root.querySelector("#previewTitle");
    const previewCategory = root.querySelector("#previewCategory");
    const previewViewport = root.querySelector("#previewViewport");

    if (
      !categoryButtons.length ||
      !categoryPanels.length ||
      !pillButtons.length ||
      !previewFrame ||
      !previewEmpty ||
      !previewTitle ||
      !previewCategory ||
      !previewViewport
    ) {
      return;
    }

    let activeCategory = "reading";
    let activeKey = null;

    function measurePreviewDocument(item) {
      try {
        const doc = previewFrame.contentDocument;
        if (!doc || !doc.documentElement || !doc.body) {
          return item;
        }

        const html = doc.documentElement;
        const body = doc.body;

        return {
          width: Math.max(
            item.width,
            html.scrollWidth,
            html.offsetWidth,
            body.scrollWidth,
            body.offsetWidth
          ),
          height: Math.max(
            item.height,
            html.scrollHeight,
            html.offsetHeight,
            body.scrollHeight,
            body.offsetHeight
          )
        };
      } catch (_error) {
        return item;
      }
    }

    function scalePreview() {
      if (!activeKey) {
        previewViewport.style.height = "";
        reportHeight();
        return;
      }

      const item = GENERATORS[activeKey];
      if (!item || previewFrame.style.display === "none") {
        reportHeight();
        return;
      }

      const measured = measurePreviewDocument(item);
      const availableWidth = previewViewport.clientWidth || measured.width;
      const scale = Math.min(1, availableWidth / measured.width);
      const scaledHeight = measured.height * scale;

      previewFrame.style.width = measured.width + "px";
      previewFrame.style.height = measured.height + "px";
      previewFrame.style.transform = "scale(" + scale + ")";
      previewFrame.style.transformOrigin = "top left";
      previewViewport.style.height = Math.ceil(scaledHeight) + "px";
      reportHeight();
    }

    function scheduleScalePreview() {
      window.requestAnimationFrame(scalePreview);
      window.setTimeout(scalePreview, 120);
      window.setTimeout(scalePreview, 400);
      window.setTimeout(scalePreview, 900);
    }

    function resetPreview() {
      activeKey = null;
      pillButtons.forEach(function (button) {
        button.classList.remove("is-active");
      });
      previewCategory.textContent = "Choose One";
      previewTitle.textContent = "Tap a generator to load the preview";
      previewEmpty.style.display = "grid";
      previewFrame.style.display = "none";
      previewFrame.removeAttribute("src");
      previewViewport.style.height = "";
      reportHeight();
    }

    function showCategory(category) {
      activeCategory = category;

      categoryButtons.forEach(function (button) {
        button.classList.toggle("is-active", button.dataset.category === category);
      });

      categoryPanels.forEach(function (panel) {
        panel.classList.toggle("is-active", panel.dataset.categoryPanel === category);
      });

      resetPreview();
    }

    function loadPreview(key, buttonEl) {
      const item = GENERATORS[key];
      if (!item || item.category !== activeCategory) {
        return;
      }

      activeKey = key;

      pillButtons.forEach(function (button) {
        button.classList.toggle("is-active", button === buttonEl);
      });

      previewCategory.textContent = item.badge;
      previewTitle.textContent = item.title;
      previewFrame.title = "Intervention Station Generator Preview - " + item.title;
      previewEmpty.style.display = "none";
      previewFrame.style.display = "block";
      previewFrame.onload = scheduleScalePreview;
      previewFrame.src = item.src;

      scheduleScalePreview();
    }

    categoryButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        showCategory(button.dataset.category);
      });
    });

    pillButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        loadPreview(button.dataset.item, button);
      });
    });

    window.addEventListener("resize", scalePreview);
    window.addEventListener("load", reportHeight);

    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(scalePreview);
      resizeObserver.observe(root);
    }

    showCategory(activeCategory);
  }

  function init() {
    document.querySelectorAll(".mobile-generator-browser").forEach(initBrowser);
    reportHeight();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
