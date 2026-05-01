"use client";

import { createElement, useLayoutEffect, useRef, useState, type ReactNode } from "react";

type FitOneLineHeadingProps = {
  as?: "h2" | "h3";
  className?: string;
  children: ReactNode;
  minRem?: number;
  maxRem?: number;
};

export default function FitOneLineHeading({
  as = "h3",
  className = "",
  children,
  minRem = 0.78,
  maxRem = 2.65
}: FitOneLineHeadingProps) {
  const elRef = useRef<HTMLHeadingElement>(null);
  const [rem, setRem] = useState(maxRem);

  useLayoutEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const fit = () => {
      const w = el.clientWidth;
      if (w <= 0) {
        requestAnimationFrame(fit);
        return;
      }

      el.style.whiteSpace = "nowrap";
      let lo = minRem;
      let hi = maxRem;
      for (let i = 0; i < 22; i++) {
        const mid = (lo + hi) / 2;
        el.style.fontSize = `${mid}rem`;
        void el.offsetWidth;
        if (el.scrollWidth <= w + 1) lo = mid;
        else hi = mid;
      }
      setRem(lo);
    };

    fit();

    const parent = el.parentElement;
    const ro = new ResizeObserver(fit);
    if (parent) ro.observe(parent);
    return () => ro.disconnect();
  }, [children, minRem, maxRem]);

  return createElement(
    as,
    {
      ref: elRef,
      className,
      style: { fontSize: `${rem}rem`, whiteSpace: "nowrap" as const }
    },
    children
  );
}
