(function () {
  function safeLower(w) {
    return (w || "").toLowerCase();
  }

  function splitByPattern(word, pattern) {
    const chunks = [];
    let i = 0;
    const digits = String(pattern || "");
    for (let j = 0; j < digits.length; j++) {
      const d = digits[j];
      const len = d === "3" ? 3 : d === "2" ? 2 : 1;
      chunks.push(String(word || "").slice(i, i + len));
      i += len;
    }
    if (!chunks.length && word) return String(word).split("");
    return chunks;
  }

  function arraysEqual(a, b) {
    return a.length === b.length && a.every((v, i) => v === b[i]);
  }

  function getChangedChunkIndex(prevWord, word, prevPat, pat) {
    if (!prevWord) return -1;
    const A = splitByPattern(prevWord, prevPat);
    const B = splitByPattern(word, pat);

    if (A.length === B.length) {
      let idx = -1;
      for (let i = 0; i < A.length; i++) {
        if ((A[i] || "") !== (B[i] || "")) {
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
        if (A[i] !== B[i]) {
          if (idx !== -1) return "? -> ?";
          idx = i;
        }
      }
      if (idx === -1) return "? -> ?";
      const a = A[idx];
      const b = B[idx];

      if (b.length === a.length + 1 && (b.startsWith(a) || b.endsWith(a))) {
        const add = b.startsWith(a) ? b.slice(-1) : b.slice(0, b.length - a.length);
        return `+ ${add}`;
      }
      if (a.length === b.length + 1 && (a.startsWith(b) || a.endsWith(b))) {
        const rem = a.startsWith(b) ? a.slice(-1) : a.slice(0, a.length - b.length);
        return `- ${rem}`;
      }
      return `${a} -> ${b}`;
    }

    if (B.length === A.length + 1) {
      for (let k = 0; k < B.length; k++) {
        const test = B.slice(0, k).concat(B.slice(k + 1));
        if (eq(A, test)) return `+ ${B[k]}`;
      }
      return "? -> ?";
    }

    if (A.length === B.length + 1) {
      for (let k = 0; k < A.length; k++) {
        const test = A.slice(0, k).concat(A.slice(k + 1));
        if (eq(B, test)) return `- ${A[k]}`;
      }
      return "? -> ?";
    }

    return "? -> ?";
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

    const state = { currentSet: data.setOrder[0] };

    const pageTitle = document.getElementById("pageTitle");
    const pageSubtitle = document.getElementById("pageSubtitle");
    const setButtons = document.getElementById("setButtons");
    const activeSetLabel = document.getElementById("activeSetLabel");
    const ladderOutput = document.getElementById("ladderOutput");
    const generateBtn = document.getElementById("generateBtn");
    const printBtn = document.getElementById("printBtn");

    if (pageTitle && data.title) pageTitle.textContent = data.title;
    if (pageSubtitle && data.subtitle) pageSubtitle.textContent = data.subtitle;

    function renderSetButtons() {
      if (!setButtons) return;
      setButtons.innerHTML = "";
      data.setOrder.forEach((setId) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "chip" + (state.currentSet === setId ? " active" : "");
        btn.textContent = (data.setLabels && data.setLabels[setId]) || setId;
        btn.addEventListener("click", () => {
          state.currentSet = setId;
          renderSetButtons();
          renderActiveSetLabel();
        });
        setButtons.appendChild(btn);
      });
    }

    function renderActiveSetLabel() {
      if (!activeSetLabel) return;
      const label = (data.setLabels && data.setLabels[state.currentSet]) || state.currentSet;
      const counts = data.counts && data.counts[state.currentSet];
      if (counts) {
        activeSetLabel.textContent = `${label}: ${counts.words} words, ${counts.ladders} ladder combos`;
      } else {
        activeSetLabel.textContent = label;
      }
    }

    function getPattern(word) {
      const key = safeLower(word);
      return (data.wordPatterns && data.wordPatterns[key]) || fallbackPattern(word);
    }

    function getImage(word) {
      const key = safeLower(word);
      return (data.wordImages && data.wordImages[key]) || `images/${key}.png`;
    }

    function generateLadder() {
      const pools = (data.ladders && data.ladders[state.currentSet]) || [];
      if (!pools.length) {
        alert("No ladders available for this set yet.");
        return;
      }

      const cellStyle = document.querySelector('input[name="cellStyle"]:checked')?.value || "elkonin";
      const useFont = cellStyle === "underlines" ? "UnderlineFont" : "BoxesFont";
      const boldChanged = document.getElementById("boldChanged")?.checked ?? true;

      const ladder = pools[Math.floor(Math.random() * pools.length)];
      const cards = ladder.map((word, i) => {
        const first = i === 0;
        const last = i === ladder.length - 1;
        const prev = ladder[i - 1] || "";

        const patt = getPattern(word);
        const prevP = first ? "" : getPattern(prev);
        const imgSrc = getImage(word);
        const resolvedImgSrc = window.ladderImageFallback
          ? window.ladderImageFallback.ensureSrc(imgSrc, word)
          : imgSrc;

        let patternHTML = patt;
        if (!first && boldChanged) {
          const changedIdx = getChangedChunkIndex(prev, word, prevP, patt);
          if (changedIdx !== -1) {
            let out = "";
            for (let j = 0; j < patt.length; j++) {
              out += j === changedIdx ? `<span style="font-weight:700;">${patt[j]}</span>` : patt[j];
            }
            patternHTML = out;
          }
        }

        return `
          <div style="display:inline-block;vertical-align:top;width:220px;margin:10px;padding:10px 8px;border:2px solid #cfd7ef;background:#f6f9ff;border-radius:14px;">
            <h2 style="font-size:20px;margin:0 0 8px;color:#1f365f;">${first ? "Start Word" : (last ? "Finish Word" : "")}</h2>
            <img src="${resolvedImgSrc}" alt="${word}" style="width:110px;height:110px;object-fit:contain;border-radius:12px;background:#fff;border:1px solid #d7e1f5;"
                 onerror="window.ladderImageFallback && window.ladderImageFallback.handleError(this,'${word}')" />
            <div style="font-size:26px;font-weight:700;margin-top:6px;color:#1f365f;">${word}</div>
            <div style="font-size:16px;min-height:22px;color:#334d7a;margin:4px 0;">${first ? "&nbsp;" : getHint(prev, word, prevP, patt)}</div>
            <div class="pattern ${cellStyle === "underlines" ? "underlines" : ""}" style="font-family:${useFont};">${patternHTML}</div>
          </div>
        `;
      }).join("");

      if (ladderOutput) {
        ladderOutput.innerHTML = `
          <div style="margin:4px 0 10px;font-size:18px;font-weight:600;color:#1f365f;">
            ${((data.setLabels && data.setLabels[state.currentSet]) || state.currentSet)}
          </div>
          <div style="display:flex;flex-wrap:wrap;justify-content:center;">
            ${cards}
          </div>
          <div id="copyright" style="font-size:12px;text-align:right;width:100%;margin-top:14px;">(c) Intervention Station</div>
        `;
      }
    }

    generateBtn?.addEventListener("click", generateLadder);
    printBtn?.addEventListener("click", () => window.print());

    renderSetButtons();
    renderActiveSetLabel();
    generateLadder();
  };
})();
