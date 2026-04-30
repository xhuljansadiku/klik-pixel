import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalCTA from "@/components/GlobalCTA";
import type { ServiceCategory } from "@/lib/serviceCategories";

export default function ServiceCategoryDetailPage({ category }: { category: ServiceCategory }) {
  return (
    <>
      <Navbar />
      <main className="bg-bg text-text pt-14 md:pt-16">
        <section className="border-b border-white/10">
          <div className="section-wrap py-20 md:py-28">
            <div className="mb-5 h-px w-[180px] bg-gradient-to-r from-accent/80 to-transparent" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent/80">SHËRBIMET</p>
            <h1 className="mt-4 max-w-5xl font-display text-[clamp(2.2rem,5.8vw,4.8rem)] leading-[0.93]">{category.title}</h1>
            <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-white/66">{category.headline}</p>
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="section-wrap py-16 md:py-20">
            <article className="rounded-[1rem] border border-accent/35 bg-[linear-gradient(140deg,rgba(200,155,46,0.1),rgba(12,12,12,0.95)_56%)] p-7 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-accent/92">Për biznesin tuaj</p>
              <p className="mt-3 max-w-[64ch] text-sm leading-relaxed text-white/78 md:text-base">{category.description}</p>
            </article>

            <div className="mt-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-accent/88">Përfshin</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {category.subServices.map((item) => (
                  <span key={item} className="rounded-full border border-white/14 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-white/74">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Link href="/sherbimet" className="luxury-link">
                Kthehu te kategoritë e shërbimeve <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        <GlobalCTA title="Nisemi nga kategoria e duhur për biznesin tuaj." />
      </main>
      <Footer />
    </>
  );
}
