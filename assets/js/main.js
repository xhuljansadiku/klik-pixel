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

/* =========================
   Mega menu hover (desktop)
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const mq = window.matchMedia("(min-width: 992px)");
  const megaItem = document.querySelector(".ip-mega");
  const trigger = document.getElementById("megaServices");
  const menu = document.getElementById("megaMenu");

  if (!megaItem || !trigger || !menu) return;

  let dd = null;
  let openTimer = null;
  let closeTimer = null;

  function initDropdown() {
    dd = bootstrap.Dropdown.getOrCreateInstance(trigger, {
      autoClose: "outside",
      popperConfig: { strategy: "fixed" }
    });
  }

  function open() {
    clearTimeout(closeTimer);
    openTimer = setTimeout(() => {
      dd?.show();
    }, 80);
  }

  function close() {
    clearTimeout(openTimer);
    closeTimer = setTimeout(() => {
      dd?.hide();
    }, 180);
  }

  function bindDesktop() {
    initDropdown();

    trigger.addEventListener("mouseenter", open);
    menu.addEventListener("mouseenter", () => clearTimeout(closeTimer));

    megaItem.addEventListener("mouseleave", close);

    // optional: keep aria-expanded correct on show/hide
    trigger.addEventListener("shown.bs.dropdown", () => trigger.setAttribute("aria-expanded", "true"));
    trigger.addEventListener("hidden.bs.dropdown", () => trigger.setAttribute("aria-expanded", "false"));
  }

  function unbindDesktop() {
    // Bootstrap click behavior stays, no hover logic
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
  }

  // First run
  if (mq.matches) bindDesktop();

  // Re-bind on resize
  mq.addEventListener("change", (e) => {
    if (e.matches) {
      bindDesktop();
    } else {
      unbindDesktop();
    }
  });
});

/* =========================
   NAVBAR UX (Mega + Mobile)
   ========================= */

// Close mobile menu on any nav click
document.querySelectorAll('#ipNav a[href^="#"]').forEach(a => {
  a.addEventListener('click', () => {
    const nav = document.getElementById('ipNav');
    if (nav && nav.classList.contains('show')) {
      const inst = bootstrap.Collapse.getOrCreateInstance(nav);
      inst.hide();
    }
  });
});

// Desktop: hover-friendly mega menu (works with Bootstrap dropdown)
(() => {
  const mega = document.querySelector('.ip-mega');
  if (!mega) return;

  const trigger = mega.querySelector('[data-bs-toggle="dropdown"]');
  const menu = mega.querySelector('.dropdown-menu');
  if (!trigger || !menu) return;

  const dd = bootstrap.Dropdown.getOrCreateInstance(trigger, { autoClose: 'outside' });

  let t;
  const open = () => { clearTimeout(t); dd.show(); };
  const close = () => { clearTimeout(t); t = setTimeout(() => dd.hide(), 160); };

  const isDesktop = () => window.matchMedia('(min-width: 992px)').matches;

  mega.addEventListener('mouseenter', () => { if (isDesktop()) open(); });
  mega.addEventListener('mouseleave', () => { if (isDesktop()) close(); });

  // prevent flicker when passing between trigger and menu
  menu.addEventListener('mouseenter', () => { if (isDesktop()) open(); });
  menu.addEventListener('mouseleave', () => { if (isDesktop()) close(); });

  // keep aria updated a bit nicer
  trigger.addEventListener('shown.bs.dropdown', () => trigger.setAttribute('aria-expanded', 'true'));
  trigger.addEventListener('hidden.bs.dropdown', () => trigger.setAttribute('aria-expanded', 'false'));
})();


// ==============================
// Mobile nav: close on outside click + on link click
// ==============================
(() => {
  const nav = document.getElementById('ipNav');
  if (!nav) return;

  const collapseEl = nav; // .collapse
  const panel = nav.querySelector('.ip-mobile-panel');
  const toggler = document.querySelector('[data-bs-target="#ipNav"]');

  // helper
  const isMobile = () => window.matchMedia('(max-width: 991.98px)').matches;

  const getCollapse = () => bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });

  // close when clicking a link inside (optional but recommended)
  nav.querySelectorAll('a.nav-link, a.ip-sub-link, .ip-nav-cta a, .ip-mobile-panel a.btn').forEach(a => {
    a.addEventListener('click', () => {
      if (isMobile() && collapseEl.classList.contains('show')) {
        getCollapse().hide();
      }
    });
  });

  // close when clicking outside the panel (mobile only)
  document.addEventListener('click', (e) => {
    if (!isMobile()) return;
    if (!collapseEl.classList.contains('show')) return;

    const clickedInsidePanel = panel && panel.contains(e.target);
    const clickedToggler = toggler && toggler.contains(e.target);

    if (!clickedInsidePanel && !clickedToggler) {
      getCollapse().hide();
    }
  });

  // also close on ESC (nice touch)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobile() && collapseEl.classList.contains('show')) {
      getCollapse().hide();
    }
  });
})();

