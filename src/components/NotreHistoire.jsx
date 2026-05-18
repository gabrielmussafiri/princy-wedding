import { useState, useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";

const STORY_IMAGES = [
  "/images/gallery/old1.jpeg",
  "/images/gallery/old2.jpg",
  "/images/gallery/old3.jpeg",
  "/images/gallery/old4.jpeg",
  "/images/gallery/old5.jpeg",
  "/images/gallery/old6.jpeg",
  "/images/gallery/old7.jpeg",
  "/images/gallery/old8.jpeg",
  "/images/gallery/old9.jpeg",
  "/images/gallery/old10.jpeg",
  "/images/gallery/old11.jpg",
  "/images/gallery/old12.jpeg",
  "/images/gallery/old13.jpeg",
  "/images/gallery/old14.jpeg",
  "/images/gallery/old15.jpeg",
  "/images/gallery/old15s.jpeg",
  "/images/gallery/old15ss.jpeg",
  "/images/gallery/old16.jpeg",
  "/images/gallery/old17.jpeg",
  "/images/gallery/old18.jpeg",
  "/images/gallery/old19.jpeg",
  "/images/gallery/old20.jpg",
];

export default function NotreHistoire() {
  const { t } = useLang();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % STORY_IMAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const prev = () =>
    setCurrentIndex((i) => (i - 1 + STORY_IMAGES.length) % STORY_IMAGES.length);
  const next = () => setCurrentIndex((i) => (i + 1) % STORY_IMAGES.length);

  return (
    <section id="story" className="pt-20 pb-16 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* En-tête centré */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <svg
              width="60"
              height="30"
              viewBox="0 0 60 30"
              fill="none"
              className="text-gold-300"
            >
              <path
                d="M0 15 Q15 0 30 15 Q45 30 60 15"
                stroke="currentColor"
                strokeWidth="0.8"
                fill="none"
              />
              <circle cx="30" cy="15" r="2" fill="currentColor" />
            </svg>
          </div>
          <p className="section-subtitle mb-4">{t.story.subtitle}</p>
          <h2 className="section-title mb-2">{t.story.title}</h2>
          <div className="divider-gold">
            <svg
              className="w-4 h-4 text-gold-300 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
            </svg>
          </div>
        </div>

        {/* Grille deux colonnes */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Texte — ordre 2 mobile, ordre 1 desktop */}
          <div className="space-y-6 order-2 lg:order-1">
            {t.story.body.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-charcoal/80 leading-relaxed italic"
              >
                {para}
              </p>
            ))}
            <p className="hidden lg:block font-script text-3xl text-gold-300/70 mt-4">
              L & P
            </p>
          </div>

          {/* Slider — ordre 1 mobile, ordre 2 desktop */}
          <div className="relative group order-1 lg:order-2">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden border border-gold-200 bg-blush-100">
              {STORY_IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Lihiolia & Princy — ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                    i === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Flèche gauche */}
              <button
                onClick={prev}
                aria-label="Image précédente"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center border border-gold-300/70 bg-cream/80 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-cream hover:border-gold-400"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Flèche droite */}
              <button
                onClick={next}
                aria-label="Image suivante"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center border border-gold-300/70 bg-cream/80 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-cream hover:border-gold-400"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Coins décoratifs */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-gold-300 pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-gold-300 pointer-events-none" />

            {/* Points indicateurs */}
            <div className="flex justify-center gap-2 mt-5">
              {STORY_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Image ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentIndex
                      ? "w-6 h-1.5 bg-gold-400"
                      : "w-1.5 h-1.5 bg-gold-200 hover:bg-gold-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
