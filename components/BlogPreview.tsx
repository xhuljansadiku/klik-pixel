import Link from "next/link";
import SectionMark from "@/components/SectionMark";
import { blogPosts } from "@/lib/blogPosts";

const categoryPillClass: Record<string, string> = {
  Rritje:
    "border-emerald-100/60 bg-[linear-gradient(180deg,rgba(227,255,246,0.98),rgba(210,247,236,0.95))] text-emerald-800",
  UX: "border-indigo-100/60 bg-[linear-gradient(180deg,rgba(244,242,255,0.98),rgba(231,226,255,0.95))] text-indigo-800",
  SEO: "border-amber-100/65 bg-[linear-gradient(180deg,rgba(255,249,235,0.98),rgba(248,236,205,0.95))] text-amber-800",
  Strategji:
    "border-orange-100/55 bg-[linear-gradient(180deg,rgba(255,247,237,0.98),rgba(254,235,215,0.95))] text-orange-950"
};

export default function BlogPreview() {
  return (
    <section id="blog-preview" className="cinematic-section section-tone-about border-t border-white/[0.08] !min-h-0 py-0 md:!min-h-0">
      <div className="section-wrap py-24 md:py-30">
        <SectionMark label="BLOG & INSIGHTS" />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title mt-3 max-w-4xl">Ide, lajme & udhëzime.</h2>
            <p className="mt-3 text-sm text-white/62 md:text-base">Gjëra që ia vlen t&apos;i dini.</p>
          </div>
          <Link href="/blog" className="luxury-link">
            Shiko të gjitha <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="mt-10 space-y-5">
          {blogPosts.slice(0, 3).map((post) => (
            <article key={post.slug} className="group border-t border-white/10 pt-6">
              <p
                className={`inline-flex rounded-full border px-4 py-[7px] text-[0.8rem] font-semibold uppercase leading-none tracking-[0.08em] ${
                  categoryPillClass[post.category] ?? "border-accent/30 bg-accent/10 text-accent/90"
                }`}
              >
                {post.category}
              </p>
              <h3 className="mt-2 font-display text-[clamp(1.55rem,3vw,2.3rem)] leading-[1.02] text-white transition-transform duration-300 group-hover:-translate-y-[1px]">
                {post.title}
              </h3>
              <p className="mt-2 max-w-3xl whitespace-pre-line text-sm text-white/62">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="luxury-link mt-4">
                Lexo më shumë <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
