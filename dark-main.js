/* ============================================================
   Dark rebuild — theme toggle, scroll reveals, sticky header.

   The initial theme is resolved by a tiny inline script in <head> so the
   page never paints the wrong one; this file only handles the toggle
   after load.
   ============================================================ */

(function () {
  'use strict';

  var root = document.documentElement;
  var motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme ---------- */

  var STORE_KEY = 'theme';
  var toggle = document.querySelector('[data-theme-toggle]');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function applyTheme(name, persist) {
    if (name === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
    }
    if (persist) {
      try { localStorage.setItem(STORE_KEY, name); } catch (e) { /* private mode */ }
    }
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(name === 'light'));
      toggle.setAttribute(
        'aria-label',
        name === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
      );
    }
    if (window.__heroScene) window.__heroScene.setTheme(name);
  }

  // Sync the 3D object and the button to whatever the inline script chose.
  applyTheme(currentTheme(), false);

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(currentTheme() === 'light' ? 'dark' : 'light', true);
    });
  }

  // Dark is the designed default, so the OS preference is not followed
  // automatically — the toggle is the only thing that changes the theme.

  /* ---------- Sticky header hairline ---------- */

  var head = document.querySelector('.site-head');
  if (head) {
    var onScroll = function () {
      head.classList.toggle('is-stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Scroll reveals ---------- */

  // Opted into only when motion is welcome and IntersectionObserver exists,
  // so the .reveal class is never applied otherwise and content stays visible.
  if (motionOK && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('[data-reveal]');

    targets.forEach(function (el) { el.classList.add('reveal'); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // Stagger siblings inside a group by their index.
        var delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
        el.style.setProperty('--reveal-delay', delay + 'ms');
        el.classList.add('is-in');
        observer.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Smooth in-page nav ---------- */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({
        behavior: motionOK ? 'smooth' : 'auto',
        block: 'start'
      });
    });
  });
})();
