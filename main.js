const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open');
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    menu?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

// Fade-and-rise as each section enters the viewport. Runs once per section.
// Opted into only when motion is welcome and IntersectionObserver exists —
// the .reveal class is never applied otherwise, so content stays visible.
const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (motionOK && 'IntersectionObserver' in window) {
  const sections = document.querySelectorAll('main > section');
  sections.forEach((s) => s.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });

  sections.forEach((s) => observer.observe(s));
}
