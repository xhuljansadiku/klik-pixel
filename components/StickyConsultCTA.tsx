"use client";

function openModal() {
  window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
}

export default function StickyConsultCTA() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:justify-end md:px-8">
      <button
        type="button"
        onClick={openModal}
        className="pointer-events-auto interactive-button ip-cta-primary shadow-[0_12px_40px_rgba(0,0,0,0.45)] !h-11 !rounded-full !px-6 !text-[11px] !tracking-[0.12em] !text-[#0e0d0c]"
      >
        Rezervo konsultë
      </button>
    </div>
  );
}
