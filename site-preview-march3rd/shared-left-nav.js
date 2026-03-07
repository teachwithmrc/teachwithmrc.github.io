(function () {
  const nav = document.querySelector('.is-home-sections .is-nav');
  if (!nav) return;

  const file = window.location.pathname.split('/').pop() || 'index.html';
  const section = getSection(file);

  injectStyles();
  nav.innerHTML = buildNav(section);

  function getSection(name) {
    const homeFiles = new Set([
      'home-preview.html',
      'home-preview-v2.html',
      'home-preview-v3.html',
      'home-preview-v4.html',
      'index.html'
    ]);
    const mathFiles = new Set([
      'scaffolded-math-preview.html',
      'placevalue-preview.html',
      'rounding-preview.html',
      'addition-preview.html',
      'multiplication-preview.html',
      'division-preview.html',
      'decimals-preview.html',
      'fractions-preview.html',
      'google-puzzle-preview.html',
      'math-riddle-preview.html'
    ]);
    const readingFiles = new Set([
      'sor-reading-preview.html',
      'heart-words-preview.html',
      'phonics-comics-preview.html',
      'fix-mixup-preview.html',
      'blending-slides-preview.html',
      'phonics-maze-preview.html',
      'pick-the-pic-preview.html',
      'hfw-pyramid-preview.html',
      'spelling-preview.html',
      'spelling-google-sheets-preview.html',
      'phonicspreview.html'
    ]);
    const gamesFiles = new Set([
      'interactive-games-preview.html',
      'readinggames-preview.html',
      'math-game-board-preview.html',
      'games-preview.html',
      'match-solve-memory-preview.html',
      'reading-game-board-preview.html',
      'ultimate_math_game_modes_preview.html',
      'ultimate_reading_game_modes_preview.html'
    ]);
    const songsFiles = new Set([
      'learning-songs-preview.html',
      'math-song-preview.html',
      'skip-counting-song-preview.html'
    ]);
    const insideFiles = new Set([
      'whats-inside-preview.html'
    ]);

    if (homeFiles.has(name)) return 'home';
    if (mathFiles.has(name)) return 'math';
    if (readingFiles.has(name)) return 'reading';
    if (gamesFiles.has(name)) return 'games';
    if (songsFiles.has(name)) return 'songs';
    if (insideFiles.has(name)) return 'inside';
    return 'generators';
  }

  function buildNav(active) {
    const currentLabel = {
      home: 'Home',
      generators: 'Generators',
      math: 'Scaffolded Math',
      reading: 'SOR Reading',
      games: 'Games',
      songs: 'Songs',
      inside: "What's Included"
    }[active];

    return `
      <nav class="is-nav-card">
        <div class="is-nav-group is-nav-home">
          <a class="is-nav-link ${active === 'home' ? 'is-active' : ''}" href="./home-preview.html">&#127968; Home</a>
        </div>
        <div class="is-nav-header">Browse</div>
        <div class="is-nav-group">
          ${link('Generators', './generators-preview.html', active === 'generators')}
          ${link('Scaffolded Math', './scaffolded-math-preview.html', active === 'math')}
          ${link('SOR Reading', './sor-reading-preview.html', active === 'reading')}
          ${link('Games', './interactive-games-preview.html', active === 'games')}
          ${link('Songs', './learning-songs-preview.html', active === 'songs')}
          ${link("What's Included", './whats-inside-preview.html', active === 'inside')}
          ${link('Join', './home-preview.html#join', false)}
        </div>
      </nav>
      <div class="is-side-stack">
        <section class="is-side-card" aria-label="Current section">
          <h3>You're Browsing ${currentLabel}</h3>
          <p>This page now uses the same shorter left navigation as the homepage so the whole preview library feels consistent.</p>
          <a class="is-side-btn" href="${sectionLanding(active)}">Back to ${currentLabel}</a>
        </section>
        <section class="is-side-card" aria-label="Library highlights">
          <h3>What Members Unlock</h3>
          <div class="is-side-stat-list">
            <div class="is-side-stat">
              <strong>19</strong>
              <span>Generators across math and SOR</span>
            </div>
            <div class="is-side-stat">
              <strong>48+</strong>
              <span>Scaffolded math resources</span>
            </div>
            <div class="is-side-stat">
              <strong>200+</strong>
              <span>SOR reading supports and practice pages</span>
            </div>
          </div>
        </section>
        <section class="is-side-card" aria-label="Quick links">
          <h3>Popular Paths</h3>
          <div class="is-side-links">
            <a class="is-side-link" href="./math-generators-preview.html">Browse Math Generators</a>
            <a class="is-side-link" href="./sor-generators-preview.html">Browse SOR Generators</a>
            <a class="is-side-link" href="./whats-inside-preview.html">See Full Inventory</a>
          </div>
        </section>
      </div>
    `;
  }

  function sectionLanding(active) {
    switch (active) {
      case 'home':
        return './home-preview.html';
      case 'math':
        return './scaffolded-math-preview.html';
      case 'reading':
        return './sor-reading-preview.html';
      case 'games':
        return './interactive-games-preview.html';
      case 'songs':
        return './learning-songs-preview.html';
      case 'inside':
        return './whats-inside-preview.html';
      default:
        return './generators-preview.html';
    }
  }

  function link(label, href, active) {
    return `<a class="is-nav-link ${active ? 'is-active' : ''}" href="${href}">${label}</a>`;
  }

  function injectStyles() {
    if (document.getElementById('shared-short-nav-styles')) return;
    const style = document.createElement('style');
    style.id = 'shared-short-nav-styles';
    style.textContent = `
      .is-home-sections .is-side-stack{
        display:grid;
        gap:12px;
        margin-top:12px;
      }
      .is-home-sections .is-side-card{
        background:#fff;
        border:1px solid #d7e5f3;
        border-radius:16px;
        padding:16px;
        box-shadow:0 10px 22px rgba(31,54,95,0.07);
      }
      .is-home-sections .is-side-card h3{
        margin:0 0 8px;
        font-size:19px;
        line-height:1.1;
        color:#0f2e52;
      }
      .is-home-sections .is-side-card p{
        margin:0 0 12px;
        font-size:13px;
        line-height:1.5;
        font-weight:600;
        color:#4f6689;
      }
      .is-home-sections .is-side-btn{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        min-height:42px;
        padding:0 16px;
        border-radius:999px;
        background:#6ec1ff;
        border:1px solid #5aaee9;
        color:#fff;
        font-size:14px;
        font-weight:900;
        text-decoration:none;
        white-space:nowrap;
      }
      .is-home-sections .is-side-stat-list{
        display:grid;
        gap:10px;
      }
      .is-home-sections .is-side-stat{
        border-radius:14px;
        padding:16px 14px;
        background:linear-gradient(145deg, #ffffff 0%, #eef7ff 100%);
        border:1px solid #d7e5f3;
        text-align:center;
        box-shadow:inset 0 1px 0 rgba(255,255,255,0.8);
      }
      .is-home-sections .is-side-stat strong{
        display:block;
        font-size:38px;
        line-height:.92;
        color:#0f2e52;
        margin-bottom:8px;
        font-weight:900;
        letter-spacing:-.04em;
      }
      .is-home-sections .is-side-stat span{
        display:block;
        font-size:12px;
        line-height:1.4;
        font-weight:700;
        color:#4f6689;
      }
      .is-home-sections .is-side-links{
        display:grid;
        gap:8px;
      }
      .is-home-sections .is-side-link{
        display:block;
        border-radius:12px;
        padding:11px 12px;
        background:#f7fbff;
        border:1px solid #d7e5f3;
        color:#1f365f;
        font-size:13px;
        font-weight:800;
        line-height:1.35;
        text-decoration:none;
      }
      .is-home-sections .is-side-link:hover{
        text-decoration:underline;
      }
    `;
    document.head.appendChild(style);
  }
})();
