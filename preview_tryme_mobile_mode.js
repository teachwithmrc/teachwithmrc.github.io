(function () {
  const fileName = (window.location.pathname.split('/').pop() || '').toLowerCase();
  const isRollReadModelFrame = fileName === 'rollreadpreview-frame.html';

  const STEP_OVERRIDES = {
    'partialproducts-generator-preview-frame.html': [
      'Step 1: Select Problem Type (2x1 digit, 3x1 digit, etc.)',
      'Step 2: Customize Your Scaffold',
      'Step 3: Tap Try Me! and generate as much as you need'
    ],
    'rollreadpreview-frame.html': [
      'Step 1: Select or Combine Over 40 Phonics Skills (example: FLSZ)',
      'Step 2: Customize Your List',
      'Step 3: Tap Try Me! and generate as much as you need'
    ],
    'mathrollread-preview-frame.html': [
      'Step 1: Select Math Skill Focus',
      'Step 2: Customize Your Practice Type',
      'Step 3: Tap Try Me!'
    ],
    'mathtictac-preview-frame.html': [
      'Step 1: Select Math Skill Focus',
      'Step 2: Choose Grid Content',
      'Step 3: Tap Try Me!'
    ],
    'tictacpreview-frame.html': [
      'Step 1: Select Reading Skill Focus',
      'Step 2: Choose Grid Content',
      'Step 3: Tap Try Me!'
    ]
  };

  function getSteps() {
    if (STEP_OVERRIDES[fileName]) return STEP_OVERRIDES[fileName];

    if (fileName.indexOf('rollread') >= 0 || fileName.indexOf('tictac') >= 0 || fileName.indexOf('word') >= 0 || fileName.indexOf('fluency') >= 0) {
      return [
        'Step 1: Select Your Skill Focus',
        'Step 2: Customize Your List',
        'Step 3: Tap Try Me!'
      ];
    }

    return [
      'Step 1: Select Problem Type',
      'Step 2: Customize Your Scaffold',
      'Step 3: Tap Try Me!'
    ];
  }

  function injectHostStyle() {
    if (document.getElementById('is-tryme-host-style')) return;

    const style = document.createElement('style');
    style.id = 'is-tryme-host-style';
    style.textContent = [
      '@media (max-width: 900px) {',
      '  html, body { height: 100%; }',
      '  .preview-host, .preview-shell, .preview-wrapper, .preview-content {',
      '    height: 100dvh !important;',
      '    min-height: 100dvh !important;',
      '    max-height: 100dvh !important;',
      '  }',
      '  iframe, #generatorFrame, #liveFrame, .generator-frame {',
      '    height: 100% !important;',
      '    min-height: 100dvh !important;',
      '  }',
      isRollReadModelFrame ? '  .preview-host { border: 0 !important; }' : '',
      isRollReadModelFrame ? '  .preview-watermark, .preview-shade, .preview-paywall { display: none !important; }' : '',
      '}',
    ].join('\n');

    document.head.appendChild(style);
  }

  function injectDocStyle(doc) {
    if (!doc || !doc.head || doc.getElementById('is-tryme-doc-style')) return;

    const style = doc.createElement('style');
    style.id = 'is-tryme-doc-style';
    style.textContent = [
      '.is-tryme-steps {',
      '  border: 1px solid #cfe0ef !important;',
      '  background: #f8fcff !important;',
      '  border-radius: 14px !important;',
      '  padding: 12px !important;',
      '  margin: 8px auto 12px !important;',
      '  max-width: 980px !important;',
      '  font-family: Poppins, system-ui, sans-serif !important;',
      '}',
      '.is-tryme-steps h3 {',
      '  margin: 0 0 8px !important;',
      '  font-size: 18px !important;',
      '  line-height: 1.1 !important;',
      '  font-weight: 900 !important;',
      '  color: #143a60 !important;',
      '}',
      '.is-tryme-steps ul {',
      '  margin: 0 !important;',
      '  padding: 0 0 0 18px !important;',
      '}',
      '.is-tryme-steps li {',
      '  margin: 0 0 6px !important;',
      '  color: #2d527a !important;',
      '  font-size: 13px !important;',
      '  font-weight: 700 !important;',
      '}',
      '.is-tryme-action-wrap {',
      '  display: flex !important;',
      '  justify-content: center !important;',
      '  margin: 6px auto 10px !important;',
      '}',
      '.is-tryme-generate {',
      '  min-width: 240px !important;',
      '  min-height: 70px !important;',
      '  border-radius: 999px !important;',
      '  border-width: 4px !important;',
      '  font-size: 1.75rem !important;',
      '  font-weight: 900 !important;',
      '  letter-spacing: 0.01em !important;',
      '  padding: 12px 28px !important;',
      '}',
      '.is-tryme-preview-scroll {',
      '  max-height: calc(100dvh - 250px) !important;',
      '  overflow: auto !important;',
      '  width: 100% !important;',
      '  display: block !important;',
      '}',
      '.is-tryme-fit-target {',
      '  transform-origin: top center !important;',
      '}',
      '.is-tryme-preview-scroll img,',
      '.is-tryme-preview-scroll canvas,',
      '.is-tryme-preview-scroll svg,',
      '.is-tryme-preview-scroll iframe,',
      '.is-tryme-preview-scroll object,',
      '.is-tryme-preview-scroll embed {',
      '  max-width: 100% !important;',
      '  height: auto !important;',
      '}',
      '.is-tryme-preview-scroll table {',
      '  max-width: 100% !important;',
      '}',
      '@media (max-width: 900px) {',
      '  .is-tryme-generate {',
      '    min-height: 80px !important;',
      '    min-width: min(94vw, 320px) !important;',
      '    font-size: 2.05rem !important;',
      '  }',
      '  .is-tryme-preview-scroll {',
      '    max-height: calc(100dvh - 230px) !important;',
      '  }',
      '}',
    ].join('\n');

    doc.head.appendChild(style);
  }

  function findGenerateButton(doc) {
    const selectors = [
      '#btnGenerate',
      '#generateBtn',
      '.toolbar .primary',
      '.button-row .primary',
      '.controls-row .primary',
      'button.primary',
      'button[id*="Generate"]',
      'button[id*="generate"]',
    ];

    for (const selector of selectors) {
      const btn = doc.querySelector(selector);
      if (!btn) continue;
      const txt = (btn.textContent || '').toLowerCase();
      if (txt.indexOf('generate') >= 0 || txt.indexOf('try me') >= 0 || btn.id === 'btnGenerate' || btn.id === 'generateBtn') {
        return btn;
      }
    }

    const allButtons = Array.from(doc.querySelectorAll('button'));
    return allButtons.find((btn) => /generate/i.test(btn.textContent || '')) || null;
  }

  function getPreviewRoots(doc) {
    const selectors = [
      '#worksheetHost',
      '#output',
      '.preview-output',
      '.sheet-host',
      '#preview',
      '#worksheetWrap',
      '.worksheet-wrap',
      '.worksheet-host',
      '.print-sheet',
      '.page-preview',
      '#renderHost',
    ];
    const roots = [];
    selectors.forEach((selector) => {
      doc.querySelectorAll(selector).forEach((el) => roots.push(el));
    });
    return roots;
  }

  function inPreview(roots, el) {
    if (!el || !roots.length) return false;
    return roots.some((root) => root === el || root.contains(el));
  }

  function hideCustomization(doc, generateBtn) {
    const previewRoots = getPreviewRoots(doc);
    const hideSelectors = [
      '#btnPrint', '#printBtn', '#btnResetScore', '#resetRollBtn', '#rollBtn',
      '#btnSameBoard', '#btnNewBoard', '#btnC4Reset', '#btnC4New', '#btnC4ResetRound',
      '.roll-controls', '.ttt-actions', '.view-actions',
      '.skill-block-grid', '.steps-2-3-row', '.chips-title', '.chips-wrap',
      '.picker-wrap', '.picker-buttons', '.picker-row', '.game-picker',
      '#blendOptions', '#contentOptions', '#operationRow', '#rollGridSizeRow',
      '.controls-grid', '.controls-row .field', '.field.is-hidden',
      '.option-grid', '.row .label', '.row .select-wrap'
    ];

    hideSelectors.forEach((selector) => {
      doc.querySelectorAll(selector).forEach((el) => {
        if (generateBtn && (el === generateBtn || el.contains(generateBtn))) return;
        if (inPreview(previewRoots, el)) return;
        el.style.setProperty('display', 'none', 'important');
      });
    });

    doc.querySelectorAll('.toolbar button, .button-row button, .controls-row button').forEach((btn) => {
      if (btn === generateBtn) return;
      if (inPreview(previewRoots, btn)) return;
      btn.style.setProperty('display', 'none', 'important');
    });

    const controlSelectors = [
      'select',
      'input',
      'textarea',
      'fieldset',
      'legend',
      '.option-box',
      '.skill-button',
      '.chip',
      '.chip-pill',
      '.toggle',
      '[class*="control"]',
      '[id*="control"]',
      '[class*="setting"]',
      '[id*="setting"]',
      '[class*="option"]',
      '[id*="option"]',
      '[class*="custom"]',
      '[id*="custom"]',
      '[class*="picker"]',
      '[id*="picker"]',
      '[class*="selector"]',
      '[id*="selector"]',
    ];

    doc.querySelectorAll(controlSelectors.join(',')).forEach((el) => {
      if (generateBtn && (el === generateBtn || el.contains(generateBtn) || generateBtn.contains(el))) return;
      if (el.closest('#isTryMeStepsPanel, #isTryMeActionWrap')) return;
      if (inPreview(previewRoots, el)) return;
      el.style.setProperty('display', 'none', 'important');
    });
  }

  function isRollReadModelDoc(doc) {
    const title = (doc && doc.title ? doc.title : '').toLowerCase();
    return isRollReadModelFrame || title.indexOf('reading roll and read printables') >= 0;
  }

  function setDisplay(doc, selectors, value) {
    selectors.forEach((selector) => {
      doc.querySelectorAll(selector).forEach((el) => {
        el.style.setProperty('display', value, 'important');
      });
    });
  }

  function hideSectionFor(doc, selector) {
    const el = doc.querySelector(selector);
    if (!el) return;
    const host = el.closest('.table-section') || el.closest('.row') || el;
    host.style.setProperty('display', 'none', 'important');
  }

  function injectRollReadMinimalStyle(doc) {
    if (!doc || !doc.head || doc.getElementById('is-rollread-minimal-style')) return;
    const style = doc.createElement('style');
    style.id = 'is-rollread-minimal-style';
    style.textContent = [
      'body.is-rollread-minimal .app {',
      '  max-width: 100% !important;',
      '}',
      'body.is-rollread-minimal h1,',
      'body.is-rollread-minimal .feature-badge,',
      'body.is-rollread-minimal .subtitle,',
      'body.is-rollread-minimal .sheet-title {',
      '  display: none !important;',
      '}',
      'body.is-rollread-minimal #controlsPanel,',
      'body.is-rollread-minimal .controls,',
      'body.is-rollread-minimal .table-section,',
      'body.is-rollread-minimal .steps-2-3-row,',
      'body.is-rollread-minimal .toolbar,',
      'body.is-rollread-minimal .row {',
      '  border: 0 !important;',
      '  background: transparent !important;',
      '  box-shadow: none !important;',
      '  padding: 0 !important;',
      '  margin: 0 !important;',
      '}',
      'body.is-rollread-minimal .is-tryme-steps {',
      '  border: 0 !important;',
      '  background: transparent !important;',
      '  box-shadow: none !important;',
      '  margin: 0 auto 6px !important;',
      '  padding: 0 !important;',
      '}',
      'body.is-rollread-minimal .is-tryme-steps h3 {',
      '  display: none !important;',
      '}',
      'body.is-rollread-minimal .is-tryme-steps ul {',
      '  list-style: none !important;',
      '  padding: 0 !important;',
      '  margin: 0 !important;',
      '  display: grid !important;',
      '  gap: 4px !important;',
      '  text-align: center !important;',
      '}',
      'body.is-rollread-minimal .is-tryme-steps li {',
      '  margin: 0 !important;',
      '  font-size: 14px !important;',
      '  font-weight: 800 !important;',
      '  color: #1f365f !important;',
      '}',
      'body.is-rollread-minimal .is-tryme-action-wrap {',
      '  margin: 6px auto 10px !important;',
      '}',
      'body.is-rollread-minimal #output {',
      '  margin-top: 8px !important;',
      '}',
      '@media (max-width: 900px) {',
      '  body.is-rollread-minimal .is-tryme-generate {',
      '    min-width: min(96vw, 340px) !important;',
      '  }',
      '}',
    ].join('\n');
    doc.head.appendChild(style);
  }

  function applyRollReadMinimal(doc) {
    if (!doc || !doc.body) return;
    doc.body.classList.add('is-rollread-minimal');
    injectRollReadMinimalStyle(doc);

    hideSectionFor(doc, '#blendOptions');
    hideSectionFor(doc, '#contentOptions');
    hideSectionFor(doc, '#rollGridSizeRow');
    setDisplay(doc, ['#btnPrint', '#btnResetScore', '#rollBtn', '#resetRollBtn', '.roll-controls'], 'none');

    ['.skill-block-grid', '.chips-wrap', '.chips-title', '.skill-block', '.skill-header', '.skill-button'].forEach((selector) => {
      doc.querySelectorAll(selector).forEach((el) => el.style.removeProperty('display'));
    });
  }

  function pickFitTarget(roots) {
    const selectors = [
      '.sheet',
      '#sheet',
      '.page',
      '.worksheet',
      '.worksheet-page',
      '.print-page',
      '.paper',
      '.preview-page',
    ];

    const candidates = [];
    roots.forEach((root) => {
      selectors.forEach((selector) => {
        root.querySelectorAll(selector).forEach((el) => candidates.push({ root, el }));
      });
    });

    if (!candidates.length) {
      roots.forEach((root) => {
        const first = root.firstElementChild;
        if (first) candidates.push({ root, el: first });
      });
    }

    if (!candidates.length) return null;

    let best = candidates[0];
    let bestArea = 0;
    candidates.forEach((entry) => {
      const w = Math.max(entry.el.scrollWidth || 0, entry.el.offsetWidth || 0, entry.el.getBoundingClientRect().width || 0);
      const h = Math.max(entry.el.scrollHeight || 0, entry.el.offsetHeight || 0, entry.el.getBoundingClientRect().height || 0);
      const area = w * h;
      if (area > bestArea) {
        best = entry;
        bestArea = area;
      }
    });

    return best;
  }

  function fitPreview(doc) {
    if (!doc || !doc.defaultView || !doc.body) return;

    const win = doc.defaultView;
    if (win.innerWidth > 900) return;

    const roots = getPreviewRoots(doc);
    if (!roots.length) return;

    const targetEntry = pickFitTarget(roots);
    if (!targetEntry || !targetEntry.el || !targetEntry.root) return;

    const root = targetEntry.root;
    const target = targetEntry.el;

    target.style.removeProperty('transform');
    target.style.removeProperty('width');
    target.style.removeProperty('max-width');
    target.style.removeProperty('margin');

    const naturalW = Math.max(target.scrollWidth || 0, target.offsetWidth || 0, target.getBoundingClientRect().width || 0);
    const naturalH = Math.max(target.scrollHeight || 0, target.offsetHeight || 0, target.getBoundingClientRect().height || 0);
    if (!naturalW || !naturalH) return;

    const availW = Math.max(220, Math.min((root.clientWidth || win.innerWidth) - 6, win.innerWidth - 6));
    const availH = Math.max(200, (root.clientHeight || Math.floor(win.innerHeight * 0.58)) - 6);

    let scale = Math.min(availW / naturalW, availH / naturalH, 1);
    if (!Number.isFinite(scale) || scale <= 0) scale = 1;

    const scaledH = Math.max(180, Math.ceil(naturalH * scale));

    root.style.setProperty('display', 'flex', 'important');
    root.style.setProperty('justify-content', 'center', 'important');
    root.style.setProperty('align-items', 'flex-start', 'important');
    root.style.setProperty('overflow', 'hidden', 'important');
    root.style.setProperty('height', `${scaledH}px`, 'important');
    root.style.setProperty('max-height', `${scaledH}px`, 'important');

    target.classList.add('is-tryme-fit-target');
    target.style.setProperty('width', `${Math.ceil(naturalW)}px`, 'important');
    target.style.setProperty('max-width', 'none', 'important');
    target.style.setProperty('margin', '0 auto', 'important');
    target.style.setProperty('transform', `scale(${scale})`, 'important');
  }

  function winSetTimeout(win, fn, delay) {
    if (win && typeof win.setTimeout === 'function') {
      win.setTimeout(fn, delay);
    } else {
      window.setTimeout(fn, delay);
    }
  }

  function scheduleFit(doc) {
    if (!doc || !doc.defaultView || !doc.body) return;

    [80, 220, 420, 850].forEach((delay) => {
      winSetTimeout(doc.defaultView, () => fitPreview(doc), delay);
    });

    if (doc.body.dataset.tryMeFitBound === '1') return;
    doc.body.dataset.tryMeFitBound = '1';

    const onResize = () => fitPreview(doc);
    doc.defaultView.addEventListener('resize', onResize);
    doc.defaultView.addEventListener('orientationchange', onResize);

    const roots = getPreviewRoots(doc);
    roots.forEach((root) => {
      const observer = new MutationObserver(() => fitPreview(doc));
      observer.observe(root, { childList: true, subtree: true });
    });
  }

  function ensureSteps(doc, steps, anchor) {
    let panel = doc.getElementById('isTryMeStepsPanel');
    if (!panel) {
      panel = doc.createElement('section');
      panel.id = 'isTryMeStepsPanel';
      panel.className = 'is-tryme-steps';
      panel.innerHTML = '<h3>Quick Steps</h3><ul></ul>';
    }

    const ul = panel.querySelector('ul');
    ul.innerHTML = '';
    steps.forEach((step) => {
      const li = doc.createElement('li');
      li.textContent = step;
      ul.appendChild(li);
    });

    const attachTo = anchor || doc.body.firstElementChild || doc.body;
    if (!panel.parentNode) {
      if (attachTo && attachTo.parentNode) {
        attachTo.parentNode.insertBefore(panel, attachTo);
      } else {
        doc.body.insertBefore(panel, doc.body.firstChild);
      }
    }
  }

  function ensureActionWrap(doc, btn) {
    if (!btn || btn.dataset.tryMeMoved === '1') return;

    let wrap = doc.getElementById('isTryMeActionWrap');
    if (!wrap) {
      wrap = doc.createElement('div');
      wrap.id = 'isTryMeActionWrap';
      wrap.className = 'is-tryme-action-wrap';
    }

    const anchor = doc.getElementById('isTryMeStepsPanel') || doc.body.firstElementChild;
    if (!wrap.parentNode && anchor && anchor.parentNode) {
      if (anchor.nextSibling) {
        anchor.parentNode.insertBefore(wrap, anchor.nextSibling);
      } else {
        anchor.parentNode.appendChild(wrap);
      }
    }

    if (btn.parentNode !== wrap) {
      wrap.appendChild(btn);
      btn.dataset.tryMeMoved = '1';
    }
  }

  function markPreviewArea(doc) {
    const target = doc.querySelector('#worksheetHost, #output, .preview-output, .sheet-host, #preview, #worksheetWrap, .worksheet-wrap, .worksheet-host, .print-sheet, .page-preview, #renderHost');
    if (target) target.classList.add('is-tryme-preview-scroll');
  }

  function applyTryMe(doc) {
    if (!doc || !doc.body) return;

    injectDocStyle(doc);

    const steps = getSteps();
    const btn = findGenerateButton(doc);
    ensureSteps(doc, steps, btn ? btn.closest('.controls-card, .table-section, .toolbar, .button-row') : null);

    if (!btn) {
      markPreviewArea(doc);
      scheduleFit(doc);
      return;
    }

    btn.textContent = 'Try Me!';
    btn.classList.add('is-tryme-generate');
    btn.setAttribute('aria-label', 'Try Me');

    ensureActionWrap(doc, btn);
    hideCustomization(doc, btn);
    markPreviewArea(doc);

    if (isRollReadModelDoc(doc)) {
      applyRollReadMinimal(doc);
    }

    scheduleFit(doc);

    if (doc.body.dataset.tryMeAutoClicked !== '1') {
      doc.body.dataset.tryMeAutoClicked = '1';
      winSetTimeout(doc.defaultView, () => {
        try { btn.click(); } catch (_) {}
      }, 120);
    }
  }

  function getFrame() {
    return document.getElementById('generatorFrame') || document.getElementById('liveFrame') || document.querySelector('iframe');
  }

  function run() {
    injectHostStyle();

    const frame = getFrame();
    if (!frame) {
      applyTryMe(document);
      return;
    }

    const applyToFrame = () => {
      try {
        const doc = frame.contentDocument || (frame.contentWindow && frame.contentWindow.document);
        applyTryMe(doc);
      } catch (_) {
        // Ignore cross-origin errors.
      }
    };

    frame.addEventListener('load', applyToFrame);
    window.setTimeout(applyToFrame, 180);
    window.setTimeout(applyToFrame, 700);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
