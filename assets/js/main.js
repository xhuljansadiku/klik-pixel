/* ==============================
   Illyrian Pixel – main.js (clean)
   ============================== */

/* ------------------------------
   Helpers
-------------------------------- */
const qs = (s, p = document) => p.querySelector(s);
const qsa = (s, p = document) => Array.from(p.querySelectorAll(s));
const hasBootstrap = () => typeof window.bootstrap !== "undefined";

/* ------------------------------
   Footer year
-------------------------------- */
(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ------------------------------
   Theme toggle (data-theme on <html>)
-------------------------------- */
(() => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const KEY = "theme";

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(KEY, theme); } catch (e) {}

    if (icon) {
      icon.textContent = theme === "dark" ? "🌙" : "☀️";
      icon.classList.remove("spin");
      requestAnimationFrame(() => icon.classList.add("spin"));
      setTimeout(() => icon.classList.remove("spin"), 220);
    }
  };

  const stored = (() => {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  })();

  if (stored === "light" || stored === "dark") applyTheme(stored);
  else applyTheme("dark");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }
})();

/* ------------------------------
   Mobile nav: close on link click + outside click + ESC
   Uses #ipNav (your collapse id)
-------------------------------- */
(() => {
  const nav = document.getElementById("ipNav");
  if (!nav || !hasBootstrap()) return;

  const toggler = qs('[data-bs-target="#ipNav"]');
  const panel = nav.querySelector(".ip-mobile-panel") || nav;

  const isMobile = () => window.matchMedia("(max-width: 991.98px)").matches;
  const getCollapse = () => window.bootstrap.Collapse.getOrCreateInstance(nav, { toggle: false });
  const isOpen = () => nav.classList.contains("show");

  // close on any internal link click (except dropdown toggle)
  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;

    if (a.classList.contains("dropdown-toggle") || a.getAttribute("data-bs-toggle") === "dropdown") return;
    if (!isMobile() || !isOpen()) return;

    getCollapse().hide();
  });

  // close on buttons inside
  qsa(".btn", nav).forEach((btn) => {
    btn.addEventListener("click", () => {
      if (isMobile() && isOpen()) getCollapse().hide();
    });
  });

  // close on outside click
  document.addEventListener("click", (e) => {
    if (!isMobile() || !isOpen()) return;

    const clickedInside = panel.contains(e.target);
    const clickedToggler = toggler && toggler.contains(e.target);

    if (!clickedInside && !clickedToggler) getCollapse().hide();
  });

  // close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMobile() && isOpen()) getCollapse().hide();
  });
})();

/* ------------------------------
   Mega menu hover (desktop only)
   trigger: #megaServices
   menu:    #megaMenu
-------------------------------- */
(() => {
  if (!hasBootstrap()) return;

  const mq = window.matchMedia("(min-width: 992px)");
  const megaItem = qs(".ip-mega");
  const trigger = qs("#megaServices");
  const menu = qs("#megaMenu");
  if (!megaItem || !trigger || !menu) return;

  let dd = null;
  let openTimer = null;
  let closeTimer = null;
  let bound = false;

  const init = () => {
    dd = window.bootstrap.Dropdown.getOrCreateInstance(trigger, {
      autoClose: "outside",
      popperConfig: { strategy: "fixed" }
    });
  };

  const open = () => {
    clearTimeout(closeTimer);
    openTimer = setTimeout(() => dd && dd.show(), 80);
  };

  const close = () => {
    clearTimeout(openTimer);
    closeTimer = setTimeout(() => dd && dd.hide(), 180);
  };

  const bind = () => {
    if (bound) return;
    bound = true;

    init();

    trigger.addEventListener("mouseenter", open);
    menu.addEventListener("mouseenter", () => clearTimeout(closeTimer));
    megaItem.addEventListener("mouseleave", close);

    trigger.addEventListener("shown.bs.dropdown", () => trigger.setAttribute("aria-expanded", "true"));
    trigger.addEventListener("hidden.bs.dropdown", () => trigger.setAttribute("aria-expanded", "false"));
  };

  const unbind = () => {
    // keep Bootstrap click behavior; we only stop timers
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    bound = false;
  };

  if (mq.matches) bind();

  mq.addEventListener("change", (e) => {
    if (e.matches) bind();
    else unbind();
  });
})();

