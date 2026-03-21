(function () {
  let instanceCount = 0;

  function render(config) {
    const mount = document.getElementById(config.mountId);
    if (!mount) return;

    instanceCount += 1;
    const id = "lds-" + instanceCount;

    mount.innerHTML = [
      '<div class="lds-root">',
      '  <div class="lds-app">',
      '    <div class="lds-screen-only">',
      '      <h1>' + config.title + '</h1>',
      '      <p class="lds-subtitle">' + config.subtitle + '</p>',
      '    </div>',
      '    <div class="lds-controls-card">',
      '      <section class="lds-controls-top">',
      '        <div class="lds-type-buttons" id="' + id + '-type-buttons">',
      '          <button class="lds-type-btn is-active" type="button" data-type="2x1">2-digit by 1-digit</button>',
      '          <button class="lds-type-btn" type="button" data-type="3x1">3-digit by 1-digit</button>',
      '          <button class="lds-type-btn" type="button" data-type="4x1">4-digit by 1-digit</button>',
      "        </div>",
      "      </section>",
      '      <div class="lds-controls-grid">',
      '        <div class="lds-field">',
      '          <label for="' + id + '-problem-count">Problems</label>',
      '          <select id="' + id + '-problem-count"></select>',
      '          <div class="lds-field-hint" id="' + id + '-problem-count-hint"></div>',
      "        </div>",
      '        <div class="lds-field">',
      '          <label for="' + id + '-multiples-mode">Display Multiples</label>',
      '          <select id="' + id + '-multiples-mode">',
      '            <option value="filled" selected>Yes (show multiples)</option>',
      '            <option value="blank">No (students fill in)</option>',
      "          </select>",
      "        </div>",
      '        <div class="lds-field">',
      '          <label for="' + id + '-step-prompt-mode">Show Step Prompt Values</label>',
      '          <select id="' + id + '-step-prompt-mode">',
      '            <option value="blank" selected>No (students fill in)</option>',
      '            <option value="filled">Yes (show step parts)</option>',
      "          </select>",
      "        </div>",
      '        <div class="lds-field">',
      '          <label for="' + id + '-remainder-mode">Remainders</label>',
      '          <select id="' + id + '-remainder-mode">',
      '            <option value="allow" selected>Allow remainders</option>',
      '            <option value="none">No remainders (exact only)</option>',
      "          </select>",
      "        </div>",
      '        <div class="lds-field">',
      '          <label for="' + id + '-color-toggle">Color Coding</label>',
      '          <label class="lds-checkbox-wrap"><input id="' + id + '-color-toggle" type="checkbox" checked>Use color coding</label>',
      "        </div>",
      '        <div class="lds-field">',
      '          <label for="' + id + '-custom-problem">Custom Problem</label>',
      '          <input id="' + id + '-custom-problem" type="text" placeholder="Examples: 654/6 or 6)654" />',
      "        </div>",
      "      </div>",
      '      <div class="lds-button-row">',
      '        <button id="' + id + '-generate" class="lds-btn lds-btn-primary" type="button">Generate</button>',
      '        <button id="' + id + '-print" class="lds-btn lds-btn-secondary" type="button">Print</button>',
      "      </div>",
      '      <div class="lds-note" id="' + id + '-status">Choose settings and generate a worksheet.</div>',
      "    </div>",
      '    <div id="' + id + '-worksheet-host"></div>',
      "  </div>",
      "</div>"
    ].join("");

    const root = mount.querySelector(".lds-root");
    const els = {
      host: root.querySelector("#" + id + "-worksheet-host"),
      typeButtons: Array.from(root.querySelectorAll("#" + id + "-type-buttons .lds-type-btn")),
      problemCount: root.querySelector("#" + id + "-problem-count"),
      problemCountHint: root.querySelector("#" + id + "-problem-count-hint"),
      customProblem: root.querySelector("#" + id + "-custom-problem"),
      multiplesMode: root.querySelector("#" + id + "-multiples-mode"),
      stepPromptMode: root.querySelector("#" + id + "-step-prompt-mode"),
      remainderMode: root.querySelector("#" + id + "-remainder-mode"),
      colorToggle: root.querySelector("#" + id + "-color-toggle"),
      statusText: root.querySelector("#" + id + "-status"),
      generateBtn: root.querySelector("#" + id + "-generate"),
      printBtn: root.querySelector("#" + id + "-print")
    };

    const state = {
      problemType: config.defaultProblemType || "2x1"
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
      return TYPE_CONFIG[state.problemType] || TYPE_CONFIG["2x1"];
    }

    function setProblemType(typeKey) {
      if (!TYPE_CONFIG[typeKey]) return;
      state.problemType = typeKey;
      els.typeButtons.forEach(function (button) {
        button.classList.toggle("is-active", button.dataset.type === typeKey);
      });
    }

    function getProblemsPerPage(cfg) {
      return cfg.digits >= 3 ? 1 : 2;
    }

    function populateProblemCountOptions() {
      const cfg = getTypeConfig();
      const perPage = getProblemsPerPage(cfg);
      const previous = Number(els.problemCount.value);
      let selectedValue = Number.isFinite(previous) ? previous : (perPage === 2 ? 4 : 3);
      const options = [];

      for (let pages = 1; pages <= 5; pages += 1) {
        const total = pages * perPage;
        const label = perPage === 2 ? total + " (2 per page)" : total + " (1 per page)";
        options.push({ value: total, label: label });
      }

      if (!options.some(function (option) { return option.value === selectedValue; })) {
        selectedValue = options[Math.min(2, options.length - 1)].value;
      }

      els.problemCount.innerHTML = options.map(function (option) {
        const selected = option.value === selectedValue ? " selected" : "";
        return '<option value="' + option.value + '"' + selected + ">" + option.label + "</option>";
      }).join("");

      els.problemCountHint.textContent = perPage === 2
        ? "2-digit by 1-digit uses 2 problems per page."
        : "3-digit and 4-digit use 1 problem per page.";
    }

    function getTotalProblemCount() {
      const raw = Number(els.problemCount.value);
      if (!Number.isFinite(raw)) return 1;
      return Math.max(1, raw);
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
      const tokens = els.customProblem.value
        .split(/[\n,;]+/)
        .map(function (token) { return token.trim(); })
        .filter(Boolean);

      if (tokens.length > 0) {
        const parsed = [];

        for (const token of tokens.slice(0, problemCount)) {
          const problem = parseProblemToken(token, cfg);
          if (!problem) {
            return {
              problems: [],
              warning: true,
              message: "Invalid custom problem. Use 654/6 or 6)654."
            };
          }
          parsed.push(problem);
        }

        const problems = new Array(problemCount).fill(0).map(function (_, idx) {
          const source = parsed[Math.min(idx, parsed.length - 1)];
          return { dividend: source.dividend, divisor: source.divisor };
        });

        if (!allowRemainder && problems.some(function (problem) {
          return (problem.dividend % problem.divisor) !== 0;
        })) {
          return {
            problems: [],
            warning: true,
            message: "Custom problem has a remainder. Pick exact division or allow remainders."
          };
        }

        return {
          problems: problems,
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
      return String(text).split("").map(function (char, idx) {
        const tone = tones[Math.min(idx, tones.length - 1)] || "lds-tone-0";
        return '<span class="lds-digit-box lds-small ' + tone + '">' + (showValues ? char : "&nbsp;") + "</span>";
      }).join("");
    }

    function rightAlignChars(value, length) {
      const chars = String(value).split("");
      const output = new Array(length).fill("&nbsp;");
      let cursor = length - 1;
      for (let i = chars.length - 1; i >= 0 && cursor >= 0; i -= 1) {
        output[cursor] = chars[i];
        cursor -= 1;
      }
      return output;
    }

    function canvasBox(row, col, className, value) {
      const safeValue = value == null ? "&nbsp;" : value;
      return '<div class="lds-canvas-box ' + className + '" style="grid-row:' + row + ";grid-column:" + col + ';">' + safeValue + "</div>";
    }

    function computeLongDivisionSteps(dividend, divisor) {
      const digits = String(dividend).split("").map(Number);
      const steps = [];
      let current = 0;

      function toneFor(index) {
        return "lds-tone-" + (index % 4);
      }

      for (let i = 0; i < digits.length; i += 1) {
        current = (current * 10) + digits[i];
        const quotientDigit = Math.floor(current / divisor);
        const product = quotientDigit * divisor;
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
          quotientDigit: quotientDigit,
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
      const digits = cfg.digits;
      const rows = (2 * digits) + 2;
      const firstDigitCol = 3;
      const remLabelCol = firstDigitCol + digits;
      const remCol = remLabelCol + 1;
      const dividendDigits = String(problem.dividend).split("");
      const chunks = [];

      function toneForLane(lane) {
        return "lds-tone-" + (Math.max(0, lane) % 4);
      }

      for (let i = 0; i < digits; i += 1) {
        const qVal = showAnswers ? stepsData.quotientDigits[i] : "&nbsp;";
        chunks.push(canvasBox(1, firstDigitCol + i, toneForLane(i), qVal));
      }

      if (showRemainderHeader) {
        chunks.push('<div class="lds-remainder-label" style="grid-row:1;grid-column:' + remLabelCol + ';">R</div>');
        chunks.push(canvasBox(1, remCol, "lds-blank-gray", showAnswers ? stepsData.finalRemainder : "&nbsp;"));
      }

      chunks.push(canvasBox(2, 2, "lds-divisor", problem.divisor));

      for (let i = 0; i < digits; i += 1) {
        chunks.push(canvasBox(2, firstDigitCol + i, toneForLane(i), dividendDigits[i]));
      }

      chunks.push('<div class="lds-division-top-line" style="grid-row:2;grid-column:' + firstDigitCol + " / " + (firstDigitCol + digits) + ';"></div>');
      chunks.push('<div class="lds-division-left-line" style="grid-row:2;grid-column:' + firstDigitCol + ';"></div>');

      let row = 3;

      for (let i = 0; i < stepsData.steps.length; i += 1) {
        const step = stepsData.steps[i];
        const startDigit = i === 0 ? 0 : Math.min(i - 1, digits - 2);
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
          const arrowTone = (bringStartLane + 1) % 4;

          chunks.push(canvasBox(row, bringStartCol, toneForLane(bringStartLane), bringChars[0]));
          chunks.push(canvasBox(row, bringStartCol + 1, toneForLane(Math.min(bringStartLane + 1, digits - 1)), bringChars[1]));
          chunks.push('<div class="lds-down-arrow lds-arrow-' + arrowTone + '" style="grid-row:' + (row - 1) + ";grid-column:" + (bringStartCol + 1) + ';"></div>');
          row += 1;
        } else {
          const remainderChars = showAnswers ? rightAlignChars(stepsData.finalRemainder, 2) : ["&nbsp;", "&nbsp;"];
          chunks.push(canvasBox(row, startCol, "", remainderChars[0]));
          chunks.push(canvasBox(row, startCol + 1, "", remainderChars[1]));
        }
      }

      return [
        '<div class="lds-problem-canvas-wrap">',
        '  <div class="lds-problem-canvas' + (showRemainderHeader ? "" : " lds-no-remainder") + '" style="--digits:' + digits + ";--rows:" + rows + ';">',
        chunks.join(""),
        "  </div>",
        "</div>"
      ].join("");
    }

    function renderMultipleCells(divisor, mode, tone) {
      let cells = "";
      for (let i = 0; i <= 10; i += 1) {
        const value = mode === "filled" ? String(divisor * i) : "&nbsp;";
        cells += '<td class="' + tone + '">' + value + "</td>";
      }
      return cells;
    }

    function renderStepStrip(step, problem, multiplesMode, showPromptValues) {
      const headers = new Array(11).fill(0).map(function (_, index) {
        return '<th class="lds-tone-head ' + step.tone + '">x' + index + "</th>";
      }).join("");
      const divisorValue = showPromptValues ? problem.divisor : "&nbsp;";

      return [
        '<section class="lds-strip">',
        '  <div class="lds-strip-head">',
        '    <div class="lds-strip-label ' + step.tone + '">Step ' + (step.index + 1) + "</div>",
        '    <p class="lds-strip-question">How many times does <span class="lds-digit-box lds-small lds-divisor-fixed">' + divisorValue + '</span> go into <span class="lds-target-digits">' + digitBoxesWithTones(step.partialDisplay, step.partialDigitTones, showPromptValues) + '</span> evenly or without going over?</p>',
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

        if (window.innerWidth <= 900) return;

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

    function renderWorksheet() {
      const cfg = getTypeConfig();
      const perPage = getProblemsPerPage(cfg);
      const totalProblemCount = getTotalProblemCount();
      const setCount = Math.max(1, Math.ceil(totalProblemCount / perPage));
      const source = getProblems(cfg, totalProblemCount);
      const colorClass = els.colorToggle.checked ? "lds-color-fill" : "lds-no-color";

      els.statusText.textContent = source.message;
      els.statusText.style.color = source.warning ? "#a33a3a" : "#5a677f";

      if (!source.problems || source.problems.length === 0) {
        els.host.innerHTML = "";
        return;
      }

      const showAnswers = false;
      const showPromptValues = els.stepPromptMode.value === "filled";
      const showRemainderHeader = els.remainderMode.value === "allow";

      const sheets = new Array(setCount).fill(0).map(function (_, pageIndex) {
        const pageProblems = source.problems.slice(pageIndex * perPage, (pageIndex + 1) * perPage);
        const organizerBlocks = pageProblems.map(function (problem) {
          const stepsData = computeLongDivisionSteps(problem.dividend, problem.divisor);
          const strips = stepsData.steps.map(function (step) {
            return renderStepStrip(step, problem, els.multiplesMode.value, showPromptValues);
          }).join("");

          return [
            '<section class="lds-organizer-block">',
            '  <section class="lds-organizer">',
            '    <section class="lds-left-column">',
            '      <div class="lds-problem-equation">' + problem.dividend + " &divide; " + problem.divisor + "</div>",
            '      <div class="lds-workspace">',
            '        <div class="lds-workspace-layout">',
            renderProblemCanvas(problem, stepsData, cfg, showAnswers, showRemainderHeader),
            "        </div>",
            "      </div>",
            "    </section>",
            '    <section class="lds-right-column">' + strips + "</section>",
            "  </section>",
            "</section>"
          ].join("");
        }).join("");

        return [
          '<div class="lds-sheet-scale-wrap">',
          '  <section class="lds-sheet ' + colorClass + '">',
          '    <header class="lds-sheet-header">',
          '      <h2 class="lds-sheet-title">' + config.worksheetTitle + " (" + cfg.label + ")</h2>",
          '      <div class="lds-name-line">Name:<span class="lds-line"></span></div>',
          "    </header>",
          '    <section class="lds-two-up' + (perPage === 1 ? " lds-single" : "") + '">',
          organizerBlocks,
          "    </section>",
          '    <div class="lds-footer-note">' + config.footerNote + "</div>",
          "  </section>",
          "</div>"
        ].join("");
      }).join("");

      els.host.innerHTML = sheets;
      fitSheetsToWidth();
    }

    els.typeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setProblemType(button.dataset.type);
        populateProblemCountOptions();
        renderWorksheet();
      });
    });

    els.generateBtn.addEventListener("click", renderWorksheet);
    els.problemCount.addEventListener("change", renderWorksheet);
    els.multiplesMode.addEventListener("change", renderWorksheet);
    els.stepPromptMode.addEventListener("change", renderWorksheet);
    els.remainderMode.addEventListener("change", renderWorksheet);
    els.colorToggle.addEventListener("change", renderWorksheet);
    els.customProblem.addEventListener("input", function () {
      window.clearTimeout(renderWorksheet._timer);
      renderWorksheet._timer = window.setTimeout(renderWorksheet, 180);
    });
    els.customProblem.addEventListener("change", renderWorksheet);
    els.printBtn.addEventListener("click", function () {
      window.print();
    });

    setProblemType(state.problemType);
    populateProblemCountOptions();
    renderWorksheet();

    window.addEventListener("resize", fitSheetsToWidth);
    window.addEventListener("beforeprint", resetSheetsForPrint);
    window.addEventListener("afterprint", fitSheetsToWidth);
  }

  const config = Object.assign({
    mountId: "long-division-scaffold",
    title: "Long Division Color-Coded Organizer Generator",
    subtitle: "Generate scaffolded long division worksheets directly on the page.",
    defaultProblemType: "2x1",
    worksheetTitle: "Long Division Color-Coded Step Organizer",
    footerNote: "Long Division Scaffold Generator - @TeachwithMrC"
  }, window.LongDivisionScaffoldConfig || {});

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      render(config);
    });
  } else {
    render(config);
  }
})();
