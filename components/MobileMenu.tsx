"use client";

import { useEffect } from "react";
import Link from "next/link";

type NavItem = { id: string; label: string; href: string; sectionId?: string };

type Props = {
  isOpen: boolean;
  navItems: NavItem[];
  active: string;
  onClose: () => void;
  onNavigate: (item: NavItem) => void;
};

export default function MobileMenu({ isOpen, navItems, active, onClose, onNavigate }: Props) {

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-[#0b0b0b]/94 backdrop-blur-xl">
      <div className="flex h-full flex-col px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-center justify-between">
          <p className="text-[11px] tracking-[0.2em] text-accent/80">MENU</p>
          <button aria-label="Mbyll menunë" onClick={onClose} className="text-2xl text-white/82">
            ×
          </button>
        </div>
        <div className="mt-5 flex flex-1 flex-col gap-3.5">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => onNavigate(item)}
              className={`text-left font-display text-[clamp(1.8rem,7.6vw,2.25rem)] leading-[0.95] ${
                active === item.id ? "text-accent" : "text-white/86"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
            onClose();
          }}
          className="mt-3 inline-flex items-center justify-center rounded-full border border-accent/70 bg-accent px-5 py-2.5 text-[11px] tracking-[0.14em] text-black"
        >
          Nis projektin
        </button>
      </div>
    </div>
  );
}
