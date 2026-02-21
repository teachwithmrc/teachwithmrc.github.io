(function () {
  const DEFAULT_BANK = "Multisyllabic (All 6 Types)";
  const BANK_OPTIONS = [
    "Multisyllabic (Closed)",
    "Multisyllabic (Open)",
    "Multisyllabic (VCe)",
    "Multisyllabic (R-Controlled)",
    "Multisyllabic (Vowel Team)",
    "Multisyllabic (C-le)",
    "Multisyllabic Mixed",
    "Multisyllabic (All 6 Types)",
    "Phase 1 - Closed/Closed (Rabbit pattern)",
    "Phase 1 - Closed/Open (Tiger pattern)",
    "Phase 1 - Open/Closed",
    "Phase 1 - Open/Open",
    "Phase 2 - Closed/VCe",
    "Phase 2 - VCe/Closed",
    "Phase 3 - Closed/R",
    "Phase 3 - R/Closed",
    "Phase 4 - Closed/VT",
    "Phase 4 - VT/Closed",
    "Phase 5 - Closed/LE",
    "Phase Extras - Other Pair Patterns"
  ];

  // School-safe exclusions for K-6 worksheet output.
  const BLOCKED_WORDS = new Set([
    "agnostic",
    "assassinate",
    "assassin",
    "sex",
    "cock"
  ]);

  function normalizeWord(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .trim();
  }

  function hashText(text) {
    let h = 0;
    const value = String(text || "");
    for (let i = 0; i < value.length; i += 1) {
      h = ((h << 5) - h + value.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  }

  function shuffle(list) {
    const copy = Array.isArray(list) ? list.slice() : [];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function dedupeByWord(entries) {
    const out = [];
    const seen = new Set();

    (entries || []).forEach((entry) => {
      const key = normalizeWord(entry && entry.word);
      if (!key || seen.has(key)) return;
      seen.add(key);
      out.push(entry);
    });

    return out;
  }

  function isAllowedWord(entry) {
    const word = normalizeWord(entry && entry.word);
    if (!word) return false;
    if (BLOCKED_WORDS.has(word)) return false;
    return true;
  }

  function toWordEntry(raw) {
    if (!raw) return null;

    if (raw.word && Array.isArray(raw.syllables)) {
      return raw;
    }

    if (window.multisyllableTools && typeof window.multisyllableTools.toWordEntry === "function") {
      return window.multisyllableTools.toWordEntry(raw);
    }

    const word = normalizeWord(raw.word || raw);
    if (!word) return null;

    return {
      word,
      syllables: [word],
      syllableCount: 1,
      divisionRule: "other"
    };
  }

  function matchesSyllableCount(entry, requested) {
    if (!requested || requested === "all") return true;

    const count = Number(entry && entry.syllableCount);
    if (!Number.isFinite(count) || count <= 0) return false;

    if (requested === "4plus") return count >= 4;
    return count === Number(requested);
  }

  function matchesDivisionRule(entry, requested) {
    if (!requested || requested === "all") return true;
    return String(entry && entry.divisionRule || "other") === requested;
  }

  function sentenceForEntry(entry, index) {
    const word = entry.word;
    const syllableText = (entry.syllables || []).join("-");

    const templates = [
      `I can read ${word}.`,
      `Say each part in ${word}: ${syllableText}.`,
      `Clap the syllables in ${word}.`,
      `Read ${word} two times.`,
      `Trace and read ${word}.`,
      `Point to each syllable in ${word}.`,
      `Read ${word} with a clear voice.`,
      `Write ${word}, then read it.`
    ];

    const seed = hashText(word) + index;
    return templates[seed % templates.length];
  }

  function fillToSize(list, size) {
    const target = Math.max(0, Number(size) || 0);
    const pool = (list || []).filter(Boolean);
    if (!pool.length || !target) return [];

    const out = [];
    let bag = shuffle(pool);

    while (out.length < target) {
      if (!bag.length) bag = shuffle(pool);
      out.push(bag.shift());
    }

    return out.slice(0, target);
  }

  function getBanks() {
    if (!window.multisyllableTools || !window.multisyllableTools.banks) {
      return {};
    }
    return window.multisyllableTools.banks;
  }

  function resolveBankList(requested) {
    const wanted = Array.isArray(requested) ? requested.filter(Boolean) : [];
    if (!wanted.length) return [DEFAULT_BANK];
    return wanted.filter((key) => BANK_OPTIONS.includes(key));
  }

  function buildPools(options) {
    const cfg = options || {};
    const banks = getBanks();
    const bankKeys = resolveBankList(cfg.bankKeys);

    let entries = [];
    bankKeys.forEach((key) => {
      entries = entries.concat((banks[key] || []).map(toWordEntry).filter(Boolean));
    });

    entries = dedupeByWord(entries)
      .filter(isAllowedWord)
      .filter((entry) => matchesSyllableCount(entry, cfg.syllableCount || "2"))
      .filter((entry) => matchesDivisionRule(entry, cfg.divisionRule || "all"));

    const words = entries.map((entry) => entry.word);
    const sentences = entries.map((entry, index) => sentenceForEntry(entry, index));

    return {
      entries,
      words,
      sentences
    };
  }

  function buildPromptSet(options) {
    const cfg = options || {};
    const mode = cfg.mode || "words";
    const size = Number(cfg.size) || 9;
    const pools = buildPools(cfg);

    if (mode === "sentences") {
      return {
        ...pools,
        prompts: fillToSize(pools.sentences, size)
      };
    }

    if (mode === "both") {
      const wordsTarget = Math.ceil(size / 2);
      const sentenceTarget = Math.floor(size / 2);
      const mixed = fillToSize(pools.words, wordsTarget).concat(fillToSize(pools.sentences, sentenceTarget));
      return {
        ...pools,
        prompts: shuffle(mixed)
      };
    }

    return {
      ...pools,
      prompts: fillToSize(pools.words, size)
    };
  }

  window.multisyllabicContentTools = {
    BANK_OPTIONS,
    DEFAULT_BANK,
    buildPools,
    buildPromptSet
  };
})();
