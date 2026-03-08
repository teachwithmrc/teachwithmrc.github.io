(function () {
  const CATEGORIES = [
    {
      id: "math-generators",
      label: "Math Generators",
      items: [
        { id: "rounding", title: "Rounding", group: "Place Value / Coins", previewLocalPath: "../desktop-previews/math/rounding-generator-preview-desktop.html", previewWebPath: "/desktop-previews/math/rounding-generator-preview-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "addition", title: "Addition Generator", group: "Operations", previewLocalPath: "../desktop-previews/math/addition-graphic-organizer-preview-desktop.html", previewWebPath: "/desktop-previews/math/addition-graphic-organizer-preview-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "subtraction", title: "Subtraction Generator", group: "Operations", previewLocalPath: "../desktop-previews/math/subtraction-graphic-organizer-preview-desktop.html", previewWebPath: "/desktop-previews/math/subtraction-graphic-organizer-preview-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "multiplication", title: "Multiplication Generator", group: "Operations", previewLocalPath: "../desktop-previews/math/multiplication-graphic-organizer-preview-desktop.html", previewWebPath: "/desktop-previews/math/multiplication-graphic-organizer-preview-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "partial-products", title: "Partial Products", group: "Operations", previewLocalPath: "../desktop-previews/math/partial-products-2x1-generator-preview-desktop.html", previewWebPath: "/desktop-previews/math/partial-products-2x1-generator-preview-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "long-division", title: "Long Division", group: "Operations", previewLocalPath: "../desktop-previews/math/divisionorganizermobile-desktop.html", previewWebPath: "/desktop-previews/math/divisionorganizermobile-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "long-division-scaffold", title: "Long Division Scaffold", group: "Operations", previewLocalPath: "../desktop-previews/math/long-division-colorcoded-generator-preview-desktop.html", previewWebPath: "/desktop-previews/math/long-division-colorcoded-generator-preview-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "manipulatives", title: "Manipulatives / Hundreds Chart", group: "Place Value / Coins", previewLocalPath: "../desktop-previews/math/manipulatives-mobile-preview-desktop.html", previewWebPath: "/desktop-previews/math/manipulatives-mobile-preview-desktop.html", sourceWidth: 1360, fallbackHeight: 1480 },
        { id: "ten-frames", title: "Ten Frames", group: "Place Value / Coins", previewLocalPath: "../desktop-previews/math/tenframes-preview-desktop.html", previewWebPath: "/desktop-previews/math/tenframes-preview-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "coin-counter", title: "Coin Counter", group: "Place Value / Coins", previewLocalPath: "../desktop-previews/math/coin-counter-generator-preview-desktop.html", previewWebPath: "/desktop-previews/math/coin-counter-generator-preview-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "math-tic-tac-toe", title: "Math Tic Tac Toe", group: "Games", previewLocalPath: "../desktop-previews/math/math-tictac-mobile-preview-desktop.html", previewWebPath: "/desktop-previews/math/math-tictac-mobile-preview-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "math-roll-and-read", title: "Math Roll and Read", group: "Games", previewLocalPath: "../desktop-previews/math/math-roll-and-read-generator-preview-desktop.html", previewWebPath: "/desktop-previews/math/math-roll-and-read-generator-preview-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 }
      ]
    },
    {
      id: "sor-generators",
      label: "SOR Generators",
      items: [
        { id: "fluency-grid", title: "Fluency Grid", group: "Fluency", previewLocalPath: "../site-preview-march3rd/desktop-previews/reading/fluencygridpreview-desktop.html", previewWebPath: "/site-preview-march3rd/desktop-previews/reading/fluencygridpreview-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "word-mapping", title: "Word Mapping", group: "Word Work", previewLocalPath: "../site-preview-march3rd/desktop-previews/reading/wordmapmaster-preview-desktop.html", previewWebPath: "/site-preview-march3rd/desktop-previews/reading/wordmapmaster-preview-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "word-ladder", title: "Word Ladder", group: "Word Work", previewLocalPath: "../site-preview-march3rd/desktop-previews/reading/laddermobilepreview-desktop.html", previewWebPath: "/site-preview-march3rd/desktop-previews/reading/laddermobilepreview-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "roll-and-read", title: "Roll and Read", group: "Fluency", previewLocalPath: "../site-preview-march3rd/desktop-previews/reading/rollread-desktop.html", previewWebPath: "/site-preview-march3rd/desktop-previews/reading/rollread-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "pyramid-spelling", title: "Pyramid Spelling", group: "Word Work", previewLocalPath: "../site-preview-march3rd/desktop-previews/reading/pyramidpreview-desktop.html", previewWebPath: "/site-preview-march3rd/desktop-previews/reading/pyramidpreview-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 },
        { id: "spelling-with-pictures", title: "Spelling With Pictures", group: "Word Work", previewLocalPath: "../site-preview-march3rd/desktop-previews/reading/spellingpicture-desktop.html", previewWebPath: "/site-preview-march3rd/desktop-previews/reading/spellingpicture-desktop.html", sourceWidth: 1180, fallbackHeight: 1320 },
        { id: "reading-tic-tac-toe", title: "Reading Tic Tac Toe", group: "Games", previewLocalPath: "../site-preview-march3rd/desktop-previews/reading/tic-tac-preview-march1st-desktop.html", previewWebPath: "/site-preview-march3rd/desktop-previews/reading/tic-tac-preview-march1st-desktop.html", sourceWidth: 1360, fallbackHeight: 1320 }
      ]
    }
  ];

  const LANES = [
    {
      id: "scaffolded-math",
      kicker: "Scaffolded Math",
      title: "Math skill pages you can browse by topic",
      support: "Choose a math collection to open its real page.",
      cards: [
        { title: "Place Value", description: "Digit value, number forms, and scaffolded base-ten support.", href: "../site-preview-march3rd/placevalue-preview.html", directHref: "./place-value.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac911736702feeb74df7be.png", meta: "Open page" },
        { title: "Rounding", description: "Visual supports and practice pages for flexible number sense.", href: "../site-preview-march3rd/rounding-preview.html", directHref: "./rounding.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac91177bdf381089d44d40.png", meta: "Open page" },
        { title: "Addition", description: "Strategy-based addition resources and graphic organizers.", href: "../site-preview-march3rd/addition-preview.html", directHref: "./addition.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac9117b003fa5a871f7b53.png", meta: "Open page" },
        { title: "Multiplication", description: "Scaffolded multiplication tools for core concepts and fact fluency.", href: "../site-preview-march3rd/multiplication-preview.html", directHref: "./multiplication.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac9117b2a2742794f84456.png", meta: "Open page" },
        { title: "Division", description: "Long division supports, organizers, and guided practice pages.", href: "../site-preview-march3rd/division-preview.html", directHref: "./division.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac9117b003fa60ce1f7b56.png", meta: "Open page" },
        { title: "Fractions", description: "Fraction models, comparison practice, and visual intervention pages.", href: "../site-preview-march3rd/fractions-preview.html", directHref: "./fractions.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac9117b2a27470d8f84454.png", meta: "Open page" },
        { title: "Decimals", description: "Decimal place value, equivalence, and scaffolded computation support.", href: "../site-preview-march3rd/decimals-preview.html", directHref: "./decimals.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac9117618c8d244c5f3c20.png", meta: "Open page" },
        { title: "Google Puzzles", description: "Self-checking math puzzle activities that extend the skill page sets.", href: "../site-preview-march3rd/google-puzzle-preview.html", directHref: "./google-puzzles.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac9266b2a2744c3bf8776e.png", meta: "Open page" }
      ]
    },
    {
      id: "sor-reading",
      kicker: "SOR Reading",
      title: "Reading collections teachers can open by routine",
      support: "Choose a reading collection to open its real page.",
      cards: [
        { title: "Heart Words", description: "Target tricky high-frequency words with visual routines and practice.", href: "../site-preview-march3rd/heart-words-preview.html", directHref: "./heart-words.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac9117b003fa59321f7b55.png", meta: "Open page" },
        { title: "Phonics Comics", description: "Decodable stories built around phonics patterns kids will actually read.", href: "../site-preview-march3rd/phonics-comics-preview.html", directHref: "./phonics-comics.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac911736702f12ed4df7bf.png", meta: "Open page" },
        { title: "Fix the Mix Up", description: "Sentence-level reading repair tasks with visual support.", href: "../site-preview-march3rd/fix-mixup-preview.html", directHref: "./fix-the-mix-up.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac89dc618c8da3da5e1340.png", meta: "Open page" },
        { title: "Blending Slides", description: "Small-group blending routines for repeated connected practice.", href: "../site-preview-march3rd/blending-slides-preview.html", directHref: "./blending-slides.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac9117b003fa18fa1f7b54.png", meta: "Open page" },
        { title: "Phonics Mazes", description: "Visual discrimination and word reading practice around one target skill.", href: "../site-preview-march3rd/phonics-maze-preview.html", directHref: "./phonics-mazes.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac9117618c8d43615f3c21.png", meta: "Open page" },
        { title: "Pick the Pic", description: "Picture-supported decoding and meaning checks tied to phonics patterns.", href: "../site-preview-march3rd/pick-the-pic-preview.html", directHref: "./pick-the-pic.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac91177bdf386bfed44d42.png", meta: "Open page" },
        { title: "HFW Pyramids", description: "Repeated high-frequency word practice in a fast printable format.", href: "../site-preview-march3rd/hfw-pyramid-preview.html", directHref: "./hfw-pyramids.html", image: "https://storage.googleapis.com/msgsndr/F9vnmU5R8sOuTGoxp5by/media/697a03641d0982d5877d12d1.gif", meta: "Open page" },
        { title: "Spelling by Phonics Skill", description: "Spelling collections aligned to phonics patterns and intervention groups.", href: "../site-preview-march3rd/spelling-preview.html", directHref: "./spelling-by-phonics-skill.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac9117618c8db64b5f3c1f.png", meta: "Open page" },
        { title: "Spelling Google Sheets", description: "Self-checking spelling practice pages in the same reading support lane.", href: "../site-preview-march3rd/spelling-google-sheets-preview.html", directHref: "./spelling-google-sheets.html", image: "https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/69ac9117618c8db64b5f3c1f.png", meta: "Open page" }
      ]
    },
    {
      id: "games",
      kicker: "Interactive Games",
      title: "Game collections that open as full pages",
      support: "Choose a game library to open its real page.",
      cards: [
        { title: "Reading Games", description: "Reading game boards and interactive activities built around skills.", href: "../site-preview-march3rd/readinggames-preview.html", directHref: "./reading-games.html", image: "https://storage.googleapis.com/msgsndr/F9vnmU5R8sOuTGoxp5by/media/6962c049c7683b07d871dd47.png", meta: "Open page" },
        { title: "Math Games", description: "Math game boards and practice formats that keep repetition engaging.", href: "../site-preview-march3rd/math-game-board-preview.html", directHref: "./math-games.html", image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/F9vnmU5R8sOuTGoxp5by/media/674515a001f2194ec471bb64.png", meta: "Open page" },
        { title: "More Games", description: "The wider game collection across subjects and routines.", href: "../site-preview-march3rd/games-preview.html", directHref: "./more-games.html", image: "https://storage.googleapis.com/msgsndr/F9vnmU5R8sOuTGoxp5by/media/6962c53098efbd78ecbbad10.png", meta: "Open page" }
      ]
    },
    {
      id: "songs",
      kicker: "Learning Songs",
      title: "Song collections that teachers can open by routine",
      support: "Choose a song page to open its full preview.",
      cards: [
        { title: "Math Learning Songs", description: "Song-based math routines with matching printables and posters.", href: "../site-preview-march3rd/math-song-preview.html", directHref: "./math-learning-songs.html", image: "https://storage.googleapis.com/msgsndr/F9vnmU5R8sOuTGoxp5by/media/6962c53098efbd78ecbbad10.png", meta: "Open page" },
        { title: "Science Learning Songs", description: "A new science song page for Water Cycle, Planets, and Photosynthesis tracks.", directHref: "./science-learning-songs.html", image: "https://storage.googleapis.com/msgsndr/F9vnmU5R8sOuTGoxp5by/media/6962c049e186383c509dc54f.png", meta: "Open page" }
      ]
    }
  ];

  const categoryMap = new Map(CATEGORIES.map(function (category) {
    return [category.id, category];
  }));
  const laneMap = new Map(LANES.map(function (lane) {
    return [lane.id, lane];
  }));

  const homePanel = document.getElementById("homePanel");
  const browserPanel = document.getElementById("browserPanel");
  const lanePanel = document.getElementById("lanePanel");
  const pickerEl = document.getElementById("itemPicker");
  const viewport = document.getElementById("previewViewport");
  const frame = document.getElementById("previewFrame");
  const titleEl = document.getElementById("pageTitle");
  const kickerEl = document.getElementById("categoryKicker");
  const laneKickerEl = document.getElementById("laneKicker");
  const laneTitleEl = document.getElementById("laneTitle");
  const laneSupportEl = document.getElementById("laneSupport");
  const laneGridEl = document.getElementById("laneGrid");
  const categoryLinks = Array.from(document.querySelectorAll("[data-category]"));
  const laneLinks = Array.from(document.querySelectorAll("[data-lane]"));
  const homeLinks = Array.from(document.querySelectorAll("[data-view='home']"));

  if (!homePanel || !browserPanel || !lanePanel || !pickerEl || !viewport || !frame || !titleEl || !kickerEl || !laneKickerEl || !laneTitleEl || !laneSupportEl || !laneGridEl) {
    return;
  }

  let currentView = "home";
  let currentCategoryId = "sor-generators";
  let currentItemId = "fluency-grid";
  let currentLaneId = "scaffolded-math";

  function currentCategory() {
    return categoryMap.get(currentCategoryId) || CATEGORIES[0];
  }

  function currentItem() {
    const category = currentCategory();
    return category.items.find(function (item) {
      return item.id === currentItemId;
    }) || category.items[0];
  }

  function currentLane() {
    return laneMap.get(currentLaneId) || LANES[0];
  }

  function resolvePreviewUrl(item) {
    if (!item) {
      return "";
    }
    if (window.location.protocol === "file:") {
      return item.previewLocalPath || "";
    }
    return item.previewWebPath || "";
  }

  function buildResourceHref(card) {
    if (card.directHref) {
      return card.directHref;
    }
    const params = new URLSearchParams({
      lane: currentLaneId,
      title: card.title,
      src: card.href
    });
    return "./resource-page.html?" + params.toString();
  }

  function parseHash() {
    const raw = window.location.hash.replace(/^#/, "").trim();
    if (!raw || raw === "home") {
      currentView = "home";
      return;
    }

    if (laneMap.has(raw)) {
      currentView = "lane";
      currentLaneId = raw;
      return;
    }

    const parts = raw.split("/");
    const category = categoryMap.get(parts[0]);
    if (category) {
      currentView = "browser";
      currentCategoryId = category.id;
      const item = category.items.find(function (entry) {
        return entry.id === parts[1];
      });
      currentItemId = item ? item.id : category.items[0].id;
      return;
    }

    currentView = "home";
  }

  function setHash() {
    let next = "home";
    if (currentView === "browser") {
      next = currentCategoryId + "/" + currentItemId;
    } else if (currentView === "lane") {
      next = currentLaneId;
    }
    if (window.location.hash.replace(/^#/, "") !== next) {
      window.location.hash = next;
    }
  }

  function setActiveState(links, predicate) {
    links.forEach(function (link) {
      const isCurrent = predicate(link);
      link.classList.toggle("is-current", isCurrent);
      link.classList.toggle("is-active", isCurrent);
      link.setAttribute("aria-current", isCurrent ? "page" : "false");
    });
  }

  function renderNavState() {
    setActiveState(homeLinks, function () {
      return currentView === "home";
    });
    setActiveState(categoryLinks, function (link) {
      return currentView === "browser" && link.dataset.category === currentCategoryId;
    });
    setActiveState(laneLinks, function (link) {
      return currentView === "lane" && link.dataset.lane === currentLaneId;
    });
  }

  function renderPanels() {
    homePanel.hidden = currentView !== "home";
    browserPanel.hidden = currentView !== "browser";
    lanePanel.hidden = currentView !== "lane";
  }

  function renderPicker() {
    const category = currentCategory();
    pickerEl.innerHTML = "";

    const groups = [];
    category.items.forEach(function (item) {
      const groupName = item.group || "More";
      let group = groups.find(function (entry) {
        return entry.name === groupName;
      });
      if (!group) {
        group = { name: groupName, items: [] };
        groups.push(group);
      }
      group.items.push(item);
    });

    groups.forEach(function (group) {
      const section = document.createElement("section");
      section.className = "is-generator-group";

      const label = document.createElement("h2");
      label.className = "is-generator-group-label";
      label.textContent = group.name;

      const options = document.createElement("div");
      options.className = "is-generator-group-options";

      group.items.forEach(function (item) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "is-generator-option";
        if (item.id === currentItemId) {
          button.classList.add("is-active");
        }
        button.textContent = item.title;
        button.addEventListener("click", function () {
          if (item.id === currentItemId) {
            return;
          }
          currentItemId = item.id;
          render();
          setHash();
        });
        options.appendChild(button);
      });

      section.appendChild(label);
      section.appendChild(options);
      pickerEl.appendChild(section);
    });
  }

  function updateBrowserHeader() {
    const category = currentCategory();
    const item = currentItem();
    const title = category.label + " - " + item.title;
    kickerEl.textContent = category.label;
    titleEl.textContent = title;
    frame.title = title;
    document.title = "Intervention Station | " + title;
  }

  function loadCurrentItem() {
    const previewUrl = resolvePreviewUrl(currentItem());
    if (frame.getAttribute("src") !== previewUrl) {
      frame.setAttribute("src", previewUrl);
    }
  }

  function renderLane() {
    const lane = currentLane();
    laneKickerEl.textContent = lane.kicker;
    laneTitleEl.textContent = lane.title;
    laneSupportEl.textContent = lane.support;
    laneGridEl.innerHTML = "";

    lane.cards.forEach(function (card) {
      const anchor = document.createElement("a");
      anchor.className = "is-lane-card";
      anchor.href = buildResourceHref(card);

      const image = document.createElement("img");
      image.className = "is-lane-card__media";
      image.src = card.image;
      image.alt = card.title;

      const body = document.createElement("div");
      body.className = "is-lane-card__body";

      const title = document.createElement("h2");
      title.className = "is-lane-card__title";
      title.textContent = card.title;

      const description = document.createElement("p");
      description.className = "is-lane-card__desc";
      description.textContent = card.description;

      const meta = document.createElement("span");
      meta.className = "is-lane-card__meta";
      meta.textContent = card.meta || "Open page";

      body.appendChild(title);
      body.appendChild(description);
      body.appendChild(meta);
      anchor.appendChild(image);
      anchor.appendChild(body);
      laneGridEl.appendChild(anchor);
    });

    document.title = "Intervention Station | " + lane.kicker;
  }

  function applyEmbedCleanup(doc) {
    if (!doc || !doc.head) {
      return;
    }

    let style = doc.getElementById("workingdesign-host-overrides");
    if (!style) {
      style = doc.createElement("style");
      style.id = "workingdesign-host-overrides";
      style.textContent =
        "html,body{margin:0!important;padding:0!important;overflow:visible!important;height:auto!important;min-height:0!important;}" +
        ".wrap,.app,.container{max-width:none!important;width:100%!important;margin:0!important;padding:0!important;}" +
        ".head,.subtitle,.top-cta-wrap,.is-ticker,.is-nav,.is-mobile-hub-wrap,.is-page-hero,.promo-note,.controls-note{display:none!important;}" +
        ".status:empty{display:none!important;}" +
        ".is-home-sections .is-layout{grid-template-columns:1fr!important;}" +
        ".is-main{min-width:0!important;width:100%!important;}" +
        ".is-page{border:0!important;padding:0!important;}" +
        ".preview-frame-wrap{border:0!important;box-shadow:none!important;}" +
        ".controls{padding-left:0!important;padding-right:0!important;border-left:0!important;border-right:0!important;border-radius:0!important;}" +
        ".sheet-wrap,[class*='sheet-wrap'],.page-wrap,[class*='page-wrap'],.preview-shell{max-height:none!important;overflow:visible!important;height:auto!important;padding:0!important;border:0!important;border-radius:0!important;}" +
        ".page,.sheet{max-width:none!important;width:100%!important;margin:0!important;border-left:0!important;border-right:0!important;border-radius:0!important;padding-left:12px!important;padding-right:12px!important;}";
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
      const item = currentItem();
      if (!html || !body) {
        return null;
      }
      return {
        width: Math.max(item.sourceWidth || 1360, html.clientWidth, html.scrollWidth, html.offsetWidth, body.scrollWidth, body.offsetWidth),
        height: Math.max(item.fallbackHeight || 1200, html.clientHeight, html.scrollHeight, html.offsetHeight, body.clientHeight, body.scrollHeight, body.offsetHeight)
      };
    } catch (_error) {
      return null;
    }
  }

  function fitFrame() {
    if (currentView !== "browser" || browserPanel.hidden) {
      return;
    }
    const item = currentItem();
    const measured = measureFrame();
    const sourceWidth = measured ? measured.width : (item.sourceWidth || 1360);
    const sourceHeight = measured ? measured.height : (item.fallbackHeight || 1200);
    const availableWidth = Math.max(320, viewport.clientWidth);
    const scale = Math.min(1, availableWidth / sourceWidth);
    const fittedHeight = Math.ceil(sourceHeight * scale);

    viewport.style.height = fittedHeight + "px";
    viewport.style.maxWidth = "100%";
    frame.style.width = sourceWidth + "px";
    frame.style.height = sourceHeight + "px";
    frame.style.transform = "scale(" + scale.toFixed(4) + ")";
    frame.style.transformOrigin = "top left";
    frame.style.margin = "0";
  }

  function scheduleFit() {
    if (currentView !== "browser") {
      return;
    }
    window.requestAnimationFrame(fitFrame);
    window.setTimeout(fitFrame, 160);
    window.setTimeout(fitFrame, 700);
    window.setTimeout(fitFrame, 1400);
  }

  function renderHome() {
    document.title = "Intervention Station | Generator Preview Home";
  }

  function render() {
    renderNavState();
    renderPanels();

    if (currentView === "home") {
      renderHome();
      return;
    }
    if (currentView === "lane") {
      renderLane();
      return;
    }

    renderPicker();
    updateBrowserHeader();
    loadCurrentItem();
    scheduleFit();
  }

  function openHome() {
    currentView = "home";
    render();
    setHash();
  }

  function openCategory(categoryId, itemId) {
    const category = categoryMap.get(categoryId);
    if (!category) {
      return;
    }
    currentView = "browser";
    currentCategoryId = category.id;
    const item = category.items.find(function (entry) {
      return entry.id === itemId;
    });
    currentItemId = item ? item.id : category.items[0].id;
    render();
    setHash();
  }

  function openLane(laneId) {
    if (!laneMap.has(laneId)) {
      return;
    }
    currentView = "lane";
    currentLaneId = laneId;
    render();
    setHash();
  }

  homeLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openHome();
    });
  });

  categoryLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const categoryId = link.dataset.category;
      if (!categoryId) {
        return;
      }
      event.preventDefault();
      openCategory(categoryId, link.dataset.item);
    });
  });

  laneLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const laneId = link.dataset.lane;
      if (!laneId) {
        return;
      }
      event.preventDefault();
      openLane(laneId);
    });
  });

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
  window.addEventListener("hashchange", function () {
    parseHash();
    render();
  });

  if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(scheduleFit);
    resizeObserver.observe(viewport);
  }

  (function initHomeSlider() {
    const track = document.getElementById("isSliderTrack");
    if (!track) {
      return;
    }
    const slider = track.closest(".is-slider-top");
    if (!slider) {
      return;
    }
    const prevBtn = slider.querySelector(".is-slider-prev");
    const nextBtn = slider.querySelector(".is-slider-next");

    function slideWidth() {
      return track.clientWidth;
    }

    function go(direction) {
      track.scrollBy({ left: direction * slideWidth(), behavior: "smooth" });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        go(-1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        go(1);
      });
    }

    let timer = null;

    function stop() {
      if (timer) {
        window.clearInterval(timer);
      }
      timer = null;
    }

    function start() {
      stop();
      timer = window.setInterval(function () {
        const width = slideWidth();
        const max = track.scrollWidth - width;
        const atEnd = track.scrollLeft >= max - 2;
        if (atEnd) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          track.scrollBy({ left: width, behavior: "smooth" });
        }
      }, 3000);
    }

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("touchstart", stop, { passive: true });
    slider.addEventListener("touchend", start, { passive: true });
    start();
  })();

  parseHash();
  render();
})();