/* ------------------------------
   Back to top
-------------------------------- */
(() => {
  const backToTop = document.getElementById("backToTop");
  if (!backToTop) return;

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    backToTop.classList.toggle("is-visible", y > 520);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ------------------------------
   Pricing filter + save + smooth scroll
-------------------------------- */
(() => {
  const wrap = qs("#pricing");
  if (!wrap) return;

  const buttons = qsa(".pf-btn", wrap);
  const items = qsa(".pricing-item", wrap);
  const grid = qs("#pricingGrid", wrap);
  const KEY = "ip_pricing_filter";

  const setActive = (btn) => {
    buttons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  };

  const applyFilter = (cat) => {
    let delay = 0;

    items.forEach((item) => {
      const itemCat = item.getAttribute("data-cat");
      const show = cat === "all" || itemCat === cat;

      if (show) {
        item.classList.remove("is-hidden");
        item.style.transitionDelay = `${delay}ms`;
        delay += 60;
      } else {
        item.classList.add("is-hidden");
        item.style.transitionDelay = "0ms";
      }
    });
  };

  const scrollToGrid = () => {
    if (!grid) return;
    const nav = qs(".navbar.sticky-top, .ip-navbar.sticky-top");
    const navH = nav ? Math.ceil(nav.getBoundingClientRect().height) : 0;
    const y = grid.getBoundingClientRect().top + window.pageYOffset - (navH + 14);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const save = (cat) => { try { localStorage.setItem(KEY, cat); } catch (e) {} };
  const load = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };

  const findBtn = (cat) => buttons.find((b) => b.getAttribute("data-filter") === cat);

  const setFilter = (cat, doScroll = true) => {
    const btn = findBtn(cat) || findBtn("all") || buttons[0];
    const finalCat = btn.getAttribute("data-filter") || "all";

    setActive(btn);
    applyFilter(finalCat);
    save(finalCat);

    if (doScroll) scrollToGrid();
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => setFilter(btn.getAttribute("data-filter"), true));
  });

  const saved = load();
  if (saved && findBtn(saved)) setFilter(saved, false);
  else setFilter("all", false);
})();

/* ------------------------------
   Testimonials tabs: save + auto rotate + pause on hover
-------------------------------- */
(() => {
  const section = qs("#testimonials");
  if (!section || !hasBootstrap()) return;

  const buttons = qsa(".t-tab[data-bs-toggle='pill']", section);
  if (!buttons.length) return;

  const KEY = "ip_testimonials_tab";
  let idx = 0;
  let timer = null;

  const showByIndex = (i, doSave = true) => {
    const btn = buttons[i];
    if (!btn) return;

    window.bootstrap.Tab.getOrCreateInstance(btn).show();
    idx = i;

    if (doSave) {
      const saveKey = btn.getAttribute("data-save") || String(i);
      try { localStorage.setItem(KEY, saveKey); } catch (e) {}
    }
  };

  const loadSaved = () => {
    try {
      const saved = localStorage.getItem(KEY);
      if (!saved) return false;

      const byKey = buttons.findIndex((b) => b.getAttribute("data-save") === saved);
      if (byKey >= 0) { showByIndex(byKey, false); return true; }

      const asNum = parseInt(saved, 10);
      if (!Number.isNaN(asNum) && buttons[asNum]) { showByIndex(asNum, false); return true; }

      return false;
    } catch (e) {
      return false;
    }
  };

  const start = () => {
    stop();
    timer = setInterval(() => showByIndex((idx + 1) % buttons.length, true), 5200);
  };

  const stop = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  buttons.forEach((btn, i) => btn.addEventListener("click", () => showByIndex(i, true)));

  if (!loadSaved()) {
    const activeIdx = buttons.findIndex((b) => b.classList.contains("active"));
    showByIndex(activeIdx >= 0 ? activeIdx : 0, false);
  } else {
    idx = buttons.findIndex((b) => b.classList.contains("active"));
    if (idx < 0) idx = 0;
  }

  section.addEventListener("mouseenter", stop);
  section.addEventListener("mouseleave", start);
  section.addEventListener("focusin", stop);
  section.addEventListener("focusout", start);

  start();
})();

