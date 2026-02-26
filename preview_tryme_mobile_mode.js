(function () {
  const fileName = (window.location.pathname.split('/').pop() || '').toLowerCase();

  const STEP_OVERRIDES = {
    'partialproducts-generator-preview-frame.html': [
      'Step 1: Select Problem Type (2x1 digit, 3x1 digit, etc.)',
      'Step 2: Customize Your Scaffold',
      'Step 3: Tap Try Me!'
    ],
    'rollreadpreview-frame.html': [
      'Step 1: Select or Combine Over 40 Phonics Skills (example: FLSZ)',
      'Step 2: Customize Your List',
      'Step 3: Tap Try Me!'
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
      '}',
      '@media (max-width: 900px) {',
      '  .is-tryme-generate {',
      '    min-height: 80px !important;',
      '    min-width: min(94vw, 320px) !important;',
      '    font-size: 2.05rem !important;',
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

  function hideCustomization(doc, generateBtn) {
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
        el.style.setProperty('display', 'none', 'important');
      });
    });

    doc.querySelectorAll('.toolbar button, .button-row button, .controls-row button').forEach((btn) => {
      if (btn !== generateBtn) btn.style.setProperty('display', 'none', 'important');
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
    const target = doc.querySelector('#worksheetHost, #output, .preview-output, .sheet-host');
    if (target) target.classList.add('is-tryme-preview-scroll');
  }

  function applyTryMe(doc) {
    if (!doc || !doc.body) return;

    injectDocStyle(doc);

    const steps = getSteps();
    const btn = findGenerateButton(doc);
    ensureSteps(doc, steps, btn ? btn.closest('.controls-card, .table-section, .toolbar, .button-row') : null);

    if (!btn) return;

    btn.textContent = 'Try Me!';
    btn.classList.add('is-tryme-generate');
    btn.setAttribute('aria-label', 'Try Me');

    ensureActionWrap(doc, btn);
    hideCustomization(doc, btn);
    markPreviewArea(doc);

    if (doc.body.dataset.tryMeAutoClicked !== '1') {
      doc.body.dataset.tryMeAutoClicked = '1';
      window.setTimeout(() => {
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
