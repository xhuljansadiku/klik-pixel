"use client";

import { ensureGSAP, getIsMobile, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/gsap";

export default function MagneticButtons() {
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced || getIsMobile()) return;
    const { gsap } = ensureGSAP();
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic='true']"));
    const cleanups: Array<() => void> = [];
    const movers = els.map((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" });
      return { el, xTo, yTo };
    });

    const onPointerMove = (ev: PointerEvent) => {
      movers.forEach(({ el, xTo, yTo }) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = ev.clientX - cx;
        const dy = ev.clientY - cy;
        const distance = Math.hypot(dx, dy);
        const radius = Math.max(rect.width, rect.height) * 0.5 + 50;
        if (distance > radius) {
          xTo(0);
          yTo(0);
          return;
        }

        const influence = 1 - distance / radius;
        const tx = Math.max(-12, Math.min(12, dx * 0.2 * influence));
        const ty = Math.max(-12, Math.min(12, dy * 0.2 * influence));
        xTo(tx);
        yTo(ty);
      });
    };

    const reset = () => {
      movers.forEach(({ xTo, yTo }) => {
        xTo(0);
        yTo(0);
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", reset);
    cleanups.push(() => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", reset);
    });

    return () => cleanups.forEach((dispose) => dispose());
  }, [reduced]);

  return null;
}
