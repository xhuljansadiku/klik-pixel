/* ==============================
   Illyrian Pixel – main.js (clean)
   Requires: Bootstrap JS (bundle) loaded before this file
   ============================== */

/* Helpers */
const qs = (s, p = document) => p.querySelector(s);
const qsa = (s, p = document) => Array.from(p.querySelectorAll(s));
const hasBootstrap = () => typeof window.bootstrap !== "undefined";

document.addEventListener("DOMContentLoaded", () => {

  /* Footer year */
  (() => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  })();

  /* Theme toggle */
  (() => {
    const root = document.documentElement;
    const toggleBtn = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");
    const KEY = "theme";

    const applyTheme = (theme) => {
      root.setAttribute("data-theme", theme);
      try { localStorage.setItem(KEY, theme); } catch (e) {}
      if (icon) icon.textContent = theme === "dark" ? "🌙" : "☀️";
    };

    let stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}
    applyTheme(stored === "light" || stored === "dark" ? stored : "dark");

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "dark";
        applyTheme(current === "dark" ? "light" : "dark");
      });
    }
  })();

  /* Navbar shrink */
  (() => {
    const bar = qs(".ip-navbar");
    if (!bar) return;

    const onScroll = () => bar.classList.toggle("ip-navbar--shrink", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  /* Active link on scroll (SAFE – ignores href="#") */
  (() => {
    const nav = qs("#ipNav");
    if (!nav || typeof IntersectionObserver === "undefined") return;

    const links = qsa('a.nav-link[href^="#"]', nav);
    if (!links.length) return;

    const pairs = links
      .map(a => {
        const href = (a.getAttribute("href") || "").trim();
        if (!href || href === "#") return null;
        if (!href.startsWith("#") || href.length < 2) return null;

        let sec = null;
        try { sec = document.querySelector(href); } catch (e) { sec = null; }
        return sec ? { sec, a } : null;
      })
      .filter(Boolean);

    if (!pairs.length) return;

    const setActive = (a) => {
      links.forEach(x => x.classList.remove("active"));
      if (a) a.classList.add("active");
    };

    const obs = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      const match = pairs.find(x => x.sec === visible.target);
      if (match) setActive(match.a);
    }, { rootMargin: "-30% 0px -60% 0px", threshold: [0.12, 0.25, 0.5] });

    pairs.forEach(x => obs.observe(x.sec));
  })();

  /* Mobile nav close: link click + outside + ESC */
  (() => {
    const nav = qs("#ipNav");
    if (!nav || !hasBootstrap()) return;

    const toggler = qs('[data-bs-target="#ipNav"]');
    const panel = qs(".ip-mobile-panel", nav) || nav;

    const isMobile = () => window.matchMedia("(max-width: 991.98px)").matches;
    const isOpen = () => nav.classList.contains("show");
    const collapse = () => window.bootstrap.Collapse.getOrCreateInstance(nav, { toggle: false });

    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;

      const isDropdownToggle =
        a.classList.contains("dropdown-toggle") ||
        a.getAttribute("data-bs-toggle") === "dropdown";

      if (isDropdownToggle) return;
      if (!isMobile() || !isOpen()) return;

      collapse().hide();
    });

    document.addEventListener("click", (e) => {
      if (!isMobile() || !isOpen()) return;
      const clickedInside = panel.contains(e.target);
      const clickedToggler = toggler && toggler.contains(e.target);
      if (!clickedInside && !clickedToggler) collapse().hide();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isMobile() && isOpen()) collapse().hide();
    });
  })();

  /* Mega menu hover (desktop) – requires #megaMenu id in HTML */
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
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
      bound = false;
    };

    if (mq.matches) bind();
    mq.addEventListener("change", (e) => (e.matches ? bind() : unbind()));
  })();

  /* Back to top */
  (() => {
    const backToTop = qs("#backToTop");
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

  /* Pricing filter (ONE TIME ONLY) */
  (() => {
    const wrap = qs("#pricing");
    if (!wrap) return;

    const buttons = qsa(".pf-btn", wrap);
    const items = qsa(".pricing-item", wrap);
    const grid = qs("#pricingGrid", wrap);
    const KEY = "ip_pricing_filter";

    if (!buttons.length || !items.length) return;

    const setActive = (btn) => {
      buttons.forEach(b => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
    };

    const apply = (cat) => {
      items.forEach(item => {
        const itemCat = item.getAttribute("data-cat");
        const show = (cat === "all" || itemCat === cat);
        item.classList.toggle("is-hidden", !show);
      });
    };

    const scrollToGrid = () => {
      if (!grid) return;
      const nav = qs(".ip-navbar.sticky-top, .navbar.sticky-top");
      const navH = nav ? Math.ceil(nav.getBoundingClientRect().height) : 0;
      const y = grid.getBoundingClientRect().top + window.pageYOffset - (navH + 14);
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    const save = (cat) => { try { localStorage.setItem(KEY, cat); } catch (e) {} };
    const load = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };

    const setFilter = (cat, doScroll) => {
      const btn = buttons.find(b => b.dataset.filter === cat) || buttons[0];
      const finalCat = btn.dataset.filter || "all";
      setActive(btn);
      apply(finalCat);
      save(finalCat);
      if (doScroll) scrollToGrid();
    };

    buttons.forEach(btn => btn.addEventListener("click", () => setFilter(btn.dataset.filter, true)));

    const saved = load();
    if (saved && buttons.some(b => b.dataset.filter === saved)) setFilter(saved, false);
    else setFilter("all", false);
  })();

  /* Testimonials tabs */
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

        const byKey = buttons.findIndex(b => b.getAttribute("data-save") === saved);
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

    const stop = () => { if (timer) clearInterval(timer); timer = null; };

    buttons.forEach((btn, i) => btn.addEventListener("click", () => showByIndex(i, true)));

    if (!loadSaved()) {
      const activeIdx = buttons.findIndex(b => b.classList.contains("active"));
      showByIndex(activeIdx >= 0 ? activeIdx : 0, false);
    } else {
      idx = buttons.findIndex(b => b.classList.contains("active"));
      if (idx < 0) idx = 0;
    }

    section.addEventListener("mouseenter", stop);
    section.addEventListener("mouseleave", start);
    section.addEventListener("focusin", stop);
    section.addEventListener("focusout", start);

    start();
  })();

  /* FAQ */
  (() => {
    const section = qs("#faq");
    if (!section) return;

    const chips = qsa(".faq-chip", section);
    const search = qs("#faqSearch", section);
    const items = qsa(".faq-item", section);
    const empty = qs("#faqEmpty", section);
    const acc = qs("#faqAcc", section);

    if (!chips.length || !items.length) return;

    const KEY_FILTER = "ip_faq_filter";
    const KEY_SEARCH = "ip_faq_search";

    const setActiveChip = (cat) => {
      chips.forEach(c => c.classList.toggle("is-active", c.dataset.filter === cat));
    };

    const closeAll = () => {
      if (!acc || !window.bootstrap) return;
      acc.querySelectorAll(".accordion-collapse.show").forEach(c => {
        window.bootstrap.Collapse.getOrCreateInstance(c, { toggle: false }).hide();
      });
    };

    const apply = (cat, q) => {
      const query = (q || "").trim().toLowerCase();
      let visible = 0;

      items.forEach(item => {
        const itemCat = item.dataset.cat || "all";
        const matchesCat = (cat === "all" || itemCat === cat);
        const text = (item.innerText || item.textContent || "").toLowerCase();
        const matchesText = (!query || text.includes(query));

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

    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        const cat = chip.dataset.filter || "all";
        const q = search ? search.value : "";
        setActiveChip(cat);
        apply(cat, q);
        save(cat, q);
      });
    });

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

    section.addEventListener("click", (e) => {
      const badge = e.target.closest(".faq-badge");
      if (!badge) return;

      e.preventDefault();
      e.stopPropagation();

      const cat = badge.getAttribute("data-badge") || "all";
      if (search) search.value = "";

      setActiveChip(cat);
      apply(cat, "");
      save(cat, "");
    });

    const state = load();
    if (search) search.value = state.q;

    const valid = chips.some(c => c.dataset.filter === state.cat);
    const cat = valid ? state.cat : "all";

    setActiveChip(cat);
    apply(cat, state.q);
  })();

  /* Contact wizard + submit (front-end only) */
  (() => {
    const form = qs("#contactForm");
    if (!form) return;

    const panels = qsa(".cf-panel", form);
    const stepsUI = qsa(".cf-step", form);
    const btnNext = qsa(".cf-next", form);
    const btnBack = qsa(".cf-back", form);

    const serviceSelect = qs("#cService", form);
    const status = qs("#contactStatus", form);
    const submitBtn = qs("#contactSubmit", form);

    let step = 1;

    const setStatus = (msg, type = "muted") => {
      if (!status) return;
      status.textContent = msg || "";
      status.className = `small ${type === "ok" ? "text-success" : type === "err" ? "text-danger" : "text-muted"}`;
    };

    const setLoading = (loading) => {
      if (!submitBtn) return;
      submitBtn.disabled = loading;
      submitBtn.innerHTML = loading
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

    const showPanel = (n) => {
      step = n;

      panels.forEach(p => p.classList.toggle("is-active", Number(p.dataset.step) === n));

      stepsUI.forEach((s, i) => {
        const idx = i + 1;
        s.classList.toggle("is-active", idx === n);
        s.classList.toggle("is-done", idx < n);
      });

      const active = panels.find(p => Number(p.dataset.step) === n);
      if (active) active.scrollIntoView({ behavior: "smooth", block: "start" });

      setStatus("");
    };

    const activeService = () => (serviceSelect?.value || "").trim();

    // supports cf-group in ANY step: only show groups inside ACTIVE panel
    const showServiceGroup = () => {
      const sv = activeService();
      const panel = panels.find(p => p.classList.contains("is-active"));
      if (!panel) return;

      const groups = qsa(".cf-group", panel);
      if (!groups.length) return;

      groups.forEach(g => {
        const on = g.dataset.service === sv;
        g.hidden = !on;

        qsa("[data-required]", g).forEach(el => {
          el.required = on;
          if (!on) el.classList.remove("is-invalid", "is-valid");
        });
      });
    };

    const validateStep = (n) => {
      let ok = true;

      const panel = panels.find(p => Number(p.dataset.step) === n);
      if (!panel) return true;

      const fields = qsa("input, select, textarea", panel);

      fields.forEach(el => {
        if (el.disabled || el.type === "hidden") return;

        if (!el.required) {
          el.classList.remove("is-invalid");
          return;
        }

        let bad = false;

        if (el.tagName === "SELECT") bad = !el.value;
        else if (el.type === "email") bad = !el.value.trim() || !isValidEmail(el.value);
        else bad = !String(el.value || "").trim();

        mark(el, bad);
        if (bad) ok = false;
      });

      return ok;
    };

    // init
    showPanel(1);
    showServiceGroup();

    serviceSelect?.addEventListener("change", () => {
      showServiceGroup();
    });

    btnNext.forEach(b => b.addEventListener("click", () => {
      if (!validateStep(step)) {
        setStatus("Kontrollo fushat e shënuara.", "err");
        return;
      }

      if (step < 4) {
        showPanel(step + 1);
        showServiceGroup();
      }
    }));

    btnBack.forEach(b => b.addEventListener("click", () => {
      if (step > 1) {
        showPanel(step - 1);
        showServiceGroup();
      }
    }));

    form.addEventListener("input", (e) => {
      const el = e.target;
      if (!el) return;

      if (el.name === "email") {
        if (el.classList.contains("is-invalid")) mark(el, !isValidEmail(el.value));
        return;
      }

      if (el.classList.contains("is-invalid") && el.required) {
        const bad = !String(el.value || "").trim();
        mark(el, bad);
      }
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      setStatus("");

      // validate step 4 (and required fields there)
      if (!validateStep(4)) {
        setStatus("Kontrollo fushat e shënuara.", "err");
        return;
      }

      try {
        setLoading(true);
        setStatus("Po e dërgojmë...", "muted");

        // SIMULIM (zëvendëso me fetch real kur ta lidhësh backend)
        await new Promise(r => setTimeout(r, 900));

        setStatus("U dërgua. Do të kthej përgjigje sa më shpejt.", "ok");
        form.reset();

        // reset UI
        panels.forEach(p => qsa(".is-valid,.is-invalid", p).forEach(x => x.classList.remove("is-valid", "is-invalid")));
        showPanel(1);
        showServiceGroup();
      } catch (err) {
        setStatus("S’funksionoi. Provo përsëri ose më shkruaj në email.", "err");
      } finally {
        setLoading(false);
      }
    });
  })();

});
