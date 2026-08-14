// Header scroll state
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.querySelector('.site-nav');
navToggle.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
siteNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Digital rain background, scoped to the hero section only
(() => {
  const canvas = document.getElementById('rain');
  if (!canvas) return;
  const hero = canvas.closest('.hero');
  const ctx = canvas.getContext('2d');
  const chars = 'アイウエオカキクケコサシスセソ01';
  const fontSize = 15;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  let cols, drops, width, height;

  function resize() {
    width = hero.clientWidth;
    height = hero.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.min(60, Math.floor(width / fontSize));
    drops = new Array(cols).fill(0).map(() => Math.random() * -50);
  }

  function draw() {
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < cols; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      const roll = Math.random();
      ctx.fillStyle = roll < 0.05 ? '#2f5fd6' : roll < 0.1 ? '#1f9d55' : roll < 0.13 ? '#d8402f' : 'rgba(20,22,28,0.35)';
      ctx.fillText(char, x, y);

      if (y > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  if (prefersReduced) return;

  resize();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  let last = 0;
  const frameInterval = 90; // ms between draws, keeps this cheap
  let rafId;
  const io = new IntersectionObserver((entries) => {
    const visible = entries[0].isIntersecting;
    if (visible && !rafId) {
      rafId = requestAnimationFrame(tick);
    } else if (!visible && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });
  io.observe(hero);

  function tick(ts) {
    if (ts - last >= frameInterval) {
      draw();
      last = ts;
    }
    rafId = requestAnimationFrame(tick);
  }
})();
