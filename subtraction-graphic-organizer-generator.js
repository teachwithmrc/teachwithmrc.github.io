(function () {
  const ROWS_PER_PAGE = 3;
  const PLACE_COLORS = [
    "var(--p1)",
    "var(--p2)",
    "var(--p3)",
    "var(--p4)",
    "var(--p5)",
    "var(--p6)",
    "var(--p7)"
  ];

  function initSubtractionGraphicOrganizer() {
    const els = {
      host: document.getElementById("worksheetHost"),
      digitsA: document.getElementById("digitsA"),
      digitsB: document.getElementById("digitsB"),
      problemMode: document.getElementById("problemMode"),
      customProblem: document.getElementById("customProblem"),
      sheetTitle: document.getElementById("sheetTitle"),
      colorToggle: document.getElementById("colorToggle"),
      showProblemEq: document.getElementById("showProblemEq"),
      scaffoldToggle: document.getElementById("scaffoldToggle"),
      requireBorrowing: document.getElementById("requireBorrowing"),
      statusText: document.getElementById("statusText"),
      generateBtn: document.getElementById("generateBtn"),
      printBtn: document.getElementById("printBtn")
    };

    if (!els.host || !els.generateBtn || !els.printBtn) return;

    function randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomWithDigits(digits) {
      const min = Math.pow(10, digits - 1);
      const max = Math.pow(10, digits) - 1;
      return randInt(min, max);
    }

    function hasBorrowing(a, b) {
      const aLow = String(a).split("").reverse().map(Number);
      const bLow = String(b).split("").reverse().map(Number);
      const places = Math.max(aLow.length, bLow.length);
      let borrowed = 0;

      for (let i = 0; i < places; i += 1) {
        const topRaw = aLow[i] ?? 0;
        const bot = bLow[i] ?? 0;
        const top = topRaw - borrowed;
        if (top < bot) return true;
        borrowed = 0;
      }

      return false;
    }

    function parseOneProblem(raw, aDigits, bDigits, requireBorrowing) {
      const clean = String(raw || "").replace(/\s+/g, "");
      const match = clean.match(/^(\d+)-(\d+)$/);
      if (!match) return null;

      const aTxt = match[1];
      const bTxt = match[2];
      if (aTxt.length !== aDigits || bTxt.length !== bDigits) return null;

      const a = Number(aTxt);
      const b = Number(bTxt);
      if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
      if (a <= b) return null;
      if (hasBorrowing(a, b) !== requireBorrowing) return null;

      return { a, b };
    }

    function parseCustomList(raw, aDigits, bDigits, requireBorrowing) {
      return String(raw || "")
        .split(/[\n,;]+/)
        .map(function (chunk) { return chunk.trim(); })
        .filter(Boolean)
        .map(function (chunk) {
          return parseOneProblem(chunk, aDigits, bDigits, requireBorrowing);
        })
        .filter(Boolean);
    }

    function randomSubtractionProblem(aDigits, bDigits, requireBorrowing) {
      while (true) {
        const a = randomWithDigits(aDigits);
        const b = randomWithDigits(bDigits);
        if (a > b && hasBorrowing(a, b) === requireBorrowing) {
          return { a, b };
        }
      }
    }

    function buildProblems(aDigits, bDigits, mode, customRaw, requireBorrowing, problemsPerPage) {
      const problems = [];
      let warning = false;
      let message = "Generated random problems.";

      if (mode === "custom") {
        const custom = parseCustomList(customRaw, aDigits, bDigits, requireBorrowing);

        for (let i = 0; i < problemsPerPage; i += 1) {
          if (custom[i]) {
            problems.push(custom[i]);
          } else {
            problems.push(randomSubtractionProblem(aDigits, bDigits, requireBorrowing));
          }
        }

        if (custom.length === 0) {
          warning = true;
          message = "No valid custom problems for " +
            aDigits + "-" + bDigits + " digits " +
            (requireBorrowing ? "with borrowing" : "without borrowing") +
            " (minuend must be greater). Used random problems.";
        } else if (custom.length < problemsPerPage) {
          warning = true;
          message = "Used " + custom.length + " custom problem(s), filled the rest with random.";
        } else {
          message = "Generated custom problems.";
        }
      } else {
        for (let i = 0; i < problemsPerPage; i += 1) {
          problems.push(randomSubtractionProblem(aDigits, bDigits, requireBorrowing));
        }
      }

      return { problems: problems, message: message, warning: warning };
    }

    function getLayoutConfig(totalCols) {
      const problemsPerRow = totalCols <= 4 ? 3 : 2;
      const problemsPerPage = problemsPerRow * ROWS_PER_PAGE;
      return {
        problemsPerRow: problemsPerRow,
        problemsPerPage: problemsPerPage,
        layoutLabel: problemsPerPage + " problems per page (" + ROWS_PER_PAGE + " rows x " + problemsPerRow + ")"
      };
    }

    function cellStyleByColumn(colIndex, totalCols, colorOn) {
      if (!colorOn) return "";
      if (colIndex === 0) return "background:#fff;";
      const placeFromRight = totalCols - 1 - colIndex;
      const color = PLACE_COLORS[placeFromRight % PLACE_COLORS.length];
      return "background:" + color + ";";
    }

    function numberToDigits(num, digits) {
      return String(num).padStart(digits, "0").split("");
    }

    function alignedDigitRow(totalCols, number, digits, scaffoldOn) {
      const row = new Array(totalCols).fill("");
      if (!scaffoldOn) return row;

      const vals = numberToDigits(number, digits);
      const start = totalCols - digits;
      for (let i = 0; i < vals.length; i += 1) {
        row[start + i] = vals[i];
      }

      return row;
    }

    function rowCellsWithValues(totalCols, colorOn, values) {
      const cells = [];
      for (let i = 0; i < totalCols; i += 1) {
        const value = values && values[i] !== "" && values[i] !== undefined ? values[i] : "&nbsp;";
        cells.push('<div class="digit-cell" style="' + cellStyleByColumn(i, totalCols, colorOn) + '">' + value + "</div>");
      }
      return cells.join("");
    }

    function problemLetter(index) {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (index < letters.length) return letters[index];
      return "A" + (index - letters.length + 1);
    }

    function problemHtml(problem, index, totalCols, showEq, colorOn, scaffoldOn, aDigits, bDigits) {
      const letter = problemLetter(index);
      const headHtml = showEq
        ? '<div class="problem-head"><span class="problem-badge">' + letter + '</span><span class="problem-dot">.</span><span class="problem-text">' + problem.a + " - " + problem.b + "</span></div>"
        : '<div class="problem-head blank"><span class="problem-badge">' + letter + '</span><span class="problem-dot">.</span><span class="problem-text">____ - ____</span></div>';

      const rowTemplate = "grid-template-columns: var(--op-width) repeat(" + totalCols + ", var(--cell-size));";
      const lineTemplate = "grid-template-columns: var(--op-width) calc(" + totalCols + " * var(--cell-size) + " + (totalCols - 1) + " * var(--cell-gap));";
      const carryRow = new Array(totalCols).fill("");
      const aRow = alignedDigitRow(totalCols, problem.a, aDigits, scaffoldOn);
      const bRow = alignedDigitRow(totalCols, problem.b, bDigits, scaffoldOn);
      const sRow = new Array(totalCols).fill("");

      return (
        '<section class="problem-wrap">' +
          '<div class="problem-top">' + headHtml + "</div>" +
          '<div class="add-table">' +
            '<div class="table-row carry-row" style="' + rowTemplate + '">' +
              '<div class="op-cell">&nbsp;</div>' +
              rowCellsWithValues(totalCols, false, carryRow) +
            "</div>" +
            '<div class="table-row" style="' + rowTemplate + '">' +
              '<div class="op-cell">&nbsp;</div>' +
              rowCellsWithValues(totalCols, colorOn, aRow) +
            "</div>" +
            '<div class="table-row" style="' + rowTemplate + '">' +
              '<div class="op-cell">-</div>' +
              rowCellsWithValues(totalCols, colorOn, bRow) +
            "</div>" +
            '<div class="line-row" style="' + lineTemplate + '">' +
              '<div class="line-spacer"></div>' +
              '<div class="sum-line"></div>' +
            "</div>" +
            '<div class="table-row" style="' + rowTemplate + '">' +
              '<div class="op-cell">&nbsp;</div>' +
              rowCellsWithValues(totalCols, colorOn, sRow) +
            "</div>" +
          "</div>" +
        "</section>"
      );
    }

    function renderWorksheet() {
      const aDigits = Number(els.digitsA.value);
      const rawBDigits = Number(els.digitsB.value);
      const mode = els.problemMode.value;
      const colorOn = els.colorToggle.checked;
      const showEq = els.showProblemEq.checked;
      const scaffoldOn = els.scaffoldToggle.checked;
      const requireBorrowing = els.requireBorrowing.checked;
      const title = (els.sheetTitle.value || "").trim() || "Subtraction Graphic Organizer";
      const safeBDigits = Math.min(rawBDigits, aDigits);
      const totalCols = Math.max(aDigits, safeBDigits);
      const layout = getLayoutConfig(totalCols);
      const adjustedDigits = safeBDigits !== rawBDigits;

      if (adjustedDigits) {
        els.digitsB.value = String(safeBDigits);
      }

      const built = buildProblems(
        aDigits,
        safeBDigits,
        mode,
        els.customProblem.value,
        requireBorrowing,
        layout.problemsPerPage
      );
      const cfgLabel = aDigits + "-digit - " + safeBDigits + "-digit";

      els.statusText.textContent =
        built.message + " " +
        (requireBorrowing ? "Borrowing problems only." : "No borrowing problems.") +
        (adjustedDigits ? " Subtrahend digits adjusted to " + safeBDigits + " so top number stays larger." : "") +
        " Layout: " + layout.layoutLabel + " (" + cfgLabel + ").";
      els.statusText.style.color = built.warning ? "#a33a3a" : "#5a677f";
      els.customProblem.placeholder =
        "Example: " +
        "8".repeat(aDigits) + "-" + "7".repeat(safeBDigits) + ", " +
        "6".repeat(aDigits) + "-" + "5".repeat(safeBDigits) + ", " +
        "4".repeat(aDigits) + "-" + "3".repeat(safeBDigits);

      els.host.innerHTML =
        '<section class="sheet layout-' + layout.problemsPerPage + (colorOn ? '"' : ' no-color"') + ">" +
          '<header class="sheet-header">' +
            '<h2 class="sheet-title">' + title + "</h2>" +
            '<div class="name-line">Name:<span class="line"></span></div>' +
          "</header>" +
          '<div class="problems" style="grid-template-columns: repeat(' + layout.problemsPerRow + ', minmax(0, 1fr));">' +
            built.problems.map(function (problem, index) {
              return problemHtml(problem, index, totalCols, showEq, colorOn, scaffoldOn, aDigits, safeBDigits);
            }).join("") +
          "</div>" +
          '<div class="footer-note">' +
            (scaffoldOn
              ? "Scaffold organizer: minuend and subtrahend digits are prefilled in the table boxes."
              : "Advanced organizer: students place digits, borrow, and solve in the blank table.") +
            " " +
            (requireBorrowing ? "Borrowing-problem set." : "No-borrowing problem set.") +
          "</div>" +
        "</section>";
    }

    els.generateBtn.addEventListener("click", renderWorksheet);
    els.printBtn.addEventListener("click", function () {
      window.print();
    });
    renderWorksheet();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSubtractionGraphicOrganizer);
  } else {
    initSubtractionGraphicOrganizer();
  }
})();
