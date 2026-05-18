export default function Interlude() {
  return (
    <section
      className="relative py-24 md:py-40"
      style={{
        backgroundImage: "url('/images/gallery/DSC01103.jpg.jpeg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Voile sombre */}
      <div className="absolute inset-0 bg-charcoal/65" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 px-6 max-w-5xl mx-auto">
        {/* Photo encadrée — DSC01103 */}
        <div className="relative flex-shrink-0">
          <div className="absolute -top-3 -left-3 w-14 h-14 border-t border-l border-gold-300 pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 w-14 h-14 border-b border-r border-gold-300 pointer-events-none" />
          <img
            src="/images/gallery/DSC01125.jpg.jpeg"
            alt="Lihiolia & Princy"
            className="w-52 md:w-68 aspect-[3/4] object-cover object-top border border-gold-300/40"
          />
        </div>

        {/* Texte */}
        <div className="text-center md:text-left space-y-5">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold-200">
            29 Août 2026
          </p>
          <p className="font-script text-5xl md:text-6xl text-white leading-tight">
            Lihiolia &amp; Princy
          </p>
          <div className="w-10 h-px bg-gold-300 mx-auto md:mx-0" />
          <p className="font-serif text-base md:text-lg text-white/75 italic leading-relaxed max-w-xs">
            « Deux âmes, une même promesse, pour la vie. »
          </p>
        </div>
      </div>
    </section>
  );
}
