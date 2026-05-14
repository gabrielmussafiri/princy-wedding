import { useState } from "react";
import { useLang } from "../i18n/LanguageContext";

// Ajoutez vos noms de fichiers ici (dans public/images/gallery/)
// Exemple : ['1.jpg', '2.jpg', 'fiancailles.jpg', ...]
const GALLERY_FILES = [
  "DSC01130.jpg.jpeg",
  "DSC01133.jpg.jpeg",
  "DSC01139.jpg.jpeg",
  "DSC01142.jpg.jpeg",
  "DSC01145.jpg.jpeg",
  "DSC01158.jpg.jpeg",
  "DSC01161.jpg.jpeg",
  "DSC01166b.jpg.jpeg",
];

// Ratio des placeholders quand aucune photo n'est disponible
const PLACEHOLDERS = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  ratio: "aspect-[9/16]",
}));

function PhotoCard({ src, alt, ratio, onClick }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`break-inside-avoid ${ratio} bg-blush-100 border border-gold-200 relative overflow-hidden rounded-lg`}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <svg
            className="w-8 h-8 text-gold-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`break-inside-avoid ${ratio} relative overflow-hidden rounded-lg group cursor-pointer`}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        onError={() => setError(true)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
    </div>
  );
}

export default function Galerie() {
  const { t } = useLang();
  const [lightbox, setLightbox] = useState(null);

  const hasPhotos = GALLERY_FILES.length > 0;

  return (
    <section id="gallery" className="py-16 px-2 md:px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="section-subtitle">{t.gallery.subtitle}</p>
          <h2 className="section-title mt-2">{t.gallery.title}</h2>
          <div className="divider-gold mt-6">
            <svg
              className="w-4 h-4 text-gold-300 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        </div>

        {hasPhotos ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {GALLERY_FILES.map((file, i) => {
              const ratio = "aspect-[9/16]";
              return (
                <PhotoCard
                  key={file}
                  src={`/images/gallery/${file}`}
                  alt={`Photo ${i + 1}`}
                  ratio={ratio}
                  onClick={() => setLightbox(i)}
                />
              );
            })}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {PLACEHOLDERS.map(({ id, ratio }) => (
                <div
                  key={id}
                  className={`break-inside-avoid ${ratio} bg-blush-100 border border-gold-200 relative overflow-hidden rounded-lg group`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center opacity-60 group-hover:opacity-80 transition-opacity">
                      <svg
                        className="w-8 h-8 text-gold-300 mx-auto mb-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-gold-400">
                        Photo
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gold-300/0 group-hover:bg-gold-300/10 transition-colors duration-300" />
                </div>
              ))}
            </div>
            <p className="text-center font-sans text-sm text-blush-500 mt-10 italic">
              {t.gallery.empty}
            </p>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream/70 hover:text-cream transition-colors"
            onClick={() => setLightbox(null)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src={`/images/gallery/${GALLERY_FILES[lightbox]}`}
            alt={`Photo ${lightbox + 1}`}
            className="max-h-[85vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {lightbox > 0 && (
            <button
              className="absolute left-4 text-cream/70 hover:text-cream transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((l) => l - 1);
              }}
            >
              <svg
                className="w-8 h-8"
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
          )}
          {lightbox < GALLERY_FILES.length - 1 && (
            <button
              className="absolute right-4 text-cream/70 hover:text-cream transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((l) => l + 1);
              }}
            >
              <svg
                className="w-8 h-8"
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
          )}
        </div>
      )}
    </section>
  );
}
