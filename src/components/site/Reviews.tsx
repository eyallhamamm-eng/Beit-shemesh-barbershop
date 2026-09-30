import { motion } from "framer-motion";
import { ArrowUpLeft, Quote } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { BUSINESS, googleReviewsHref } from "@/lib/business";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading, Stars, staggerChild, staggerParent, useMotionReduced } from "./primitives";

const Reviews = () => {
  const { t, lang } = useLang();
  const reduce = useMotionReduced();

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="theme-dark relative overflow-hidden py-24 sm:py-32">
      <div className="container-editorial">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="reviews-title" title={t.reviews.title} />
          <Reveal delay={0.1}>
            <div className="flex items-center gap-6 rounded-lg border border-brass/30 bg-ink-soft px-7 py-5">
              <span className="font-display text-7xl font-bold leading-none text-brass" aria-hidden="true">
                {BUSINESS.googleRating}
              </span>
              <div>
                <Stars className="text-brass [&_svg]:h-5 [&_svg]:w-5" />
                <p className="mt-2 font-semibold">
                  <span className="sr-only">{t.common.ratingAria}. </span>
                  <span aria-hidden="true">{t.reviews.ratingLabel}</span>
                </p>
                <a
                  href={googleReviewsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-1 inline-flex items-center gap-1 text-sm text-stone hover:text-bone"
                >
                  <span className="link-underline">{t.reviews.readAll}</span>
                  <span className="sr-only">{t.common.opensNewTab}</span>
                  <ArrowUpLeft aria-hidden="true" className="h-4 w-4 ltr:-scale-x-100" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <motion.ul
          variants={staggerParent}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-12"
        >
          {t.reviews.items.map((r, i) => (
            <motion.li
              key={r.author}
              variants={staggerChild}
              className={cn(
                "relative flex flex-col rounded-lg border border-bone/10 bg-ink-soft p-7 transition-colors duration-300 hover:border-brass/40 sm:p-9",
                i === 0 ? "md:col-span-2 lg:col-span-6 lg:row-span-2" : "lg:col-span-6",
              )}
            >
              <Quote aria-hidden="true" className="h-9 w-9 text-brass/70 ltr:-scale-x-100" strokeWidth={1.5} />
              <figure className="mt-5 flex flex-1 flex-col">
                {/* Reviews are quoted verbatim in Hebrew; the English site shows a faithful translation. */}
                <blockquote
                  lang={lang}
                  className={cn(
                    "flex-1 whitespace-pre-line font-display leading-relaxed text-bone",
                    i === 0 ? "text-2xl sm:text-[1.75rem]" : "text-xl",
                  )}
                >
                  {r.text}
                </blockquote>
                <figcaption className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-bone/10 pt-5">
                  <span>
                    <span className="block font-semibold text-bone" dir="auto">
                      {r.author}
                    </span>
                    <span className="text-sm text-stone">
                      {t.reviews.source}
                      {t.reviews.translatedNote && ` · ${t.reviews.translatedNote}`}
                    </span>
                  </span>
                  <Stars className="text-brass" />
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Reviews;
