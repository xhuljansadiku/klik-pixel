/* Footer: smooth scroll + deep-link service */
(() => {
  const footer = qs("#footer");
  if (!footer) return;

  const scrollToId = (id) => {
    const target = qs(id);
    if (!target) return;

    const nav = qs(".ip-navbar");
    const navH = nav ? Math.ceil(nav.getBoundingClientRect().height) : 0;
    const y = target.getBoundingClientRect().top + window.pageYOffset - (navH + 12);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  footer.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href || href === "#") return; // S& mos e prish JS

    e.preventDefault();

    // optional: ruaj service choice kur klikohen linket te SShërbime⬝
    const sv = a.getAttribute("data-service");
    if (sv) {
      try { localStorage.setItem("ip_services_focus", sv); } catch (err) {}
    }

    scrollToId(href);
  });
})();



