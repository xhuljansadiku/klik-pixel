"use client";

import { useRef } from "react";
import { ensureGSAP, useIsomorphicLayoutEffect } from "@/lib/gsap";
import SectionMark from "@/components/SectionMark";

const quotes = [
  {
    quote:
      "Na ndihmoi shumë mënyra si u organizua përmbajtja e faqes. Klientët e kuptojnë më shpejt çfarë bëjmë dhe bisedat që vijnë janë më konkrete.",
    name: "Mariglent S.",
    company: "ESM Group",
    result: "Costa Volpino, Itali"
  },
  {
    quote:
      "Procesi ishte i qartë nga fillimi në fund. Prezantimi i paketave dhe mesazhi i brandit personal tani duken më profesionalë dhe më të besueshëm.",
    name: "Bardhi U.",
    company: "Bardhi Wellness",
    result: "Prishtinë, Kosovë · Koln, Gjermani"
  },
  {
    quote:
      "Na pëlqeu që faqja u bë e thjeshtë për t'u kuptuar. Vizitorët gjejnë shpejt shërbimin që u duhet dhe kërkesat vijnë më të sakta.",
    name: "Amir S.",
    company: "Hauswerk Niederbayern",
    result: "Straubing, Gjermani"
  },
  {
    quote:
      "Që nga përditësimi i faqes, klientët na kontaktojnë me pritshmëri më të qarta. Projeket dhe vlerësimet e klientëve japin besim që në kontaktin e parë.",
    name: "Vehbi P.",
    company: "Palushi Brothers",
    result: "London, Mbretëri e Bashkuar"
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    const { gsap } = ensureGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-reveal",
        { opacity: 0, y: 24, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="cinematic-section section-tone-about">
      <div className="section-wrap">
        <div className="testimonial-reveal">
          <SectionMark label="ZËRI I KLIENTËVE" />
        </div>
        <h2 className="testimonial-reveal section-title mt-3 max-w-4xl">Fjalët e tyre.</h2>
        <div className="mt-10 space-y-8">
          {quotes.map((item) => (
            <article key={item.name} className="testimonial-reveal relative border-t border-white/10 pt-7">
              <span className="pointer-events-none absolute left-0 top-4 font-display text-6xl leading-none text-accent/18">“</span>
              <p className="max-w-4xl pl-6 text-[1.1rem] leading-relaxed text-white/84 md:text-[1.35rem]">{item.quote}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 pl-6 text-sm text-white/62">
                <span className="text-white/88">{item.name}</span>
                <span>•</span>
                <span>{item.company}</span>
                <span className="rounded-full border border-accent/30 px-2 py-0.5 text-accent/85">{item.result}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
