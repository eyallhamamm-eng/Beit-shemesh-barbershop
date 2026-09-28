import { useLang } from "@/i18n/LanguageContext";
import { GALLERY } from "@/content/images";
import { ImageSlot, Reveal, SectionHeading } from "./primitives";

/**
 * Masonry via CSS columns: every photo keeps its natural aspect ratio (w-full h-auto,
 * no object-fit, no fixed heights), and break-inside-avoid keeps each tile whole.
 */
const Gallery = () => {
  const { t, lang } = useLang();

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="theme-light bg-paper py-24 sm:py-32">
      <div className="container-editorial">
        <SectionHeading id="gallery-title" tone="light" title={t.gallery.title} />

        <ul className="mt-14 columns-2 [column-gap:1rem] md:columns-3 md:[column-gap:1.25rem] lg:columns-4 lg:[column-gap:1.5rem]">
          {GALLERY.map((img, i) => (
            <li key={i} className="mb-4 break-inside-avoid md:mb-5 lg:mb-6">
              <Reveal delay={(i % 4) * 0.06} y={20}>
                <figure className="overflow-hidden rounded-xl shadow-[0_18px_40px_-22px_rgba(21,18,15,0.55)] ring-1 ring-ink/5">
                  <ImageSlot
                    src={img.src}
                    alt={img.alt[lang]}
                    width={img.width}
                    height={img.height}
                    tone="light"
                    className="transition-transform duration-500 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.02]"
                  />
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Gallery;
