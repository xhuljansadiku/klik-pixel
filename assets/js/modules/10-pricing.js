/* Module: pricing-particles */
const initPricingParticlesModule = () => {
  const stage = qs("[data-pricing-stage]");
  if (!stage || typeof IntersectionObserver === "undefined") return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      stage.classList.toggle("is-active", entry.isIntersecting && entry.intersectionRatio > 0.35);
    });
  }, {
    threshold: [0.35, 0.6]
  });

  io.observe(stage);
};
initPricingParticlesModule();

/* Module: pricing-agency */
const initPricingAgencyModule = () => {
  const root = qs("[data-ip-pricing-agency]");
  if (!root) return;

  const billingBtns = root.querySelectorAll(".ip-pricing-agency__billing-btn");
  billingBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-billing") || "onetime";
      root.setAttribute("data-billing-mode", mode);
      billingBtns.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    });
  });

  if (typeof IntersectionObserver === "undefined") {
    root.classList.add("ip-pricing-agency--inview");
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) root.classList.add("ip-pricing-agency--inview");
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -4% 0px" }
  );
  io.observe(root);
};
initPricingAgencyModule();

/* Module: pricing-packages */
const initPricingPackagesModule = () => {
  const section = qs("#ipPricingPackages");
  if (!section) return;

  const filters = Array.from(section.querySelectorAll("[data-pkg-filter]"));
  const groups = Array.from(section.querySelectorAll("[data-pkg-group]"));
  if (!filters.length || !groups.length) return;

  const apply = (key) => {
    filters.forEach((btn) => {
      const on = (btn.getAttribute("data-pkg-filter") || "all") === key;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    groups.forEach((g) => {
      const tag = g.getAttribute("data-pkg-group") || "";
      const show = key === "all" || tag === key;
      g.classList.toggle("d-none", !show);
    });
  };

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      apply(btn.getAttribute("data-pkg-filter") || "all");
    });
  });
};
initPricingPackagesModule();

/* Process: scroll-in steps + line fill */
(() => {
  const root = qs("[data-ip-proc]");
  if (!root || typeof IntersectionObserver === "undefined") return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) root.classList.add("ip-proc--visible");
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
  );

  io.observe(root);
})();

/* Testimonials: fade-in shell on scroll */
(() => {
  const root = qs("[data-ip-testi]");
  if (!root || typeof IntersectionObserver === "undefined") return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) root.classList.add("ip-testi--visible");
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
  );

  io.observe(root);
})();

