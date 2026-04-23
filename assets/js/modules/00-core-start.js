/* ==============================
   Illyrian Pixel  main.js (clean)
   Requires: Bootstrap JS (bundle) loaded before this file
   ============================== */

/* Helpers */
const qs = (s, p = document) => p.querySelector(s);
const qsa = (s, p = document) => Array.from(p.querySelectorAll(s));
const hasBootstrap = () => typeof window.bootstrap !== "undefined";

document.addEventListener("DOMContentLoaded", () => {

  /* Follower: pikë + unazë të zeza, lerp; kursori i sistemit mbetet (jo cursor:none) */
  (() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "ip-cursor-dot";
    ring.className = "ip-cursor-ring";
    dot.setAttribute("aria-hidden", "true");
    ring.setAttribute("aria-hidden", "true");
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    let tx = -100;
    let ty = -100;
    let rx = tx;
    let ry = ty;
    let rafId = 0;
    const lerp = 0.16;
    let visible = false;

    const isTextField = (el) => {
      if (!el || el.nodeType !== 1) return false;
      const t = el.tagName;
      if (t === "TEXTAREA" || t === "SELECT") return true;
      if (t === "INPUT") {
        const type = (el.getAttribute("type") || "text").toLowerCase();
        const nonText = new Set([
          "button", "submit", "reset", "checkbox", "radio", "range", "file", "hidden", "image",
        ]);
        return !nonText.has(type);
      }
      return el.getAttribute("contenteditable") === "true";
    };

    const walkTextHost = (start) => {
      let n = start;
      while (n && n !== document.documentElement) {
        if (isTextField(n)) return n;
        n = n.parentElement;
      }
      return null;
    };

    const isHoverTarget = (start) => {
      if (!start || start.nodeType !== 1) return false;
      const el = start.closest(
        "a[href], button, .btn, [role='button'], input, label, select, summary, .nav-link, .ip-nav-link",
      );
      if (!el) return false;
      if (isTextField(el)) return false;
      if (el.tagName === "INPUT") {
        const type = (el.getAttribute("type") || "").toLowerCase();
        if (type === "hidden") return false;
      }
      return true;
    };

    const setHoverUi = (e) => {
      const under = document.elementFromPoint(e.clientX, e.clientY);
      const textHost = walkTextHost(under);
      document.body.classList.toggle("ip-cursor--text", Boolean(textHost));
      const hover = !textHost && isHoverTarget(under);
      ring.classList.toggle("is-hover", hover);
    };

    const loop = () => {
      rx += (tx - rx) * lerp;
      ry += (ty - ry) * lerp;
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      if (Math.abs(tx - rx) > 0.2 || Math.abs(ty - ry) > 0.2) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = 0;
        rx = tx;
        ry = ty;
        ring.style.transform = dot.style.transform;
      }
    };

    const queueFrame = () => {
      if (!rafId) rafId = requestAnimationFrame(loop);
    };

    document.addEventListener(
      "mousemove",
      (e) => {
        tx = e.clientX;
        ty = e.clientY;
        if (!visible) {
          visible = true;
          dot.classList.add("is-visible");
          ring.classList.add("is-visible");
        }
        setHoverUi(e);
        queueFrame();
      },
      { passive: true },
    );

    document.addEventListener("mousedown", () => {
      dot.classList.add("is-down");
      ring.classList.add("is-down");
    });
    document.addEventListener("mouseup", () => {
      dot.classList.remove("is-down");
      ring.classList.remove("is-down");
    });

    document.documentElement.addEventListener("mouseleave", () => {
      visible = false;
      dot.classList.remove("is-visible");
      ring.classList.remove("is-visible");
      document.body.classList.remove("ip-cursor--text");
      ring.classList.remove("is-hover");
    }, { passive: true });

    window.addEventListener(
      "blur",
      () => {
        visible = false;
        dot.classList.remove("is-visible");
        ring.classList.remove("is-visible");
      },
      { passive: true },
    );
  })();

  /* Hero helmet static (pa parallax/lëvizje) */
  (() => {
    const stage = qs("#heroHelmetStage");
    if (!stage) return;
    const img = qs(".hero-helmet-img", stage);
    stage.classList.remove("hero-helmet-stage--active");
    stage.style.setProperty("--hx", "50%");
    stage.style.setProperty("--hy", "42%");
    if (img) img.style.transform = "none";
  })();

  /* Footer year */
  (() => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  })();

  /* Stats: vite aktivitet (nga viti start — përditësohet çdo vit) */
  (() => {
    const el = document.getElementById("statYearsActive");
    if (!el) return;
    const start = parseInt(el.getAttribute("data-start-year") || "2020", 10);
    if (!Number.isFinite(start)) return;
    const currentYear = new Date().getFullYear();
    const years = Math.max(1, currentYear - start);
    el.textContent = `${years}+`;
  })();

  /* Footer luxe: scroll reveal + subtle parallax */
  (() => {
    const footer = qs("footer#footer.ip-footer-luxe");
    if (!footer) return;

    const parallax = qs(".ip-footer-luxe__parallax", footer);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!reduce.matches && typeof IntersectionObserver !== "undefined") {
      footer.classList.add("will-animate");
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) footer.classList.add("is-revealed");
          });
        },
        { threshold: 0.06, rootMargin: "0px 0px 12% 0px" }
      );
      io.observe(footer);
      requestAnimationFrame(() => {
        const r = footer.getBoundingClientRect();
        if (r.top < (window.innerHeight || 0) * 0.92) footer.classList.add("is-revealed");
      });
    }

    if (reduce.matches || !parallax) return;

    let raf = 0;
    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = footer.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const visible = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.85)));
        const shift = (visible - 0.35) * 22;
        parallax.style.setProperty("--ip-ft-shift", `${shift}px`);
      });
    };

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    sync();
  })();

