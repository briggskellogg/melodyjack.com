/**
 * Archive notice — a one-time letter from the author shown
 * to anyone who visits melodyjack.com v0. The text explains
 * which pieces are AI-assisted, which are written cleanly,
 * which are fully personal — and that the project is closed.
 *
 * Self-contained: injects its own CSS, builds its own DOM,
 * handles its own state. Single localStorage key controls
 * dismissal across visits.
 *
 * UX:
 *   - First visit (no flag): the letter fades in 800 ms after
 *     the page settles.
 *   - Visitor dismisses (close button, backdrop, Escape) and
 *     localStorage remembers it forever.
 *   - A small "v0 · letter" tag stays pinned to the top-right
 *     of every page. Clicking it re-opens the letter on demand.
 */
(function () {
  if (window.__mjArchiveNotice) return;
  window.__mjArchiveNotice = true;

  var STORAGE_KEY = 'mj-archive-notice-v1';

  // ---------- 1. Inject CSS once ----------
  var STYLE = [
    '.mj-archive{position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:clamp(1rem,4dvh,2.5rem) clamp(1rem,4vw,2.5rem);overflow-y:auto;opacity:0;transition:opacity 420ms cubic-bezier(.2,.8,.2,1);font-family:"Fraunces","Times New Roman",serif}',
    '.mj-archive[hidden]{display:none}',
    '.mj-archive.is-open{opacity:1}',
    '.mj-archive__bd{position:absolute;inset:0;border:0;cursor:zoom-out;background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(20,12,30,.55) 0%,rgba(8,5,18,.85) 50%,rgba(4,3,10,.96) 100%);backdrop-filter:blur(10px) saturate(1.05);-webkit-backdrop-filter:blur(10px) saturate(1.05);opacity:0;transition:opacity 420ms cubic-bezier(.2,.8,.2,1)}',
    '.mj-archive.is-open .mj-archive__bd{opacity:1}',
    '.mj-archive__card{position:relative;z-index:1;width:min(640px,100%);max-height:calc(100dvh - clamp(2rem,8dvh,5rem));overflow-y:auto;background:radial-gradient(ellipse 80% 60% at 30% 20%,#fff7e0 0%,transparent 60%),linear-gradient(180deg,#fbeec4 0%,#efd9a3 100%);color:#2c1c08;border:1px solid rgba(122,80,24,.32);border-radius:14px;padding:clamp(2rem,4vw,2.6rem) clamp(1.6rem,4vw,2.4rem) clamp(1.6rem,3vw,2.2rem);box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 60px 100px -40px rgba(0,0,0,.7),0 0 0 1px rgba(0,0,0,.12);transform:translateY(18px) scale(.96);opacity:0;transition:transform 520ms cubic-bezier(.16,.84,.24,1.02),opacity 320ms cubic-bezier(.4,0,.2,1);isolation:isolate}',
    '.mj-archive.is-open .mj-archive__card{transform:translateY(0) scale(1);opacity:1}',
    '.mj-archive__card::before{content:"";position:absolute;inset:0;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'1.05\' numOctaves=\'2\' stitchTiles=\'stitch\'/><feColorMatrix values=\'0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.42 0\'/></filter><rect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/></svg>");mix-blend-mode:multiply;opacity:.10;border-radius:inherit}',
    '.mj-archive__seal{position:absolute;top:-22px;right:clamp(20px,4vw,36px);z-index:5;line-height:0;pointer-events:none;transform:rotate(8deg);filter:drop-shadow(0 6px 12px rgba(0,0,0,.45)) drop-shadow(0 0 22px rgba(255,200,150,.32))}',
    '.mj-archive__seal svg{display:block;width:62px;height:62px}',
    '.mj-archive__close{position:absolute;top:clamp(.75rem,2vw,1rem);right:clamp(.75rem,2vw,1rem);z-index:6;width:30px;height:30px;border-radius:50%;border:1px solid rgba(122,80,24,.32);background:rgba(255,255,255,.55);color:rgba(44,28,8,.62);cursor:pointer;display:grid;place-items:center;transition:color 220ms ease,border-color 220ms ease,background 220ms ease,transform 220ms ease;font:inherit;padding:0}',
    '.mj-archive__close:hover,.mj-archive__close:focus-visible{color:#7d4326;border-color:#7d4326;background:rgba(255,255,255,.9);transform:rotate(90deg);outline:none}',
    '.mj-archive__head{margin:0 0 1.25rem;padding-right:clamp(60px,12vw,90px)}',
    '.mj-archive__eb{margin:0 0 .4rem;font-family:"Inter",-apple-system,system-ui,sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.32em;text-transform:uppercase;color:rgba(125,67,38,.85)}',
    '.mj-archive__title{margin:0;font-family:"Fraunces","Times New Roman",serif;font-weight:500;font-size:clamp(1.75rem,1.5vw + 1.2rem,2.4rem);line-height:1.1;letter-spacing:-.018em;color:#2c1c08}',
    '.mj-archive__title em{font-style:italic;color:#7d4326;margin-left:.15em}',
    '.mj-archive__body{font-family:"Fraunces","Times New Roman",serif;font-size:clamp(.95rem,.4vw + .82rem,1.05rem);line-height:1.7;color:#2c1c08}',
    '.mj-archive__body p{margin:0 0 1em}',
    '.mj-archive__body p:last-child{margin-bottom:0}',
    '.mj-archive__body em{font-style:italic;color:#5a3210;font-weight:500}',
    '.mj-archive__body p:first-child::first-letter{font-family:"Fraunces","Times New Roman",serif;font-weight:600;font-size:3.2em;line-height:.85;float:left;padding:.05em .14em 0 0;color:#7d4326}',
    '.mj-archive__foot{margin-top:1.5rem;display:grid;gap:.85rem;justify-items:end}',
    '.mj-archive__rule{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(122,80,24,.28) 25%,rgba(122,80,24,.28) 75%,transparent)}',
    '.mj-archive__sign{margin:0;font-family:"Fraunces","Times New Roman",serif;font-style:italic;font-weight:500;font-size:clamp(1.1rem,.5vw + .95rem,1.35rem);color:#7d4326;text-align:right}',
    '.mj-archive__cta{margin-top:.5rem;padding:.55em 1.1em;border:1px solid rgba(122,80,24,.45);border-radius:999px;background:rgba(255,255,255,.55);color:#5a3210;font-family:"Inter",-apple-system,system-ui,sans-serif;font-size:.66rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;cursor:pointer;transition:color 220ms ease,border-color 220ms ease,background 220ms ease,transform 220ms ease}',
    '.mj-archive__cta:hover,.mj-archive__cta:focus-visible{color:#fff7e0;border-color:#7d4326;background:#7d4326;transform:translateY(-1px);outline:none}',
    'body.mj-archive-locked{overflow:hidden}',
    /* corner tag */
    '.mj-archive-tag{position:fixed;top:clamp(1rem,2.5dvh,1.6rem);right:clamp(1rem,2.5vw,1.6rem);z-index:40;display:inline-flex;align-items:center;gap:.5em;padding:.42em .85em;border-radius:999px;background:rgba(8,6,14,.45);border:1px solid rgba(201,126,85,.45);color:#f3ece1;font-family:"Inter",-apple-system,system-ui,sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;cursor:pointer;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);transition:color 220ms ease,background 220ms ease,border-color 220ms ease,transform 220ms ease}',
    '.mj-archive-tag:hover,.mj-archive-tag:focus-visible{color:rgba(229,161,122,.95);background:rgba(8,6,14,.7);border-color:rgba(229,161,122,.85);transform:translateY(-1px);outline:none}',
    '.mj-archive-tag__dot{width:7px;height:7px;border-radius:50%;background:rgba(229,161,122,.85);box-shadow:0 0 8px rgba(229,161,122,.55);animation:mj-archive-tag-pulse 3.6s ease-in-out infinite}',
    '@keyframes mj-archive-tag-pulse{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}',
    '@media (prefers-reduced-motion: reduce){.mj-archive-tag__dot{animation:none}}',
  ].join('\n');

  function injectStyle() {
    if (document.getElementById('mj-archive-style')) return;
    var s = document.createElement('style');
    s.id = 'mj-archive-style';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  // ---------- 2. The wax seal SVG (inline so the script
  //    has no asset dependencies). Two-tone disc with the
  //    italic "MJ" monogram pressed into it. ----------
  var SEAL_SVG = (
    '<svg viewBox="-32 -32 64 64" aria-hidden="true">'
      + '<defs>'
        + '<radialGradient id="mj-seal-grad" cx="-0.2" cy="-0.3" r="1">'
          + '<stop offset="0%" stop-color="#e0a268"/>'
          + '<stop offset="60%" stop-color="#a85f2a"/>'
          + '<stop offset="100%" stop-color="#5a2a10"/>'
        + '</radialGradient>'
      + '</defs>'
      // Outer wax disc — slightly irregular circle for that
      // hand-pressed feel.
      + '<path d="M -28 2 C -28 -16, -14 -28, 1 -28 C 18 -28, 28 -14, 28 2 C 28 18, 16 28, 0 28 C -14 28, -28 18, -28 2 Z"'
      + ' fill="url(#mj-seal-grad)" stroke="#3b1808" stroke-width="0.8"/>'
      // Inner ring
      + '<circle r="22" fill="none" stroke="rgba(255,235,200,0.3)" stroke-width="0.7"/>'
      // MJ monogram
      + '<text x="0" y="2" text-anchor="middle" font-family="Fraunces,serif" font-size="22" font-style="italic" font-weight="500" fill="#fff5dc" dy="0.36em">MJ</text>'
    + '</svg>'
  );

  // ---------- 3. Modal markup ----------
  function buildModal() {
    var aside = document.createElement('aside');
    aside.className = 'mj-archive';
    aside.id = 'mjArchiveNotice';
    aside.setAttribute('aria-hidden', 'true');
    aside.hidden = true;
    aside.innerHTML = (
      '<button type="button" class="mj-archive__bd" data-archive-close aria-label="Close the letter"></button>'
      + '<article class="mj-archive__card" role="dialog" aria-modal="true" aria-labelledby="mjArchiveTitle">'
        + '<span class="mj-archive__seal">' + SEAL_SVG + '</span>'
        + '<button type="button" class="mj-archive__close" data-archive-close aria-label="Close the letter">'
          + '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">'
            + '<path d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
          + '</svg>'
        + '</button>'
        + '<header class="mj-archive__head">'
          + '<p class="mj-archive__eb">A letter from the author</p>'
          + '<h2 class="mj-archive__title" id="mjArchiveTitle">On closing <em>v0</em></h2>'
        + '</header>'
        + '<div class="mj-archive__body">'
          + '<p>If you are reading this, this project is closed. The writing is special to me, but also I hate it. The essays, to varying degrees, were built with AI, and while I heavily guided the outputs and flow and crafted many of the words from scratch, it still has so many artifacts I am not happy with — or philosophies not fleshed out well enough, and opinions of mine that are not expressed.</p>'
          + '<p>The stories are another thing. A couple of these were philosophies that I had embodied almost as an allegorical representation of an idea or thought (<em>Hole Punchers</em>), whereas ones like <em>Once Upon a Time in Eden</em> and <em>I-Will-Be-Who-I-Will-Be</em> are essentially written by me with a light editing pass with tools like Grammarly and AI-powered tools.</p>'
          + '<p>The lyrics are the last thing I want to touch on. These were just outpourings of my soul. Some are heavily inspired by other literature: <em>Ada</em> is a direct representation of the Grand Inquisitor in <em>The Karamazov Brothers</em> (yes, the Oxford edition entitled it correctly), and <em>Death World</em> is heavily inspired by the leaked sequel of <em>Disco Elysium</em> that was scrapped — I know all the ins and outs of that story. Others are just me, me, me. Late glazing and editing from friends and AI to help edit this piece.</p>'
          + '<p>The loose stars are all basically placeholders built upon AI\u2019s context of me and giant lists of ideas in my journal, so take those for what they are worth. There are a few other artifact pages. But I hope you enjoy!</p>'
        + '</div>'
        + '<footer class="mj-archive__foot">'
          + '<span class="mj-archive__rule" aria-hidden="true"></span>'
          + '<p class="mj-archive__sign">— Melody Jack</p>'
          + '<button type="button" class="mj-archive__cta" data-archive-close>Close the letter</button>'
        + '</footer>'
      + '</article>'
    );
    return aside;
  }

  function buildTag() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mj-archive-tag';
    btn.setAttribute('data-archive-open', '');
    btn.setAttribute('aria-label', 'Open the v0 archive letter');
    btn.innerHTML = (
      '<span class="mj-archive-tag__dot" aria-hidden="true"></span>'
      + '<span class="mj-archive-tag__text">v0 · letter</span>'
    );
    return btn;
  }

  // ---------- 4. Wire up ----------
  function init() {
    injectStyle();

    var modal = buildModal();
    var tag = buildTag();
    document.body.appendChild(modal);
    document.body.appendChild(tag);

    function open() {
      modal.hidden = false;
      // force reflow so the open transition fires
      void modal.offsetWidth;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('mj-archive-locked');
      setTimeout(function () {
        var btn = modal.querySelector('[data-archive-close]');
        if (btn && btn.focus) btn.focus({ preventScroll: true });
      }, 280);
    }

    function close() {
      if (!modal.classList.contains('is-open')) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('mj-archive-locked');
      var finish = function () {
        modal.hidden = true;
        modal.removeEventListener('transitionend', finish);
      };
      modal.addEventListener('transitionend', finish, { once: true });
      setTimeout(finish, 600);
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) { /* private mode */ }
    }

    modal.querySelectorAll('[data-archive-close]').forEach(function (b) {
      b.addEventListener('click', close);
    });
    tag.addEventListener('click', open);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });

    // First-visit auto-open. Wait a beat so the page can
    // render in first; opening immediately on load makes
    // the modal feel like an interruption rather than a
    // greeting.
    var dismissed = false;
    try { dismissed = localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { /* noop */ }
    if (!dismissed) {
      setTimeout(open, 800);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
