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
    if (c === "au" || c === "aw") return "variant_aw";
    return c;
  }

  function chunkEqual(a, b) {
    return normalizeChunk(a) === normalizeChunk(b);
  }

  function arraysEqual(a, b) {
    return a.length === b.length && a.every((v, i) => chunkEqual(v, b[i]));
  }

  function getChangedChunkIndex(prevWord, word, prevPat, pat) {
    if (!prevWord) return -1;
    const A = splitByPattern(prevWord, prevPat);
    const B = splitByPattern(word, pat);

    if (A.length === B.length) {
      let idx = -1;
      for (let i = 0; i < A.length; i++) {
        if (!chunkEqual(A[i], B[i])) {
          if (idx !== -1) return -1;
          idx = i;
        }
      }
      return idx;
    }

    if (B.length === A.length + 1) {
      for (let i = 0; i < B.length; i++) {
        const test = B.slice(0, i).concat(B.slice(i + 1));
        if (arraysEqual(A, test)) return i;
      }
      return -1;
    }

    if (A.length === B.length + 1) {
      for (let i = 0; i < A.length; i++) {
        const test = A.slice(0, i).concat(A.slice(i + 1));
        if (arraysEqual(B, test)) return i;
      }
      return -1;
    }

    return -1;
  }

  function getHint(prevWord, word, prevPat, pat) {
    if (!prevWord) return "";
    const A = splitByPattern(prevWord, prevPat);
    const B = splitByPattern(word, pat);
    const eq = (x, y) => x.length === y.length && x.every((v, i) => v === y[i]);

    if (A.length === B.length) {
      let idx = -1;
      for (let i = 0; i < A.length; i++) {
        if (!chunkEqual(A[i], B[i])) {
          if (idx !== -1) return "? → ?";
          idx = i;
        }
      }
      if (idx === -1) return "? → ?";
      const a = A[idx];
      const b = B[idx];

      if (b.length === a.length + 1 && (b.startsWith(a) || b.endsWith(a))) {
        const add = b.startsWith(a) ? b.slice(-1) : b.slice(0, b.length - a.length);
        const micro = b.startsWith(a) ? `${a} → ${a}<b>${add}</b>` : `${a} → <b>${add}</b>${a}`;
        return `+ ${add} <span style="font-size:16px;opacity:.8;margin-left:8px;">${micro}</span>`;
      }
      if (a.length === b.length + 1 && (a.startsWith(b) || a.endsWith(b))) {
        const rem = a.startsWith(b) ? a.slice(-1) : a.slice(0, a.length - b.length);
        const micro = a.startsWith(b) ? `${a.slice(0, -1)}<b>${rem}</b> → ${b}` : `<b>${rem}</b>${a.slice(1)} → ${b}`;
        return `- ${rem} <span style="font-size:16px;opacity:.8;margin-left:8px;">${micro}</span>`;
      }
      return `${a} → ${b}`;
    }

    if (B.length === A.length + 1) {
      for (let k = 0; k < B.length; k++) {
        const test = B.slice(0, k).concat(B.slice(k + 1));
        if (eq(A, test)) return `+ ${B[k]}`;
      }
      return "? → ?";
    }

    if (A.length === B.length + 1) {
      for (let k = 0; k < A.length; k++) {
        const test = A.slice(0, k).concat(A.slice(k + 1));
        if (eq(B, test)) return `- ${A[k]}`;
      }
      return "? → ?";
    }

    return "? → ?";
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
      const ladders = filterLaddersByBlendMode(rawLadders, blendMode);
      if (!ladders.length) {
        alert("No ladders available for this set with current pictured words.");
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
          const changedIdx = boldChanged ? getChangedChunkIndex(prev, word, prevP, patt) : -1;
          if (changedIdx === -1) {
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
                 ${getHint(prev, word, prevP, patt)}
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
