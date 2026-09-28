import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { BUSINESS, directionsHref, telHref, whatsappHref } from "@/lib/business";
import { HERO_IMAGE } from "@/content/images";
import { WhatsAppIcon } from "./BrandIcons";
import { EASE_OUT, OpenStatus, Stars, useMotionReduced } from "./primitives";

/** Full-bleed shop photo with the headline and actions set over a dark gradient. */
const Hero = () => {
  const { t, lang } = useLang();
  const reduce = useMotionReduced();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);

  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE_OUT, delay: 0.2 + i * 0.08 },
        };

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="theme-dark relative isolate flex min-h-[88svh] items-end overflow-hidden pb-14 pt-[calc(var(--header-h)+3rem)] sm:pb-20"
    >
      {/* Background photo (decorative framing of the same cut shown in the gallery). */}
      <motion.div style={{ y: yImage }} className="absolute inset-0 -z-20">
        {HERO_IMAGE.src && (
          <img
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt[lang]}
            width={HERO_IMAGE.width}
            height={HERO_IMAGE.height}
            className="h-[115%] w-full object-cover object-[center_42%]"
          />
        )}
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-l from-ink/70 via-transparent to-transparent ltr:bg-gradient-to-r"
      />

      <div className="container-editorial">
        <div className="max-w-2xl">
          <h1 id="hero-title" className="font-display">
            <motion.span {...item(0)} className="block text-base font-medium text-stone sm:text-lg">
              {t.hero.titleLead}
            </motion.span>
            <motion.span
              {...item(1)}
              className="mt-3 block text-[clamp(2.9rem,8vw,6rem)] font-bold leading-[1] tracking-tight"
            >
              {t.hero.titleLine1} <span className="text-stone">{t.hero.titleLine2}</span>
            </motion.span>
          </h1>

          <motion.p {...item(2)} className="mt-6 max-w-lg text-lg leading-relaxed text-bone/85">
            {t.hero.lead}
          </motion.p>

          <motion.div {...item(3)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={whatsappHref(t.booking.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brass px-7 text-[1.05rem]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t.common.bookWhatsapp}
              <span className="sr-only">{t.common.opensNewTab}</span>
            </a>
            <a href={telHref} aria-label={t.common.callAria} className="btn-ghost-dark px-7 text-[1.05rem]">
              <Phone aria-hidden="true" className="h-5 w-5" />
              {t.common.call}
              <span dir="ltr" className="tabular-nums">
                {BUSINESS.phoneDisplay}
              </span>
            </a>
          </motion.div>

          <motion.ul
            {...item(4)}
            className="mt-8 flex flex-col gap-3 text-[0.95rem] text-bone/90 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7"
          >
            <li className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-bone">{BUSINESS.googleRating}</span>
              <Stars className="text-bone" />
              <span className="sr-only">{t.common.ratingAria}</span>
              <span aria-hidden="true" className="text-stone">
                {t.common.googleRating}
              </span>
            </li>
            <li>
              <OpenStatus />
            </li>
            <li>
              <a
                href={directionsHref(lang)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.visit.addressAria} ${t.common.opensNewTab}`}
                className="link-underline inline-flex items-center gap-2"
              >
                <MapPin aria-hidden="true" className="h-4 w-4" />
                {BUSINESS.address[lang]}
              </a>
            </li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
