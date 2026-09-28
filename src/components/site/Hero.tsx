import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { BUSINESS, directionsHref, telHref, whatsappHref } from "@/lib/business";
import { HERO_IMAGE } from "@/content/images";
import { WhatsAppIcon } from "./BrandIcons";
import { EASE_OUT, ImageSlot, OpenStatus, Stars, useMotionReduced } from "./primitives";

const Hero = () => {
  const { t, lang } = useLang();
  const reduce = useMotionReduced();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImage = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
    const yNumeral = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);

  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 32, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, ease: EASE_OUT, delay: 0.15 + i * 0.09 },
        };

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="theme-dark grain relative isolate overflow-hidden pb-20 pt-[calc(var(--header-h)+2.5rem)] lg:min-h-[100svh] lg:pb-28 lg:pt-[calc(var(--header-h)+4rem)]"
    >
      {/* Atmosphere: warm lamp glow + a giant "3" for Herzl 3. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 end-[-10%] -z-10 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(closest-side,hsl(var(--brass)/0.22),transparent)]"
      />
      <motion.span
        aria-hidden="true"
        style={{ y: yNumeral }}
        className="pointer-events-none absolute -bottom-24 start-[-4%] -z-10 select-none font-display text-[26rem] font-black leading-none text-transparent [-webkit-text-stroke:1px_hsl(var(--brass)/0.18)] sm:text-[34rem]"
      >
        3
      </motion.span>

      <div className="container-editorial grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">

          <h1 id="hero-title" className="font-display">
            <motion.span {...item(1)} className="block text-lg font-medium tracking-wide text-stone sm:text-xl">
              {t.hero.titleLead}
            </motion.span>
            <motion.span
              {...item(2)}
              className="mt-3 block text-[clamp(3.1rem,9vw,7.25rem)] font-bold leading-[0.95] tracking-tight"
            >
              {t.hero.titleLine1}
            </motion.span>
            <motion.span
              {...item(3)}
              className="block text-[clamp(3.1rem,9vw,7.25rem)] font-bold italic leading-[1.02] tracking-tight text-brass"
            >
              {t.hero.titleLine2}
            </motion.span>
          </h1>

          <motion.p {...item(4)} className="mt-8 max-w-xl text-lg leading-relaxed text-stone sm:text-xl">
            {t.hero.lead}
          </motion.p>

          <motion.div {...item(5)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
            {...item(6)}
            className="mt-10 flex flex-col gap-4 border-t border-bone/10 pt-6 text-[0.95rem] text-bone/90 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8"
          >
            <li className="flex items-center gap-2.5">
              <span className="font-display text-2xl font-bold text-bone">{BUSINESS.googleRating}</span>
              <Stars className="text-brass" />
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
                <MapPin aria-hidden="true" className="h-4 w-4 text-brass" />
                {BUSINESS.address[lang]}
              </a>
            </li>
          </motion.ul>
        </div>

        {/* Visual: arched photo frame with layered depth. */}
        <div className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-[24rem]">
          <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rtl:-translate-x-4">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.3 }}
              className="h-full w-full rounded-t-full border border-brass/40"
            />
          </div>
          <motion.div
            style={{ y: yImage }}
            initial={reduce ? false : { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0 round 999px 999px 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0 round 999px 999px 0 0)" }}
            transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.25 }}
            className="relative overflow-hidden rounded-t-full shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-bone/10"
          >
            <ImageSlot
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt[lang]}
              width={HERO_IMAGE.width}
              height={HERO_IMAGE.height}
              eager
            />
          </motion.div>

          {/* Barber-pole column. */}
          <motion.div
            aria-hidden="true"
            initial={reduce ? false : { opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 0.7 }}
            className="absolute -end-3 top-[18%] h-44 w-4 origin-top overflow-hidden rounded-full ring-1 ring-brass/60 sm:-end-5 sm:w-5"
          >
            <span className="barber-stripes absolute inset-0" />
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#gallery"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 start-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-stone hover:text-bone rtl:translate-x-1/2 lg:flex"
      >
        {t.hero.scroll}
        <ArrowDown aria-hidden="true" className="h-4 w-4 motion-safe:animate-bounce" />
      </motion.a>
    </section>
  );
};

export default Hero;