/* ------------------------------
   FAQ: chips + search + save + badge click + open specific
-------------------------------- */
(() => {
  const section = qs("#faq");
  if (!section) return;

  const chips = qsa(".faq-chip", section);
  const search = qs("#faqSearch", section);
  const items = qsa(".faq-item", section);
  const empty = qs("#faqEmpty", section);
  const acc = qs("#faqAcc", section);

  const KEY_FILTER = "ip_faq_filter";
  const KEY_SEARCH = "ip_faq_search";

  const textOf = (el) => ((el.innerText || el.textContent || "").toLowerCase());

  const scrollToAcc = () => {
    const el = qs(".faq-acc", section);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const closeAll = () => {
    if (!acc || !hasBootstrap()) return;
    qsa(".accordion-collapse.show", acc).forEach((c) => {
      window.bootstrap.Collapse.getOrCreateInstance(c, { toggle: false }).hide();
    });
  };

  const setActiveChip = (cat) => {
    chips.forEach((c) => c.classList.toggle("is-active", c.dataset.filter === cat));
  };

  const apply = (cat, q) => {
    const query = (q || "").trim().toLowerCase();
    let visible = 0;

    items.forEach((item) => {
      const itemCat = item.dataset.cat || "all";
      const matchesCat = cat === "all" || itemCat === cat;
      const matchesText = !query || textOf(item).includes(query);

      const show = matchesCat && matchesText;
      item.classList.toggle("is-hidden", !show);
      if (show) visible++;
    });

    if (empty) empty.hidden = visible !== 0;
    closeAll();
  };

  const save = (cat, q) => {
    try {
      localStorage.setItem(KEY_FILTER, cat);
      localStorage.setItem(KEY_SEARCH, q || "");
    } catch (e) {}
  };

  const load = () => {
    try {
      return {
        cat: localStorage.getItem(KEY_FILTER) || "all",
        q: localStorage.getItem(KEY_SEARCH) || ""
      };
    } catch (e) {
      return { cat: "all", q: "" };
    }
  };

  // chip click
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const cat = chip.dataset.filter || "all";
      setActiveChip(cat);
      apply(cat, search ? search.value : "");
      save(cat, search ? search.value : "");
      if (window.innerWidth < 992) scrollToAcc();
    });
  });

  // search
  if (search) {
    let t = null;
    search.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const active = qs(".faq-chip.is-active", section)?.dataset.filter || "all";
        apply(active, search.value);
        save(active, search.value);
      }, 120);
    });
  }

  // micro animation when opening accordion
  if (acc) {
    acc.addEventListener("show.bs.collapse", (e) => {
      const item = e.target.closest(".accordion-item");
      if (item) item.classList.add("is-opening");
    });
    acc.addEventListener("shown.bs.collapse", (e) => {
      const item = e.target.closest(".accordion-item");
      if (!item) return;
      setTimeout(() => item.classList.remove("is-opening"), 220);
    });
  }

  // badge click => filter
  section.addEventListener("click", (e) => {
    const badge = e.target.closest(".faq-badge");
    if (!badge) return;

    e.preventDefault();
    e.stopPropagation();

    const key = badge.getAttribute("data-badge") || "all";
    if (search) search.value = "";

    setActiveChip(key);
    apply(key, "");
    save(key, "");
    scrollToAcc();
  });

  // open specific question from pills: [data-faq-open="#collapseId"]
  section.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-faq-open]");
    if (!btn) return;

    const sel = btn.getAttribute("data-faq-open");
    const target = sel ? document.querySelector(sel) : null;
    if (!target) return;

    if (search) search.value = "";
    setActiveChip("all");
    apply("all", "");
    save("all", "");

    scrollToAcc();

    if (hasBootstrap()) {
      window.bootstrap.Collapse.getOrCreateInstance(target, { toggle: false }).show();
    } else {
      target.classList.add("show");
    }
  });

  // pricing highlight link: a[data-pricing="starter"] => #price-starter
  section.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-pricing]");
    if (!a) return;

    const pricing = qs("#pricing");
    if (!pricing) return;

    e.preventDefault();

    const key = a.getAttribute("data-pricing") || "";
    const card = key ? qs(`#price-${key}`) : null;

    pricing.classList.add("faq-highlight");
    qsa(".price-card.price-highlight").forEach((x) => x.classList.remove("price-highlight"));
    if (card) card.classList.add("price-highlight");

    const y = pricing.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: "smooth" });

    setTimeout(() => {
      pricing.classList.remove("faq-highlight");
      if (card) card.classList.remove("price-highlight");
    }, 2200);
  });

  // init from storage
  const state = load();
  if (search) search.value = state.q;

  const valid = chips.some((c) => c.dataset.filter === state.cat);
  const cat = valid ? state.cat : "all";

  setActiveChip(cat);
  apply(cat, state.q);
})();

