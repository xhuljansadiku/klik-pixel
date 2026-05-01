"use client";

import type { RefObject } from "react";
import { ensureGSAP, useIsomorphicLayoutEffect } from "@/lib/gsap";

type PinnedHeroScrollOptions = {
  /** When false, skip all hero motion (handled by caller via useReducedMotion). */
  enabled: boolean;
  /** Section that pins + drives scrub; also GSAP context root. */
  heroSectionRef: RefObject<HTMLElement | null>;
  heroTitleRef: RefObject<HTMLElement | null>;
  heroStatsRef: RefObject<HTMLElement | null>;
  heroTextureRef: RefObject<HTMLElement | null>;
  /** Bump when hero content remounts (e.g. Work project list length). */
  refreshKey?: string | number;
};

export function usePinnedHeroScroll({
  enabled,
  heroSectionRef,
  heroTitleRef,
  heroStatsRef,
  heroTextureRef,
  refreshKey
}: PinnedHeroScrollOptions) {
  useIsomorphicLayoutEffect(() => {
    if (!enabled) return;
    const { gsap, ScrollTrigger } = ensureGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(".sv-label", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.05 });

      const title = heroTitleRef.current;
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 48, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.05, ease: "power3.out", delay: 0.15 }
        );
      }

      const stats = heroStatsRef.current;
      if (stats) {
        gsap.fromTo(stats, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.5 });
      }

      const section = heroSectionRef.current;
      if (section && title && window.matchMedia("(min-width: 900px)").matches) {
        gsap.to(title, {
          scale: 0.88,
          transformOrigin: "left top",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: section,
            pinSpacing: true
          }
        });
      }

      const texture = heroTextureRef.current;
      if (texture && section) {
        gsap.to(texture, {
          backgroundPositionX: "68%",
          backgroundPositionY: "44%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });
      }

      ScrollTrigger.refresh();
    }, heroSectionRef);

    return () => ctx.revert();
  }, [enabled, refreshKey]);
}
