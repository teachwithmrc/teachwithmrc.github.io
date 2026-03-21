(function () {
  let instanceCount = 0;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char];
    });
  }

  function renderApp(config) {
    const mount = document.getElementById(config.mountId);
    if (!mount) return;

    instanceCount += 1;
    const instanceId = "lds-" + instanceCount;
    mount.innerHTML = [
      '<div class="lds-root" data-instance="' + instanceId + '">',
      '  <div class="lds-shell">',
      '    <div class="lds-topbar">',
      '      <div class="lds-topbar-inner">',
      '        <div class="lds-topbar-copy">' + escapeHtml(config.topbarLabel) + '</div>',
      '        <div class="lds-topbar-actions">',
      '          <a class="lds-link-btn lds-link-btn-ghost" href="' + escapeHtml(config.generatorUrl) + '" target="_blank" rel="noopener">Open on TeachWithMRC</a>',
      '          <a class="lds-link-btn lds-link-btn-primary" href="' + escapeHtml(config.joinUrl) + '" target="_blank" rel="noopener">' + escapeHtml(config.joinLabel) + '</a>',
      '        </div>',
      '      </div>',
      '    </div>',
      '    <main class="lds-page-shell">',
      '      <section class="lds-hero">',
      '        <div class="lds-hero-card">',
      '          <p class="lds-eyebrow">' + escapeHtml(config.eyebrow) + '</p>',
      '          <h1 class="lds-title">' + escapeHtml(config.headline) + '</h1>',
      '          <p class="lds-hero-copy">' + escapeHtml(config.subheadline) + '</p>',
      '          <div class="lds-hero-actions">',
      '            <a class="lds-link-btn lds-link-btn-primary" href="' + escapeHtml(config.joinUrl) + '" target="_blank" rel="noopener">' + escapeHtml(config.joinCtaLabel) + '</a>',
      '            <a class="lds-link-btn lds-btn-soft" href="' + escapeHtml(config.generatorUrl) + '" target="_blank" rel="noopener">' + escapeHtml(config.secondaryCtaLabel) + '</a>',
      '          </div>',
      '        </div>',
      '        <aside class="lds-stats-card">',
      '          <h2>' + escapeHtml(config.sideTitle) + '</h2>',
      '          <p>' + escapeHtml(config.sideCopy) + '</p>',
      '          <div class="lds-stats-list">',
      '            <div class="lds-stat">' + escapeHtml(config.sideStat1) + '</div>',
      '            <div class="lds-stat">' + escapeHtml(config.sideStat2) + '</div>',
      '            <div class="lds-stat">' + escapeHtml(config.sideStat3) + '</div>',
      '          </div>',
      '        </aside>',
      '      </section>',
      '      <section class="lds-controls-card">',
      '        <div class="lds-controls-grid">',
      '          <div class="lds-field">',
      '            <label for="' + instanceId + '-problem-type">Problem Type</label>',
      '            <select id="' + instanceId + '-problem-type">',
      '              <option value="2x1">2-digit by 1-digit</option>',
      '              <option value="3x1" selected>3-digit by 1-digit</option>',
      '              <option value="4x1">4-digit by 1-digit</option>',
      '            </select>',
      '          </div>',
      '          <div class="lds-field">',
      '            <label for="' + instanceId + '-multiples-mode">Display Multiples</label>',
      '            <select id="' + instanceId + '-multiples-mode">',
      '              <option value="filled" selected>Yes, show multiples</option>',
      '              <option value="blank">No, students fill them in</option>',
      '            </select>',
      '          </div>',
      '          <div class="lds-field">',
      '            <label for="' + instanceId + '-remainder-mode">Remainders</label>',
      '            <select id="' + instanceId + '-remainder-mode">',
      '              <option value="allow" selected>Allow remainders</option>',
      '              <option value="none">No remainders</option>',
      '            </select>',
      '          </div>',
      '          <div class="lds-field">',
      '            <label for="' + instanceId + '-prompt-mode">Show Step Prompt Values</label>',
      '            <select id="' + instanceId + '-prompt-mode">',
      '              <option value="blank" selected>No, students fill in</option>',
      '              <option value="filled">Yes, show prompt values</option>',
      '            </select>',
      '          </div>',
      '          <div class="lds-field lds-field-wide">',
      '            <label for="' + instanceId + '-custom-problem">Custom Problem</label>',
      '            <input id="' + instanceId + '-custom-problem" type="text" placeholder="Examples: 684/6 or 6)684" />',
      '          </div>',
      '        </div>',
      '        <div class="lds-button-row" style="margin-top:14px;">',
      '          <button id="' + instanceId + '-generate" class="lds-btn lds-btn-primary" type="button">Generate Worksheet</button>',
      '          <button id="' + instanceId + '-print" class="lds-btn lds-btn-light" type="button">Print</button>',
      '          <a class="lds-link-btn lds-btn-dark" href="' + escapeHtml(config.joinUrl) + '" target="_blank" rel="noopener">' + escapeHtml(config.joinLabel) + '</a>',
      '        </div>',
      '        <div class="lds-note" id="' + instanceId + '-status">Choose your settings, then generate a scaffolded worksheet.</div>',
      '      </section>',
      '      <div id="' + instanceId + '-worksheet-host"></div>',
      '    </main>',
      '  </div>',
      '  <div class="lds-preview-lock-banner">',
      '    <strong>' + escapeHtml(config.previewLabel) + '</strong>',
      '    <span>' + escapeHtml(config.previewCopy) + '</span>',
      '    <a href="' + escapeHtml(config.joinUrl) + '" target="_blank" rel="noopener">' + escapeHtml(config.joinLabel) + '</a>',
      '  </div>',
      '</div>'
    ].join("");

    const root = mount.querySelector(".lds-root");
    const els = {
      root: root,
      host: root.querySelector("#" + instanceId + "-worksheet-host"),
      problemTypeSelect: root.querySelector("#" + instanceId + "-problem-type"),
      customProblem: root.querySelector("#" + instanceId + "-custom-problem"),
      multiplesMode: root.querySelector("#" + instanceId + "-multiples-mode"),
      stepPromptMode: root.querySelector("#" + instanceId + "-prompt-mode"),
      remainderMode: root.querySelector("#" + instanceId + "-remainder-mode"),
      statusText: root.querySelector("#" + instanceId + "-status"),
      generateBtn: root.querySelector("#" + instanceId + "-generate"),
      printBtn: root.querySelector("#" + instanceId + "-print")
    };

    const TYPE_CONFIG = {
      "2x1": { digits: 2, dividendMin: 10, dividendMax: 99, label: "2-digit by 1-digit" },
      "3x1": { digits: 3, dividendMin: 100, dividendMax: 999, label: "3-digit by 1-digit" },
      "4x1": { digits: 4, dividendMin: 1000, dividendMax: 9999, label: "4-digit by 1-digit" }
    };

    function randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getTypeConfig() {
      return TYPE_CONFIG[els.problemTypeSelect.value] || TYPE_CONFIG["3x1"];
    }

    function getProblemsPerPage(cfg) {
      return cfg.digits >= 3 ? 1 : 2;
    }

    function getTotalProblemCount(cfg) {
      return getProblemsPerPage(cfg);
    }

    function parseProblemToken(token, cfg) {
      const clean = token.trim().replace(/\s+/g, "");
      if (!clean) return null;

      let dividend = null;
      let divisor = null;

      const slashMatch = clean.match(/^(\d+)(?:\/|÷)(\d+)$/);
      if (slashMatch) {
        dividend = Number(slashMatch[1]);
        divisor = Number(slashMatch[2]);
      }

      const bracketMatch = clean.match(/^(\d+)\)(\d+)$/);
      if (bracketMatch) {
        divisor = Number(bracketMatch[1]);
        dividend = Number(bracketMatch[2]);
      }

      if (!Number.isFinite(dividend) || !Number.isFinite(divisor)) return null;
      if (divisor < 2 || divisor > 9) return null;
      if (dividend < cfg.dividendMin || dividend > cfg.dividendMax) return null;
      return { dividend: dividend, divisor: divisor };
    }

    function makeRandomProblem(cfg, allowRemainder) {
      if (allowRemainder) {
        return {
          dividend: randInt(cfg.dividendMin, cfg.dividendMax),
          divisor: randInt(2, 9)
        };
      }

      for (let tries = 0; tries < 800; tries += 1) {
        const divisor = randInt(2, 9);
        const dividend = randInt(cfg.dividendMin, cfg.dividendMax);
        if (dividend % divisor === 0) {
          return { dividend: dividend, divisor: divisor };
        }
      }

      return { dividend: cfg.dividendMin, divisor: 2 };
    }

    function getProblems(cfg, requestedCount) {
      const allowRemainder = els.remainderMode.value === "allow";
      const problemCount = Math.max(1, requestedCount);
      const customValue = els.customProblem.value.trim();

      if (customValue) {
        const parsed = parseProblemToken(customValue, cfg);
        if (!parsed) {
          return {
            problems: [],
            warning: true,
            message: "Invalid custom problem. Use 684/6 or 6)684."
          };
        }

        if (!allowRemainder && (parsed.dividend % parsed.divisor !== 0)) {
          return {
            problems: [],
            warning: true,
            message: "That custom problem has a remainder. Choose No remainders or change the problem."
          };
        }

        return {
          problems: new Array(problemCount).fill(0).map(function () { return Object.assign({}, parsed); }),
          warning: false,
          message: "Generated custom worksheet."
        };
      }

      return {
        problems: new Array(problemCount).fill(0).map(function () {
          return makeRandomProblem(cfg, allowRemainder);
        }),
        warning: false,
        message: allowRemainder
          ? "Generated random worksheet."
          : "Generated random worksheet with no remainders."
      };
    }

    function digitBoxesWithTones(text, tones, showValues) {
      const chars = String(text).split("");
      return chars.map(function (ch, idx) {
        const tone = tones[Math.min(idx, tones.length - 1)] || "lds-tone-0";
        return '<span class="lds-digit-box lds-small ' + tone + '">' + (showValues ? escapeHtml(ch) : "&nbsp;") + "</span>";
      }).join("");
    }

    function rightAlignChars(value, len) {
      const chars = String(value).split("");
      const out = new Array(len).fill("&nbsp;");
      let k = len - 1;
      for (let i = chars.length - 1; i >= 0 && k >= 0; i -= 1) {
        out[k] = chars[i];
        k -= 1;
      }
      return out;
    }

    function canvasBox(row, col, cls, value) {
      const safeValue = value == null ? "&nbsp;" : value;
      return '<div class="lds-canvas-box ' + cls + '" style="grid-row:' + row + ';grid-column:' + col + ';">' + safeValue + "</div>";
    }

    function computeLongDivisionSteps(dividend, divisor) {
      const digits = String(dividend).split("").map(function (d) { return Number(d); });
      const steps = [];
      let current = 0;

      function toneFor(idx) {
        return "lds-tone-" + (idx % 4);
      }

      for (let i = 0; i < digits.length; i += 1) {
        current = (current * 10) + digits[i];
        const qDigit = Math.floor(current / divisor);
        const product = qDigit * divisor;
        const remainder = current - product;
        const nextDigit = i < digits.length - 1 ? digits[i + 1] : null;
        const nextPartial = nextDigit === null ? remainder : (remainder * 10) + nextDigit;
        const partialDisplay = i === 0 ? String(current) : String(steps[i - 1].remainder) + String(digits[i]);
        const partialDigitTones = i === 0 ? [toneFor(0)] : [toneFor(i - 1), toneFor(i)];

        steps.push({
          index: i,
          tone: toneFor(i),
          partialDisplay: partialDisplay,
          partialDigitTones: partialDigitTones,
          quotientDigit: qDigit,
          product: product,
          remainder: remainder,
          nextPartial: nextPartial
        });

        current = remainder;
      }

      return {
        steps: steps,
        quotientDigits: steps.map(function (step) { return step.quotientDigit; }),
        finalRemainder: current
      };
    }

    function renderProblemCanvas(problem, stepsData, cfg, showAnswers, showRemainderHeader) {
      const n = cfg.digits;
      const rows = (2 * n) + 2;
      const firstDigitCol = 3;
      const remLabelCol = firstDigitCol + n;
      const remCol = remLabelCol + 1;
      const dividendDigits = String(problem.dividend).split("");
      const chunks = [];

      function toneForLane(lane) {
        return "lds-tone-" + (Math.max(0, lane) % 4);
      }

      for (let i = 0; i < n; i += 1) {
        const qVal = showAnswers ? stepsData.quotientDigits[i] : "&nbsp;";
        chunks.push(canvasBox(1, firstDigitCol + i, toneForLane(i), qVal));
      }

      if (showRemainderHeader) {
        chunks.push('<div class="lds-remainder-label" style="grid-row:1;grid-column:' + remLabelCol + ';">R</div>');
        chunks.push(canvasBox(1, remCol, "lds-blank-gray", showAnswers ? stepsData.finalRemainder : "&nbsp;"));
      }

      chunks.push(canvasBox(2, 2, "lds-divisor", problem.divisor));

      for (let i = 0; i < n; i += 1) {
        chunks.push(canvasBox(2, firstDigitCol + i, toneForLane(i), dividendDigits[i]));
      }

      chunks.push('<div class="lds-division-top-line" style="grid-row:2;grid-column:' + firstDigitCol + " / " + (firstDigitCol + n) + ';"></div>');
      chunks.push('<div class="lds-division-left-line" style="grid-row:2;grid-column:' + firstDigitCol + ';"></div>');

      let row = 3;

      for (let i = 0; i < stepsData.steps.length; i += 1) {
        const step = stepsData.steps[i];
        const startDigit = i === 0 ? 0 : Math.min(i - 1, n - 2);
        const startCol = firstDigitCol + startDigit;
        const productLen = i === 0 ? 1 : 2;

        chunks.push(canvasBox(row, startCol - 1, "lds-ghost lds-minus-cell", "&minus;"));

        const productChars = showAnswers ? rightAlignChars(step.product, productLen) : new Array(productLen).fill("&nbsp;");
        for (let j = 0; j < productLen; j += 1) {
          chunks.push(canvasBox(row, startCol + j, toneForLane(startDigit + j), productChars[j]));
        }

        row += 1;

        if (i < stepsData.steps.length - 1) {
          const bringStartLane = startDigit + (productLen - 1);
          const bringStartCol = firstDigitCol + bringStartLane;
          const bringChars = showAnswers ? rightAlignChars(step.nextPartial, 2) : ["&nbsp;", "&nbsp;"];

          chunks.push(canvasBox(row, bringStartCol, toneForLane(bringStartLane), bringChars[0]));
          chunks.push(canvasBox(row, bringStartCol + 1, toneForLane(Math.min(bringStartLane + 1, n - 1)), bringChars[1]));
          chunks.push('<div class="lds-down-arrow" style="grid-row:' + (row - 1) + ";grid-column:" + (bringStartCol + 1) + ';"></div>');
          row += 1;
        } else {
          const remChars = showAnswers ? rightAlignChars(stepsData.finalRemainder, 2) : ["&nbsp;", "&nbsp;"];
          chunks.push(canvasBox(row, startCol, "", remChars[0]));
          chunks.push(canvasBox(row, startCol + 1, "", remChars[1]));
        }
      }

      return [
        '<div class="lds-problem-canvas-wrap">',
        '  <div class="lds-problem-canvas" style="--digits:' + n + ";--rows:" + rows + ';">',
        chunks.join(""),
        "  </div>",
        "</div>"
      ].join("");
    }

    function renderMultipleCells(divisor, mode, tone) {
      let cells = "";
      for (let i = 0; i <= 10; i += 1) {
        const value = mode === "filled" ? String(divisor * i) : "&nbsp;";
        cells += '<td class="lds-multiple-cell ' + tone + '">' + value + "</td>";
      }
      return cells;
    }

    function renderStepStrip(step, problem, multiplesMode, showPromptValues) {
      const headers = new Array(11).fill(0).map(function (_, i) {
        return '<th class="lds-tone-head ' + step.tone + '">x' + i + "</th>";
      }).join("");
      const divisorValue = showPromptValues ? problem.divisor : "&nbsp;";

      return [
        '<section class="lds-strip">',
        '  <div class="lds-strip-head">',
        '    <div class="lds-strip-label ' + step.tone + '">Step ' + (step.index + 1) + "</div>",
        '    <p class="lds-strip-question">How many times does <span class="lds-digit-box lds-small">' + divisorValue + '</span> go into <span class="lds-target-digits">' + digitBoxesWithTones(step.partialDisplay, step.partialDigitTones, showPromptValues) + "</span> evenly or without going over?</p>",
        "  </div>",
        '  <table class="lds-strip-table" aria-label="Step multiples strip">',
        "    <thead><tr>" + headers + "</tr></thead>",
        "    <tbody><tr>" + renderMultipleCells(problem.divisor, multiplesMode, step.tone) + "</tr></tbody>",
        "  </table>",
        "</section>"
      ].join("");
    }

    function fitSheetsToWidth() {
      const wraps = Array.from(root.querySelectorAll(".lds-sheet-scale-wrap"));
      wraps.forEach(function (wrap) {
        const sheet = wrap.querySelector(".lds-sheet");
        if (!sheet) return;

        wrap.style.height = "";
        sheet.style.transform = "";
        sheet.style.transformOrigin = "";

        if (window.innerWidth <= 1100) return;

        const available = wrap.clientWidth - 8;
        const sheetWidth = sheet.offsetWidth;
        const sheetHeight = sheet.offsetHeight;
        if (!available || !sheetWidth || !sheetHeight) return;

        const scale = Math.min(1, available / sheetWidth);
        sheet.style.transformOrigin = "top center";
        sheet.style.transform = "scale(" + scale + ")";
        wrap.style.height = String(sheetHeight * scale) + "px";
      });
    }

    function resetSheetsForPrint() {
      const wraps = Array.from(root.querySelectorAll(".lds-sheet-scale-wrap"));
      wraps.forEach(function (wrap) {
        wrap.style.height = "auto";
        const sheet = wrap.querySelector(".lds-sheet");
        if (!sheet) return;
        sheet.style.transform = "none";
        sheet.style.transformOrigin = "";
      });
    }

    function blockedPreviewAction() {
      window.alert(config.printLockedMessage);
    }

    function renderWorksheet() {
      const cfg = getTypeConfig();
      const totalProblemCount = getTotalProblemCount(cfg);
      const perPage = getProblemsPerPage(cfg);
      const source = getProblems(cfg, totalProblemCount);

      els.statusText.textContent = source.message;
      els.statusText.style.color = source.warning ? "#a33a3a" : "#5c7189";

      if (!source.problems || source.problems.length === 0) {
        els.host.innerHTML = "";
        return;
      }

      const showAnswers = false;
      const showPromptValues = els.stepPromptMode.value === "filled";
      const showRemainderHeader = els.remainderMode.value === "allow";

      const sheets = [];
      for (let pageIndex = 0; pageIndex < Math.ceil(source.problems.length / perPage); pageIndex += 1) {
        const pageProblems = source.problems.slice(pageIndex * perPage, (pageIndex + 1) * perPage);
        const organizerBlocks = pageProblems.map(function (problem) {
          const stepsData = computeLongDivisionSteps(problem.dividend, problem.divisor);
          const strips = stepsData.steps.map(function (step) {
            return renderStepStrip(step, problem, els.multiplesMode.value, showPromptValues);
          }).join("");

          return [
            '<section class="lds-organizer">',
            "  <section>",
            '    <div class="lds-problem-equation">' + problem.dividend + " &divide; " + problem.divisor + "</div>",
            '    <div class="lds-workspace">' + renderProblemCanvas(problem, stepsData, cfg, showAnswers, showRemainderHeader) + "</div>",
            "  </section>",
            "  <section>" + strips + "</section>",
            "</section>"
          ].join("");
        }).join("");

        sheets.push([
          '<div class="lds-sheet-scale-wrap">',
          '  <section class="lds-sheet" data-watermark="' + escapeHtml(config.watermarkText) + '">',
          '    <header class="lds-sheet-header">',
          '      <h2 class="lds-sheet-title">' + escapeHtml(config.worksheetTitle) + " (" + escapeHtml(cfg.label) + ")</h2>",
          '      <div class="lds-name-line">Name:<span class="lds-line"></span></div>',
          "    </header>",
          '    <section class="lds-two-up">' + organizerBlocks + "</section>",
          '    <div class="lds-footer-note">' + escapeHtml(config.footerNote) + "</div>",
          "  </section>",
          "</div>"
        ].join(""));
      }

      els.host.innerHTML = sheets.join("");
      fitSheetsToWidth();
    }

    els.generateBtn.addEventListener("click", renderWorksheet);
    els.problemTypeSelect.addEventListener("change", renderWorksheet);
    els.multiplesMode.addEventListener("change", renderWorksheet);
    els.remainderMode.addEventListener("change", renderWorksheet);
    els.stepPromptMode.addEventListener("change", renderWorksheet);
    els.customProblem.addEventListener("change", renderWorksheet);
    els.customProblem.addEventListener("input", function () {
      if (els.customProblem.value.trim().length === 0) renderWorksheet();
    });

    els.printBtn.addEventListener("click", function () {
      if (config.previewSecure) {
        blockedPreviewAction();
        return;
      }
      window.print();
    });

    window.addEventListener("resize", fitSheetsToWidth);
    window.addEventListener("beforeprint", resetSheetsForPrint);
    window.addEventListener("afterprint", fitSheetsToWidth);

    renderWorksheet();
  }

  const config = Object.assign({
    mountId: "long-division-scaffold",
    joinUrl: "https://teachwithmrc.github.io/site-preview-march3rd/home-preview.html#join",
    generatorUrl: "https://teachwithmrc.github.io/finaldivision.html",
    previewSecure: true,
    topbarLabel: "TeachWithMrC Long Division Scaffold Preview",
    joinLabel: "Join Membership",
    eyebrow: "Math Intervention Generator",
    headline: "Scaffolded Long Division Graphic Organizer",
    subheadline: "This version is hosted directly on your website, while the call-to-action links can still point back to TeachWithMRC.",
    joinCtaLabel: "Join on TeachWithMRC",
    secondaryCtaLabel: "View Original Page",
    sideTitle: "What this page does",
    sideCopy: "The page stays on your site, while the main membership links still send visitors to TeachWithMRC.",
    sideStat1: "No iframe needed",
    sideStat2: "Hosted CSS and JS live on TeachWithMRC",
    sideStat3: "Generate button works on-page",
    previewLabel: "Preview Mode",
    previewCopy: "Printing can stay locked here if you want this to function like a preview page.",
    printLockedMessage: "Printing is locked in preview mode. Send users to TeachWithMRC to unlock full access.",
    worksheetTitle: "Long Division Color-Coded Step Organizer",
    watermarkText: "PREVIEW MODE",
    footerNote: "Hosted on your website. Membership links point to TeachWithMRC."
  }, window.LongDivisionScaffoldConfig || {});

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      renderApp(config);
    });
  } else {
    renderApp(config);
  }
})();
