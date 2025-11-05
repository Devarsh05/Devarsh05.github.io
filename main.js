// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const el = document.querySelector(targetId);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
    menu?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

// Small parallax-ish floating squares (decorative)
const floating = () => {
  const root = document.body;
  for (let i = 0; i < 12; i++) {
    const s = document.createElement('span');
    s.className = 'float-square';
    const size = 8 + Math.random() * 18;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.background = 'rgba(79,70,229,.15)';
    s.style.position = 'fixed';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 100 + 'vh';
    s.style.borderRadius = '4px';
    s.style.zIndex = '0';
    s.style.filter = 'blur(0.2px)';
    s.animate([
      { transform: 'translateY(0px)' },
      { transform: `translateY(${6 + Math.random() * 12}px)` }
    ], { duration: 2000 + Math.random() * 3000, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' });
    root.appendChild(s);
  }
};
floating();


