/* ==============================
   Illyrian Pixel – main.js
   ============================== */

/* Footer year */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* Theme toggle */
const root = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
const icon = document.getElementById('themeIcon');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (icon) {
    icon.textContent = theme === 'dark' ? '🌙' : '☀️';
    icon.classList.remove('spin');
    requestAnimationFrame(() => icon.classList.add('spin'));
    setTimeout(() => icon.classList.remove('spin'), 220);
  }
}

/* Initial theme */
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'light' || storedTheme === 'dark') {
  applyTheme(storedTheme);
} else {
  applyTheme('dark'); // default
}

/* Toggle click */
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* Optional: close mobile menu on link click */
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('navMain');
    if (nav && nav.classList.contains('show')) {
      new bootstrap.Collapse(nav).hide();
    }
  });
});


/* Back to top */
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
  if (!backToTop) return;

  const y = window.scrollY || document.documentElement.scrollTop;
  if (y > 520) backToTop.classList.add('is-visible');
  else backToTop.classList.remove('is-visible');
}

if (backToTop) {
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

