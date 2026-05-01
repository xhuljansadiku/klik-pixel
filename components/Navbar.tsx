"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ensureGSAP, useIsomorphicLayoutEffect } from "@/lib/gsap";
import MobileMenu from "@/components/MobileMenu";

const navItems = [
  { id: "hero", label: "Home", href: "/", sectionId: "hero" },
  { id: "services", label: "Sherbimet", href: "/sherbimet", sectionId: "services" },
  { id: "featured-work", label: "Projektet", href: "/projektet", sectionId: "featured-work" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "contact", label: "Kontakt", href: "/contact", sectionId: "cta" }
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const activeFromPath = (() => {
    if (pathname === "/") return "hero";
    if (pathname.startsWith("/services") || pathname.startsWith("/sherbimet")) return "services";
    if (pathname.startsWith("/work") || pathname.startsWith("/projektet")) return "featured-work";
    if (pathname.startsWith("/blog")) return "blog";
    if (pathname.startsWith("/contact")) return "contact";
    return "hero";
  })();
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState(activeFromPath);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionItems = useMemo(() => navItems.filter((item) => item.sectionId), []);

  useIsomorphicLayoutEffect(() => {
    const { ScrollTrigger } = ensureGSAP();
    const triggers: ScrollTrigger[] = [];
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (pathname !== "/") return;
    sectionItems.forEach((item) => {
      const el = document.getElementById(item.sectionId!);
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(item.id),
        onEnterBack: () => setActive(item.id)
      });
      triggers.push(st);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [pathname, sectionItems]);

  useIsomorphicLayoutEffect(() => {
    setActive(activeFromPath);
  }, [activeFromPath]);

  const navigate = (item: (typeof navItems)[number]) => {
    router.push(item.href);
    setActive(item.id);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          isScrolled ? "border-b border-white/[0.05] bg-[#0b0b0b]/72 backdrop-blur-[12px]" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-5 md:h-[72px] md:px-10 lg:px-14">
          <button
            onClick={(e) => {
              if (e.altKey) {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("ip-easter-egg"));
                return;
              }
              navigate(navItems[0]);
            }}
            className="inline-flex items-center"
            aria-label="Shko te fillimi (Alt+klik për surprizë të vogël)"
          >
            <span className="inline-flex max-w-[240px] items-center gap-[10px] whitespace-nowrap transition-all duration-300 hover:-translate-y-[1px] hover:opacity-90">
              <Image
                src="/images/logo.png"
                alt="Illyrian Pixel"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="inline-flex items-center whitespace-nowrap text-[18px] tracking-[0.12em] text-white">
                <span className="mr-[6px] opacity-70">ILLYRIAN</span>
                <span className="font-semibold">PIXEL</span>
              </span>
            </span>
          </button>
          {/* end brand */}
          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item);
                }}
                className={`text-sm tracking-[0.08em] transition-colors duration-300 ${
                  active === item.id ? "text-accent" : "text-white/64 hover:text-white/88"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-inquiry-modal"))}
              data-magnetic="true"
              className="hidden rounded-full border border-accent/65 bg-accent px-4 py-2 text-[11px] tracking-[0.12em] text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(200,155,46,0.25)] md:inline-flex"
            >
              Nis projektin
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 lg:hidden"
              aria-label="Hap menunë"
            >
              <span className="text-lg leading-none">☰</span>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        navItems={navItems}
        active={active}
        onClose={() => setMobileOpen(false)}
        onNavigate={navigate}
      />
    </>
  );
}







