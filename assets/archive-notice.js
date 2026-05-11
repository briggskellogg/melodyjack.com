/**
 * Archived v0: minimal full-width footer strip — short author note only.
 */
(function () {
  if (window.__mjArchiveNotice) return;
  window.__mjArchiveNotice = true;

  var STYLE = [
    /* Space only for ~2 lines + safe area — no oversized gutter */
    'body.mj-archive-v0-pad{padding-bottom:calc(env(safe-area-inset-bottom,0px) + clamp(5rem,9.5dvh,6rem));}',
    '.mj-archive-bar{',
    'position:fixed;left:0;right:0;bottom:0;z-index:40;margin:0;',
    'padding:.55rem clamp(13px,2.4vw,22px)',
    ' calc(.55rem + env(safe-area-inset-bottom,0px));',
    'padding-left:max(13px,env(safe-area-inset-left,0px));',
    'padding-right:max(13px,env(safe-area-inset-right,0px));',
    'border-top:1px solid rgba(255,255,255,.07);',
    'background:rgba(5,6,11,.93);color:rgba(232,226,217,.93);',
    'font-family:system-ui,-apple-system,"Segoe UI",sans-serif;',
    'font-size:13px;line-height:1.45;-webkit-font-smoothing:antialiased;',
    '}',
    '.mj-archive-bar__text{margin:0 auto;max-width:56rem;}',
    '.mj-archive-bar__text p{margin:0 0 .32em;color:inherit}',
    '.mj-archive-bar__text p:last-child{margin-bottom:0}',
    '.mj-archive-bar__lead{font-weight:600;color:rgba(255,246,237,.94);}',
    '.mj-archive-bar__text em{font-style:italic;color:rgba(246,226,207,.93)}',
    '.mj-archive-bar__sig{display:block;margin-top:.32em;',
    'font-weight:500;color:rgba(196,173,157,.93)}',
    '@media(prefers-reduced-motion:reduce){',
    'body.mj-archive-v0-pad{padding-bottom:calc(env(safe-area-inset-bottom,0px) + 5.35rem)}}',
  ].join('\n');

  function injectStyle() {
    if (document.getElementById('mj-archive-style')) return;
    var s = document.createElement('style');
    s.id = 'mj-archive-style';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  function buildFooter() {
    var el = document.createElement('footer');
    el.className = 'mj-archive-bar';
    el.id = 'mjArchiveNotice';

    el.innerHTML = (
      '<div class="mj-archive-bar__text">'
        + '<p><span class="mj-archive-bar__lead">Archived v0 — closed.</span> '
          + 'I wrote everything here myself; working with AI still left stains, '
          + 'worst on the essays, lighter on the stories, and rare on lyrics—I '
          + 'barely gave tools those drafts.</p>'
        + '<p>Loose Stars and a few odd pages were AI-scaffold placeholders over '
          + 'journal scribbles—take those lightly. Still, thanks for stopping by.'
          + '<span class="mj-archive-bar__sig">— Melody Jack</span></p>'
      + '</div>'
    );

    return el;
  }

  function init() {
    injectStyle();
    document.body.classList.add('mj-archive-v0-pad');
    document.body.appendChild(buildFooter());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
