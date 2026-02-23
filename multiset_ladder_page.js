(function () {
  function safeLower(w) {
    return (w || "").toLowerCase();
  }

  function splitByPattern(word, pattern) {
    const chunks = [];
    let i = 0;
    for (let j = 0; j < String(pattern || "").length; j++) {
      const d = String(pattern)[j];
      const len = d === "3" ? 3 : d === "2" ? 2 : 1;
      chunks.push(String(word || "").slice(i, i + len));
      i += len;
    }
    return chunks;
  }

  function normalizeChunk(chunk) {
    const c = String(chunk || "").toLowerCase();
    if (c === "igh" || c === "ie" || c === "y") return "long_i";
    if (c === "ai" || c === "ay" || c === "eigh") return "long_a";
    if (c === "ee" || c === "ea") return "long_e";
    if (c === "oa" || c === "oe") return "long_o";
    if (c === "ew" || c === "ue") return "long_u";
    if (c === "oi" || c === "oy") return "diph_oy";
    // Keep au/aw distinct so transitions like maul -> bawl count as two changes.
    return c;
  }

  function chunkEqual(a, b) {
    return normalizeChunk(a) === normalizeChunk(b);
  }

  function arraysEqual(a, b) {
    return a.length === b.length && a.every((v, i) => chunkEqual(v, b[i]));
  }

  function getStepChange(prevWord, word, prevPat, pat) {
    if (!prevWord) return null;
    const A = splitByPattern(prevWord, prevPat);
    const B = splitByPattern(word, pat);

    if (A.length === B.length) {
      const changed = [];
      for (let i = 0; i < A.length; i++) {
        if (!chunkEqual(A[i], B[i])) {
          changed.push(i);
        }
      }
      if (changed.length !== 1) return null;
      const idx = changed[0];
      const from = String(A[idx] || "");
      const to = String(B[idx] || "");

      if (to.length === from.length + 1 && (to.startsWith(from) || to.endsWith(from))) {
        const added = to.startsWith(from) ? to.slice(-1) : to.slice(0, to.length - from.length);
        const atEnd = to.startsWith(from);
        return { kind: "add_letter", index: idx, from, to, added, atEnd };
      }
      if (from.length === to.length + 1 && (from.startsWith(to) || from.endsWith(to))) {
        const removed = from.startsWith(to) ? from.slice(-1) : from.slice(0, from.length - to.length);
        const atEnd = from.startsWith(to);
        return { kind: "remove_letter", index: idx, from, to, removed, atEnd };
      }

      return { kind: "replace", index: idx, from, to };
    }

    if (B.length === A.length + 1) {
      for (let i = 0; i < B.length; i++) {
        const test = B.slice(0, i).concat(B.slice(i + 1));
        if (arraysEqual(A, test)) {
          return { kind: "add_chunk", index: i, from: "", to: String(B[i] || "") };
        }
      }
      return null;
    }

    if (A.length === B.length + 1) {
      for (let i = 0; i < A.length; i++) {
        const test = A.slice(0, i).concat(A.slice(i + 1));
        if (arraysEqual(B, test)) {
          return { kind: "remove_chunk", index: i, from: String(A[i] || ""), to: "" };
        }
      }
      return null;
    }

    return null;
  }

  function getHintFromStep(step, prevWord, word) {
    if (!step) return `${prevWord} → ${word}`;
    if (step.kind === "add_letter") {
      const micro = step.atEnd
        ? `${step.from} → ${step.from}<b>${step.added}</b>`
        : `${step.from} → <b>${step.added}</b>${step.from}`;
      return `+ ${step.added} <span style="font-size:16px;opacity:.8;margin-left:8px;">${micro}</span>`;
    }
    if (step.kind === "remove_letter") {
      const micro = step.atEnd
        ? `${step.from.slice(0, -1)}<b>${step.removed}</b> → ${step.to}`
        : `<b>${step.removed}</b>${step.from.slice(1)} → ${step.to}`;
      return `- ${step.removed} <span style="font-size:16px;opacity:.8;margin-left:8px;">${micro}</span>`;
    }
    if (step.kind === "add_chunk") return `+ ${step.to}`;
    if (step.kind === "remove_chunk") return `- ${step.from}`;
    if (step.kind === "replace") return `${step.from} → ${step.to}`;
    return `${prevWord} → ${word}`;
  }

  function isValidLadder(ladder, getPattern) {
    if (!Array.isArray(ladder) || ladder.length < 2) return false;
    for (let i = 1; i < ladder.length; i++) {
      const prev = ladder[i - 1] || "";
      const word = ladder[i] || "";
      const prevP = getPattern(prev);
      const patt = getPattern(word);
      if (!getStepChange(prev, word, prevP, patt)) return false;
    }
    return true;
  }

  function fallbackPattern(word) {
    return String(word || "").split("").map(() => "1").join("");
  }

  window.initMultiSetLadderPage = function initMultiSetLadderPage(options) {
    const data = options && options.data;
    if (!data || !Array.isArray(data.setOrder) || !data.setOrder.length) {
      alert("Missing ladder data.");
      return;
    }

    const selectionMode = (options && options.selectionMode === "multi") ? "multi" : "single";
    const useButtonMenu = Boolean((options && options.setControlStyle === "buttons") || selectionMode === "multi");
    const enableBlendModes = Boolean(options && options.enableBlendModes);
    const blendPattern = (options && options.blendPattern instanceof RegExp)
      ? options.blendPattern
      : /^(bl|br|cl|cr|dr|fl|fr|gl|gr|pl|pr|sc|sk|sl|sm|sn|sp|st|sw|tr|tw|spr|str|scr|spl|shr|thr)/i;
    const defaultSet = data.setOrder[0];
    const state = {
      currentSet: defaultSet,
      selectedSets: new Set([defaultSet])
    };

    const pageTitle = document.getElementById("pageTitle");
    const pageSubtitle = document.getElementById("pageSubtitle");
    const setButtons = document.getElementById("setButtons");
    const ladderOutput = document.getElementById("ladderOutput");
    const generateBtn = document.getElementById("generateBtn");
    const printBtn = document.getElementById("printBtn");

    const resolvedTitle = (options && options.title) || data.title;
    const resolvedSubtitle = (options && options.subtitle) || data.subtitle;
    if (pageTitle && resolvedTitle) pageTitle.textContent = resolvedTitle;
    if (pageSubtitle && resolvedSubtitle) pageSubtitle.textContent = resolvedSubtitle;

    function getSelectedSetIds() {
      if (selectionMode === "multi") {
        const ids = Array.from(state.selectedSets).filter((setId) => data.setOrder.includes(setId));
        return ids.length ? ids : [defaultSet];
      }
      return [state.currentSet];
    }

    function renderSetButtons() {
      if (!setButtons) return;
      setButtons.innerHTML = "";

      if (useButtonMenu) {
        data.setOrder.forEach((setId) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "set-chip";

          const isActive = (selectionMode === "multi")
            ? state.selectedSets.has(setId)
            : state.currentSet === setId;
          if (isActive) btn.classList.add("active");

          btn.textContent = (data.setLabels && data.setLabels[setId]) || setId;
          btn.setAttribute("aria-pressed", String(isActive));
          btn.addEventListener("click", function () {
            if (selectionMode === "multi") {
              if (state.selectedSets.has(setId)) {
                if (state.selectedSets.size === 1) return;
                state.selectedSets.delete(setId);
              } else {
                state.selectedSets.add(setId);
              }
            } else {
              state.currentSet = setId;
            }
            renderSetButtons();
          });

          setButtons.appendChild(btn);
        });
        return;
      }

      data.setOrder.forEach((setId) => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "setMode";
        input.value = setId;
        input.checked = state.currentSet === setId;
        input.addEventListener("change", function () {
          state.currentSet = setId;
          renderSetButtons();
        });
        label.appendChild(input);
        label.appendChild(document.createTextNode(" " + ((data.setLabels && data.setLabels[setId]) || setId)));
        setButtons.appendChild(label);
      });
    }

    function getPattern(word) {
      const key = safeLower(word);
      return (data.wordPatterns && data.wordPatterns[key]) || fallbackPattern(word);
    }

    function getImage(word) {
      const key = safeLower(word);
      return (data.wordImages && data.wordImages[key]) || `images/${key}.png`;
    }

    function getBlendMode() {
      if (!enableBlendModes) return "Include Blends";
      return document.querySelector('input[name="ladderMode"]:checked')?.value || "No Blends";
    }

    function looksBlendWord(word) {
      return blendPattern.test(String(word || "").toLowerCase());
    }

    function filterLaddersByBlendMode(allLadders, mode) {
      if (!enableBlendModes) return allLadders;
      if (mode === "Only Blends") {
        return allLadders.filter((ladder) => Array.isArray(ladder) && ladder.every(looksBlendWord));
      }
      if (mode === "Include Blends") {
        return allLadders.filter((ladder) => Array.isArray(ladder) && ladder.some(looksBlendWord));
      }
      return allLadders.filter((ladder) => Array.isArray(ladder) && ladder.every((word) => !looksBlendWord(word)));
    }

    function generateLadder() {
      const selectedSetIds = getSelectedSetIds();
      const blendMode = getBlendMode();
      const rawLadders = selectedSetIds.flatMap((setId) => (data.ladders && data.ladders[setId]) || []);
      const ladders = filterLaddersByBlendMode(rawLadders, blendMode)
        .filter((ladder) => isValidLadder(ladder, getPattern));
      if (!ladders.length) {
        alert("No valid one-change ladders available for this set with current pictured words.");
        return;
      }

      const cellStyle = document.querySelector('input[name="cellStyle"]:checked')?.value || "elkonin";
      const useFont = (cellStyle === "underlines") ? "UnderlineFont" : "BoxesFont";
      const boldChanged = document.getElementById("boldChanged")?.checked ?? true;

      const ladder = ladders[Math.floor(Math.random() * ladders.length)];

      const rows = ladder.map((word, i) => {
        const first = (i === 0);
        const last = (i === ladder.length - 1);
        const prev = ladder[i - 1] || "";

        const patt = getPattern(word);
        const prevP = getPattern(prev);
        const imgSrc = getImage(word);
        const resolvedImgSrc = window.ladderImageFallback
          ? window.ladderImageFallback.ensureSrc(imgSrc, word)
          : imgSrc;

        let patternHTML = "";
        if (!first) {
          const step = getStepChange(prev, word, prevP, patt);
          const changedIdx = (boldChanged && step) ? step.index : -1;
          if (changedIdx < 0) {
            patternHTML = patt;
          } else {
            let out = "";
            for (let j = 0; j < patt.length; j++) {
              const ch = patt[j];
              out += (j === changedIdx) ? `<span style="font-weight:700;">${ch}</span>` : ch;
            }
            patternHTML = out;
          }
        }

        const display = first
          ? `<div style="font-size:32px;font-weight:600;letter-spacing:2px;font-family:'Poppins',sans-serif;">${word}</div>`
          : `<div class="pattern" style="font-family:'${useFont}',monospace;font-size:${useFont === 'UnderlineFont' ? '85px' : '100px'};letter-spacing:0;">${patternHTML}</div>`;

        const imgTD = `<td style="padding:5px 7px;width:140px;">
                         <img src="${resolvedImgSrc}" alt="${word}" data-word="${word}" onerror="window.ladderImageFallback && window.ladderImageFallback.handleError(this,this.dataset.word)" style="width:110px;height:110px;object-fit:contain;">
                       </td>`;

        const borders = !last
          ? "border-bottom:4px solid #000;border-left:4px solid #000;border-right:4px solid #000;"
          : "border-left:4px solid #000;border-right:4px solid #000;";

        const wordTD = `<td style="padding:5px 7px;${borders}">${display}</td>`;

        const hintTD = first
          ? `<td style="padding:3px 5px;width:170px;"></td>`
          : `<td style="padding:3px 5px;width:170px;">
               <div style="display:flex;justify-content:center;align-items:center;background:#f0f0f0;border:3px solid #000;border-radius:12px;padding:6px 10px;font-size:22px;text-align:center;">
                 ${getHintFromStep(getStepChange(prev, word, prevP, patt), prev, word)}
               </div>
             </td>`;

        return `<tr>${imgTD}${wordTD}${hintTD}</tr>`;
      }).join("");

      const selectedSetLabels = selectedSetIds.map((setId) => (data.setLabels && data.setLabels[setId]) || setId);
      const headingTextBase = selectedSetIds.length === 1
        ? `${selectedSetLabels[0]} Word Ladder`
        : "Mixed Word Ladder";
      const modeSuffix = enableBlendModes
        ? (blendMode === "Include Blends")
          ? " — Include Blends"
          : (blendMode === "Only Blends")
            ? " — Only Blends"
            : " — No Blends"
        : "";
      const headingText = `${headingTextBase}${modeSuffix}`;
      const selectedSummary = selectedSetIds.length > 1
        ? `<p style="font-size:12px;margin:0 0 6px;"><strong>Sets:</strong> ${selectedSetLabels.join(" • ")}</p>`
        : "";
      const html = `
        <div style="display:flex;flex-direction:column;align-items:center;width:98%;margin:0 auto;">
          <div id="titleBlock" style="text-align:center;">
            <h2 style="font-size:24px;">${headingText}</h2>
            ${selectedSummary}
            <p style="font-size:12px;"><strong>Directions:</strong> Start at the top of the ladder and spell the correct words.</p>
          </div>
          <table style="border-collapse:collapse;margin:0 auto;width:100%;max-width:600px;">
            ${rows}
          </table>
          <br><br>
          <div id="copyright">Copyright - InterventionStation.com - @TeachwithMrC</div>
        </div>
      `;

      if (ladderOutput) ladderOutput.innerHTML = html;
    }

    generateBtn?.addEventListener("click", generateLadder);
    printBtn?.addEventListener("click", function () { window.print(); });

    renderSetButtons();
  };
})();
