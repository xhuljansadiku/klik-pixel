"use client";

import { ensureGSAP, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/gsap";

export default function GlobalReveals() {
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;
    const { gsap, ScrollTrigger } = ensureGSAP();
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(
        ".cinematic-section .section-title, .cinematic-section .premium-card, .cinematic-section article, .cinematic-section .luxury-link"
      );

      targets
        .filter((el) => !el.closest("#hero"))
        .forEach((el) => {
          if (el.dataset.revealed === "1") return;
          el.dataset.revealed = "1";
          gsap.fromTo(
            el,
            { opacity: 0, y: 26, filter: "blur(5px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true
              }
            }
          );
        });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [reduced]);

  return null;
}
