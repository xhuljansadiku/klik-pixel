"use client";

import Link from "next/link";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blogPosts";
import { useReducedMotion } from "@/lib/gsap";
import { usePinnedHeroScroll } from "@/lib/usePinnedHeroScroll";

const HERO_TEXTURE =
  "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80";

export default function BlogPageClient() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroStatsRef = useRef<HTMLParagraphElement>(null);
  const heroTextureRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  usePinnedHeroScroll({
    enabled: !reduced,
    heroSectionRef,
    heroTitleRef,
    heroStatsRef,
    heroTextureRef
  });

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-bg pb-4 pt-14 text-text md:pt-16">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_8%_10%,rgba(200,155,46,0.09),transparent_30%)]" />

        <section ref={heroSectionRef} className="relative z-[1] border-b border-white/10">
          <div
            ref={heroTextureRef}
            className="pointer-events-none absolute inset-0 z-0 bg-[length:180%] bg-[position:20%_50%] opacity-0"
            style={{ backgroundImage: `url(${HERO_TEXTURE})` }}
          />
          <div className="section-wrap relative z-[1] py-20 md:py-28">
            <div className="sv-label mb-5 h-px w-[180px] bg-gradient-to-r from-accent/80 to-transparent" />
            <p className="sv-label text-[10px] uppercase tracking-[0.3em] text-accent/80">BLOG & INSIGHTS</p>
            <h1
              ref={heroTitleRef}
              data-cursor="headline"
              className="hero-headline-trigger cadence-title mt-4 max-w-4xl bg-[url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80')] bg-[length:170%] bg-[position:22%_48%] bg-clip-text font-display text-[clamp(2.55rem,7.8vw,6.9rem)] leading-[0.95] tracking-[0.01em] pb-[0.12em] text-transparent"
            >
              Ide, lajme & udhëzime.
            </h1>
            <p ref={heroStatsRef} className="mt-8 max-w-[56ch] text-base text-white/62">
              Artikuj për UX, SEO dhe rritje të qëndrueshme për biznese serioze.
            </p>
          </div>
        </section>

        <section className="relative z-[1]">
          <div className="section-wrap py-14 md:py-20">
            <div className="mt-2 space-y-5">
              {blogPosts.map((post) => (
                <article key={post.slug} className="group border-t border-white/10 pt-6">
                  <p className="text-[11px] tracking-[0.18em] text-accent/85">
                    {post.category} • {post.date}
                  </p>
                  <h2 className="mt-2 font-display text-[clamp(1.55rem,3vw,2.3rem)] leading-[1.02] text-white transition-transform duration-300 group-hover:-translate-y-[1px]">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm text-white/62">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex text-xs tracking-[0.16em] text-white/75 underline decoration-transparent underline-offset-4 transition hover:text-accent hover:decoration-accent/80"
                  >
                    Lexo më shumë
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
