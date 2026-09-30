import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { GALLERY, type SiteImage } from "@/content/images";
import { ImageSlot, Reveal, SectionHeading } from "./primitives";

const columnCount = () => {
  if (typeof window === "undefined") return 2;
  if (window.matchMedia("(min-width: 1024px)").matches) return 4;
  if (window.matchMedia("(min-width: 768px)").matches) return 3;
  return 2;
};

const useColumnCount = () => {
  const [count, setCount] = useState(columnCount);
  useEffect(() => {
    const onResize = () => setCount(columnCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return count;
};

/** Greedy masonry: each photo goes into the currently shortest column, so column lengths stay even. */
const distribute = (images: SiteImage[], count: number) => {
  const cols: SiteImage[][] = Array.from({ length: count }, () => []);
  const heights = new Array(count).fill(0);
  for (const img of images) {
    const i = heights.indexOf(Math.min(...heights));
    cols[i].push(img);
    heights[i] += img.height / img.width;
  }
  return cols;
};

/**
 * Every photo keeps its natural aspect ratio (w-full h-auto, no object-fit, no fixed heights),
 * so nothing is ever cropped.
 */
const Gallery = () => {
  const { t, lang } = useLang();
  const columns = distribute(GALLERY, useColumnCount());

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="theme-light bg-paper py-24 sm:py-32">
      <div className="container-editorial">
        <SectionHeading id="gallery-title" tone="light" title={t.gallery.title} />

        <div className="mt-14 flex items-start gap-4 md:gap-5 lg:gap-6">
          {columns.map((col, c) => (
            <ul key={c} className="flex min-w-0 flex-1 flex-col gap-4 md:gap-5 lg:gap-6">
              {col.map((img, i) => (
                <li key={img.src ?? i}>
                  <Reveal delay={c * 0.06} y={20}>
                    <figure className="overflow-hidden rounded-md ring-1 ring-ink/5">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
