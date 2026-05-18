export default function Interlude() {
  return (
    <section
      className="relative py-24 md:py-40 bg-scroll md:bg-fixed"
      style={{
        backgroundImage: "url('/images/gallery/DSC01103.jpg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Voile sombre */}
      <div className="absolute inset-0 bg-charcoal/65" />

      <div className="relative z-10 flex items-center justify-center px-6 max-w-5xl mx-auto">
        <div className="text-center space-y-5">
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
