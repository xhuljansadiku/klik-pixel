/* ==============================
   Illyrian Pixel – main.js (clean, one-time bindings)
   Requires: Bootstrap JS loaded before this file
   ============================== */

/* ------------------------------
   Helpers
-------------------------------- */
const qs = (s, p = document) => p.querySelector(s);
const qsa = (s, p = document) => Array.from(p.querySelectorAll(s));
const hasBootstrap = () => typeof window.bootstrap !== "undefined";

/* ------------------------------
   DOM Ready wrapper (safe)
-------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

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
      if (icon) icon.textContent = theme === "dark" ? "🌙" : "☀️";
    };

    const stored = (() => {
      try { return localStorage.getItem(KEY); } catch (e) { return null; }
    })();

    applyTheme(stored === "light" || stored === "dark" ? stored : "dark");

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "dark";
        applyTheme(current === "dark" ? "light" : "dark");
      });
    }
  })();

  /* ------------------------------
     Navbar shrink
  -------------------------------- */
  (() => {
    const bar = qs(".ip-navbar");
    if (!bar) return;

    const onScroll = () => bar.classList.toggle("ip-navbar--shrink", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  /* ------------------------------
     Active link on scroll (IntersectionObserver)
  -------------------------------- */
  (() => {
    const nav = qs("#ipNav");
    if (!nav || typeof IntersectionObserver === "undefined") return;

    const links = qsa('a.nav-link[href^="#"]', nav);
    if (!links.length) return;

    const sections = links
      .map(a => {
        const id = a.getAttribute("href");
        const sec = id ? document.querySelector(id) : null;
        return sec ? { sec, a } : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    const setActive = (a) => {
      links.forEach(x => x.classList.remove("active"));
      if (a) a.classList.add("active");
    };

    const obs = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      const match = sections.find(x => x.sec === visible.target);
      if (match) setActive(match.a);
    }, { rootMargin: "-30% 0px -60% 0px", threshold: [0.12, 0.25, 0.5] });

    sections.forEach(x => obs.observe(x.sec));
  })();

  /* ------------------------------
     Mobile nav: close on link click + outside click + ESC
     Uses #ipNav (collapse)
  -------------------------------- */
  (() => {
    const nav = qs("#ipNav");
    if (!nav || !hasBootstrap()) return;

    const toggler = qs('[data-bs-target="#ipNav"]');
    const panel = qs(".ip-mobile-panel", nav) || nav;

    const isMobile = () => window.matchMedia("(max-width: 991.98px)").matches;
    const isOpen = () => nav.classList.contains("show");
    const collapse = () => window.bootstrap.Collapse.getOrCreateInstance(nav, { toggle: false });

    // close on internal link click (ignore dropdown toggles)
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

    // close on outside click
    document.addEventListener("click", (e) => {
      if (!isMobile() || !isOpen()) return;

      const clickedInside = panel.contains(e.target);
      const clickedToggler = toggler && toggler.contains(e.target);

      if (!clickedInside && !clickedToggler) collapse().hide();
    });

    // close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isMobile() && isOpen()) collapse().hide();
    });
  })();

  /* ------------------------------
     Mega menu hover (desktop only)
     Needs:
       trigger: #megaServices
       menu:    #megaMenu  (add id in HTML)
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
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
      bound = false;
    };

    if (mq.matches) bind();
    mq.addEventListener("change", (e) => (e.matches ? bind() : unbind()));
  })();

  /* ------------------------------
     Back to top
  -------------------------------- */
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

    if (!buttons.length || !items.length) return;

    const setActive = (btn) => {
      buttons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    };

    const applyFilter = (cat) => {
      let delay = 0;
      items.forEach(item => {
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

    const findBtn = (cat) => buttons.find(b => b.getAttribute("data-filter") === cat);

    const setFilter = (cat, doScroll = true) => {
      const btn = findBtn(cat) || findBtn("all") || buttons[0];
      const finalCat = btn.getAttribute("data-filter") || "all";

      setActive(btn);
      applyFilter(finalCat);
      save(finalCat);

      if (doScroll) scrollToGrid();
    };

    buttons.forEach(btn => btn.addEventListener("click", () => setFilter(btn.getAttribute("data-filter"), true)));

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

    if (!chips.length || !items.length) return;

    const textOf = (el) => ((el.innerText || el.textContent || "").toLowerCase());

    const scrollToAcc = () => {
      const el = qs(".faq-acc", section);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    const closeAll = () => {
      if (!acc || !hasBootstrap()) return;
      qsa(".accordion-collapse.show", acc).forEach(c => {
        window.bootstrap.Collapse.getOrCreateInstance(c, { toggle: false }).hide();
      });
    };

    const setActiveChip = (cat) => {
      chips.forEach(c => c.classList.toggle("is-active", c.dataset.filter === cat));
    };

    const apply = (cat, q) => {
      const query = (q || "").trim().toLowerCase();
      let visible = 0;

      items.forEach(item => {
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

    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        const cat = chip.dataset.filter || "all";
        setActiveChip(cat);
        apply(cat, search ? search.value : "");
        save(cat, search ? search.value : "");
        if (window.innerWidth < 992) scrollToAcc();
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

    // init from storage
    const state = load();
    if (search) search.value = state.q;

    const valid = chips.some(c => c.dataset.filter === state.cat);
    const cat = valid ? state.cat : "all";

    setActiveChip(cat);
    apply(cat, state.q);
  })();

  /* ------------------------------
     Contact form: validation + UX (front-end only)
  -------------------------------- */
  (() => {
    const form = qs("#contactForm");
    if (!form) return;

    const btn = qs("#contactSubmit");
    const status = qs("#contactStatus");

    const setStatus = (msg, type = "muted") => {
      if (!status) return;
      status.textContent = msg || "";
      status.className = `small ${type === "ok" ? "text-success" : type === "err" ? "text-danger" : "text-muted"}`;
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

    form.addEventListener("input", (e) => {
      const el = e.target;
      if (!el || !el.classList.contains("is-invalid")) return;

      if (el.name === "email") el.classList.toggle("is-invalid", !isValidEmail(el.value));
      else el.classList.toggle("is-invalid", !String(el.value).trim());
    });
  })();

  /* ------------------------------
     Footer smooth scroll (footer links only)
  -------------------------------- */
  (() => {
    const footer = qs("#footer");
    if (!footer) return;

    footer.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;

      const id = a.getAttribute("href");
      if (!id || id === "#") return;

      const target = qs(id);
      if (!target) return;

      e.preventDefault();

      const nav = qs(".navbar.sticky-top, .ip-navbar.sticky-top");
      const navH = nav ? Math.ceil(nav.getBoundingClientRect().height) : 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - (navH + 10);

      window.scrollTo({ top, behavior: "smooth" });
    });
  })();

});


/* =========================
   Pricing filter (save + smooth scroll)
   ========================= */
(() => {
  const wrap = document.querySelector("#pricing");
  if (!wrap) return;

  const buttons = Array.from(wrap.querySelectorAll(".pf-btn"));
  const items = Array.from(wrap.querySelectorAll(".pricing-item"));
  const grid = wrap.querySelector("#pricingGrid");
  const KEY = "ip_pricing_filter";

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
    const nav = document.querySelector(".ip-navbar.sticky-top, .navbar.sticky-top");
    const navH = nav ? Math.ceil(nav.getBoundingClientRect().height) : 0;
    const y = grid.getBoundingClientRect().top + window.pageYOffset - (navH + 14);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const save = (cat) => { try { localStorage.setItem(KEY, cat); } catch(e){} };
  const load = () => { try { return localStorage.getItem(KEY); } catch(e){ return null; } };

  const setFilter = (cat, doScroll) => {
    const btn = buttons.find(b => b.dataset.filter === cat) || buttons[0];
    const finalCat = btn.dataset.filter || "all";
    setActive(btn);
    apply(finalCat);
    save(finalCat);
    if (doScroll) scrollToGrid();
  };

  buttons.forEach(btn => {
    btn.addEventListener("click", () => setFilter(btn.dataset.filter, true));
  });

  const saved = load();
  if (saved && buttons.some(b => b.dataset.filter === saved)) setFilter(saved, false);
  else setFilter("all", false);
})();


