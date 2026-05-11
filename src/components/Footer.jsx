export default function Footer() {
  return (
    <footer className="bg-charcoal py-12 px-6 text-center">
      <p className="font-script text-3xl text-gold-300 mb-3">Lihiolia & Princy</p>
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-cream/30 mb-6">29 Août 2026</p>
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="w-16 h-px bg-gold-300/30" />
        <svg className="w-3 h-3 text-gold-300/50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
        </svg>
        <div className="w-16 h-px bg-gold-300/30" />
      </div>
      <p className="font-sans text-xs text-cream/30 mb-1">
        Fait avec amour par{' '}
        <a
          href="https://www.linkedin.com/in/gabriel-godlive-m-7018aa244/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold-300 hover:text-gold-200 transition-colors underline underline-offset-2"
        >
          Godlive Gabriel M.
        </a>
      </p>
      <p className="font-sans text-xs text-cream/20">
        <a
          href="tel:+27601214105"
          className="hover:text-cream/40 transition-colors"
        >
          +27 60 121 4105
        </a>
      </p>
    </footer>
  )
}
