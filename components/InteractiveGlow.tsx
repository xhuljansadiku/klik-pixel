"use client";

import { useRef } from "react";
import { getIsMobile, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/gsap";

export default function InteractiveGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!glowRef.current || reduced || getIsMobile()) return;
    const glow = glowRef.current;

    const onMove = (event: PointerEvent) => {
      glow.style.setProperty("--gx", `${event.clientX}px`);
      glow.style.setProperty("--gy", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  return <div ref={glowRef} className="interactive-spotlight pointer-events-none fixed inset-0 z-[2]" aria-hidden />;
}