/* ------------------------------
   Contact form: validation + UX (front-end only)
-------------------------------- */
(() => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const btn = document.getElementById("contactSubmit");
  const status = document.getElementById("contactStatus");

  const setStatus = (msg, type = "muted") => {
    if (!status) return;
    status.textContent = msg || "";
    status.className = `small ${
      type === "ok" ? "text-success" : type === "err" ? "text-danger" : "text-muted"
    }`;
  };

  const setLoading = (loading) => {
    if (!btn) return;
    btn.disabled = loading;
    btn.innerHTML = loading
      ? `<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Duke dërguar...`
      : `Dërgo`;
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());

  const mark = (el, invalid) => {
    if (!el) return;
    el.classList.toggle("is-invalid", !!invalid);
    el.classList.toggle("is-valid", !invalid);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("");

    const name = form.name?.value?.trim();
    const email = form.email?.value?.trim();
    const service = form.service?.value?.trim();
    const message = form.message?.value?.trim();

    mark(form.name, !name);
    mark(form.email, !email || !isValidEmail(email));
    mark(form.service, !service);
    mark(form.message, !message);

    const ok = name && email && isValidEmail(email) && service && message;
    if (!ok) {
      setStatus("Kontrollo fushat e shënuara.", "err");
      return;
    }

    try {
      setLoading(true);
      setStatus("Po e dërgojmë...", "muted");

      // simulate request
      await new Promise((r) => setTimeout(r, 900));

      setStatus("U dërgua. Do të kthej përgjigje sa më shpejt.", "ok");
      form.reset();

      ["name", "email", "service", "budget", "message"].forEach((k) => {
        const el = form[k];
        if (!el) return;
        el.classList.remove("is-valid", "is-invalid");
      });
    } catch (err) {
      setStatus("S’funksionoi. Provo përsëri ose më shkruaj në email.", "err");
    } finally {
      setLoading(false);
    }
  });

  // remove invalid as user types
  form.addEventListener("input", (e) => {
    const el = e.target;
    if (!el || !el.classList.contains("is-invalid")) return;

    if (el.name === "email") {
      el.classList.toggle("is-invalid", !isValidEmail(el.value));
    } else {
      el.classList.toggle("is-invalid", !String(el.value).trim());
    }
  });
})();

/* ------------------------------
   Footer smooth scroll (footer links only)
-------------------------------- */
(() => {
  const footer = document.getElementById("footer");
  if (!footer) return;

  footer.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const id = a.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();

    const nav = qs(".navbar.sticky-top, .ip-navbar.sticky-top");
    const navH = nav ? Math.ceil(nav.getBoundingClientRect().height) : 80;
    const top = target.getBoundingClientRect().top + window.pageYOffset - (navH + 10);

    window.scrollTo({ top, behavior: "smooth" });
  });
})();
