(function () {
  const GENERATORS = {
    reading: {
      "fluency-grid": {
        title: "Fluency Grid",
        badge: "Reading",
        copy: "Create fresh fluency pages for centers, intervention, and take-home review.",
        url: "https://teachwithmrc.github.io/mobile/generators/fluency-grid.html"
      },
      "word-mapping": {
        title: "Word Mapping",
        badge: "Reading",
        copy: "Build mapping pages that match the sound-spelling focus you are teaching.",
        url: "https://teachwithmrc.github.io/mobile/generators/word-mapping.html"
      },
      "roll-and-read": {
        title: "Roll and Read",
        badge: "Reading",
        copy: "Open a classroom-ready practice format for centers and partner review.",
        url: "https://teachwithmrc.github.io/mobile/generators/roll-and-read.html"
      },
      "pyramid-spelling": {
        title: "Pyramid Spelling",
        badge: "Reading",
        copy: "Use a familiar repeated-practice routine that feels simple and fast to explain.",
        url: "https://teachwithmrc.github.io/mobile/generators/pyramid-spelling.html"
      }
    },
    math: {
      "long-division-scaffold": {
        title: "Long Division Scaffold",
        badge: "Math",
        copy: "Preview scaffolded long division pages with built-in structure.",
        url: "https://teachwithmrc.github.io/mobile/generators/long-division-scaffold.html"
      },
      "partial-products": {
        title: "Partial Products",
        badge: "Math",
        copy: "Generate partial-products practice with a clear visual setup.",
        url: "https://teachwithmrc.github.io/mobile/generators/partial-products.html"
      },
      "coin-counter": {
        title: "Coin Counter",
        badge: "Math",
        copy: "Build money-counting practice with a fast printable format.",
        url: "https://teachwithmrc.github.io/mobile/generators/coin-counter.html"
      },
      "math-roll-and-read": {
        title: "Math Roll and Read",
        badge: "Math",
        copy: "Use a game-like format for repeated math practice.",
        url: "https://teachwithmrc.github.io/mobile/generators/math-roll-and-read.html"
      },
      "long-division": {
        title: "Long Division",
        badge: "Math",
        copy: "Preview standard long division practice pages.",
        url: "https://teachwithmrc.github.io/mobile/generators/long-division.html"
      }
    }
  };

  function measureHeight() {
    const root = document.querySelector(".desktop-generator-browser-page");
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
          height: Math.max(320, height)
        },
        "*"
      );
    }
  }

  function init() {
    const root = document.querySelector(".desktop-generator-browser-page");
    if (!root) return;

    const subjectButtons = Array.from(root.querySelectorAll(".de-subject"));
    const subjectPanels = Array.from(root.querySelectorAll(".de-group"));
    const generatorButtons = Array.from(root.querySelectorAll(".de-pill"));
    const previewFrame = root.querySelector("#desktopGeneratorFrame");
    const previewTitle = root.querySelector("#desktopPreviewTitle");
    const previewCategory = root.querySelector("#desktopPreviewCategory");
    const previewCopy = root.querySelector("#desktopPreviewCopy");
    const previewOpen = root.querySelector("#desktopGeneratorOpen");

    if (!previewFrame || !previewTitle || !previewCategory || !previewCopy || !previewOpen) {
      return;
    }

    function setSubject(subject) {
      subjectButtons.forEach(function (button) {
        button.classList.toggle("is-active", button.dataset.subject === subject);
      });

      subjectPanels.forEach(function (panel) {
        panel.classList.toggle("is-active", panel.dataset.subjectPanel === subject);
      });

      generatorButtons.forEach(function (button) {
        button.classList.remove("is-active");
      });

      previewCategory.textContent = "Choose One";
      previewTitle.textContent = "Tap a generator to load the preview";
      previewCopy.textContent = "Choose a reading or math generator to load the live preview.";
      previewFrame.removeAttribute("src");
      previewOpen.href = "https://teachwithmrc.github.io/mobile/generator-browser-mobile.html";
      reportHeight();
    }

    function loadGenerator(subject, key, buttonEl) {
      const item = GENERATORS[subject] && GENERATORS[subject][key];
      if (!item) {
        return;
      }

      generatorButtons.forEach(function (button) {
        button.classList.toggle("is-active", button === buttonEl);
      });

      previewCategory.textContent = item.badge;
      previewTitle.textContent = item.title;
      previewCopy.textContent = item.copy;
      previewFrame.src = item.url;
      previewOpen.href = item.url;
      reportHeight();
    }

    subjectButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setSubject(button.dataset.subject);
      });
    });

    generatorButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        loadGenerator(button.dataset.generatorSubject, button.dataset.generatorKey, button);
      });
    });

    window.addEventListener("load", reportHeight);
    window.addEventListener("resize", reportHeight);

    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(reportHeight);
      resizeObserver.observe(root);
    }

    setSubject("reading");
    reportHeight();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
