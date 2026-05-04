"use client";

import { FormEvent, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildWhatsAppChatHref, DEFAULT_WHATSAPP_E164 } from "@/lib/whatsappPrefill";

const services = ["Websites", "E-commerce", "Marketing", "SEO", "Branding"];
const budgets = ["< €1,000", "€1,000 – €3,000", "€3,000 – €7,000", "€7,000+"];
const timelines = ["ASAP", "2-4 javë", "1-2 muaj", "Fleksibël"];

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com";
const whatsappHref = buildWhatsAppChatHref(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_E164
);

const CARD =
  "relative overflow-hidden rounded-[1.5rem] border border-[#262626] bg-[rgba(10,10,10,0.72)] backdrop-blur-[12px]";

export default function ContactPageClient() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessName: "",
    service: services[0],
    budget: budgets[1],
    timeline: timelines[2],
    message: "",
  });

  const canSubmit = useMemo(
    () =>
      form.name.trim().length > 1 &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.businessName.trim().length > 1 &&
      form.message.trim().length > 6,
    [form]
  );

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((s) => ({ ...s, [key]: v }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      setError("Ju lutem plotësoni fushat kryesore.");
      return;
    }
    setError("");
    setSuccess(true);
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-bg pt-14 text-text md:pt-16">
        {/* Ambient radial gradients */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_8%_12%,rgba(171,131,57,0.09),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_90%_78%,rgba(171,131,57,0.06),transparent_38%)]" />

        {/* ── HERO ── */}
        <div className="mx-auto w-full max-w-[1280px] px-5 pb-0 pt-20 md:px-10 md:pt-28 lg:px-14">
          <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.28em] text-[#ab8339]/80">
            kontakt
          </p>
          <h1 className="font-display mt-4 max-w-2xl text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.93] tracking-[-0.02em] text-white">
            Na trego projektin tënd.
          </h1>
          <p className="font-ui mt-4 max-w-[50ch] text-[15px] font-light leading-relaxed tracking-[0.2px] text-[#A0A0A0]">
            Një bisedë e shkurtër. Një plan konkret. Pa obligim.
          </p>
        </div>

        {/* ── MAIN GRID ── */}
        <section className="mx-auto w-full max-w-[1280px] px-5 py-14 md:px-10 md:py-18 lg:px-14">
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.18fr]">

            {/* ── Booking card ── */}
            <article className={CARD}>
              <div className="p-6 md:p-7">
                <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ab8339]/70">
                  rezervo takim
                </p>
                <p className="font-ui mt-1.5 text-[13px] font-light tracking-[0.3px] text-[#A0A0A0]">
                  Zgjidh orën që të përshtatet — 30 minuta, pa kosto.
                </p>
              </div>
              <div className="mx-6 mb-6 overflow-hidden rounded-xl border border-[#262626] md:mx-7 md:mb-7">
                <iframe
                  title="Calendly booking"
                  src={calendlyUrl}
                  className="h-[500px] w-full"
                  loading="lazy"
                />
              </div>
            </article>

            {/* ── Form card ── */}
            <article className={CARD}>
              {/* Gold halo glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-28 -top-28 h-[26rem] w-[26rem] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(171,131,57,0.11) 0%, transparent 68%)",
                }}
              />

              <div className="relative z-[1] p-7 md:p-9">
                <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ab8339]/70">
                  project inquiry
                </p>

                {success ? (
                  <div className="mt-8 rounded-[3px] border border-[#ab8339]/30 bg-[#ab8339]/6 px-5 py-5">
                    <p className="font-display text-[1.2rem] font-medium tracking-[0.01em] text-[#ab8339]">
                      Faleminderit.
                    </p>
                    <p className="font-ui mt-2 text-[13px] font-light leading-relaxed tracking-[0.3px] text-[#A0A0A0]">
                      Kërkesa u regjistrua — do t&apos;ju kontaktojmë me plan të qartë brenda 24 orësh.
                    </p>
                  </div>
                ) : (
                  <form className="mt-7 space-y-6" onSubmit={onSubmit} noValidate>
                    <div className="grid gap-6 md:grid-cols-2">
                      <LuxInput
                        label="Emri"
                        placeholder="Si quhesh?"
                        value={form.name}
                        onChange={set("name")}
                      />
                      <LuxInput
                        label="E-mail"
                        placeholder="Email profesional..."
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                      />
                    </div>

                    <LuxInput
                      label="Emri i biznesit"
                      placeholder="Emri i kompanisë..."
                      value={form.businessName}
                      onChange={set("businessName")}
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                      <LuxSelect
                        label="Shërbimi"
                        value={form.service}
                        onChange={set("service")}
                        items={services}
                      />
                      <LuxSelect
                        label="Buxheti"
                        value={form.budget}
                        onChange={set("budget")}
                        items={budgets}
                      />
                    </div>

                    <LuxSelect
                      label="Afati kohor"
                      value={form.timeline}
                      onChange={set("timeline")}
                      items={timelines}
                    />

                    <label className="block">
                      <span className="font-display mb-2.5 block text-[0.88rem] font-medium tracking-[0.02em] text-white/78">
                        Mesazhi
                      </span>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => set("message")(e.target.value)}
                        placeholder="Na trego pak se me çfarë ke nevojë..."
                        className="font-ui w-full resize-none border-b border-[#262626] bg-transparent py-3 text-[14px] font-light leading-relaxed tracking-[0.3px] text-white outline-none transition-colors duration-300 placeholder:text-[#A0A0A0]/55 focus:border-[#ab8339]"
                      />
                    </label>

                    {error && (
                      <p className="font-ui text-[12px] font-light tracking-[0.3px] text-red-400/75">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="font-ui mt-2 w-full rounded-[2px] bg-[#ab8339] px-8 py-4 text-[12px] font-bold tracking-[1px] text-[#0a0a0a] transition-all duration-500 ease-in-out hover:shadow-[0_0_28px_rgba(171,131,57,0.45),0_0_56px_rgba(171,131,57,0.18)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Dërgoje Kërkesën →
                    </button>
                  </form>
                )}

                {/* Contact links */}
                <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-[#262626] pt-6">
                  <a
                    href="mailto:info@illyrianpixel.com"
                    className="font-ui text-[12px] font-light tracking-[0.5px] text-[#A0A0A0] transition-colors duration-300 hover:text-[#ab8339]"
                  >
                    info@illyrianpixel.com
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-ui text-[12px] font-light tracking-[0.5px] text-[#A0A0A0] transition-colors duration-300 hover:text-[#ab8339]"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://www.instagram.com/illyrianpixel"
                    target="_blank"
                    rel="noreferrer"
                    className="font-ui text-[12px] font-light tracking-[0.5px] text-[#A0A0A0] transition-colors duration-300 hover:text-[#ab8339]"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ── Luxury ghost input ────────────────────────────────────────────────────────
function LuxInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="font-display mb-2.5 block text-[0.88rem] font-medium tracking-[0.02em] text-white/78">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="font-ui w-full border-b border-[#262626] bg-transparent py-3 text-[14px] font-light tracking-[0.3px] text-white outline-none transition-colors duration-300 placeholder:text-[#A0A0A0]/55 focus:border-[#ab8339]"
      />
    </label>
  );
}

// ── Luxury ghost select ───────────────────────────────────────────────────────
function LuxSelect({
  label,
  value,
  onChange,
  items,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  items: string[];
}) {
  return (
    <label className="block">
      <span className="font-display mb-2.5 block text-[0.88rem] font-medium tracking-[0.02em] text-white/78">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-ui w-full appearance-none border-b border-[#262626] bg-transparent py-3 pr-5 text-[14px] font-light tracking-[0.3px] text-white outline-none transition-colors duration-300 focus:border-[#ab8339]"
        >
          {items.map((item) => (
            <option key={item} value={item} className="bg-[#0a0a0a] text-white">
              {item}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-[#A0A0A0]"
        >
          ↓
        </span>
      </div>
    </label>
  );
}
