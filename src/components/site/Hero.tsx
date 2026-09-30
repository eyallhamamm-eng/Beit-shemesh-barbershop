import { motion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";
import { useRef } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { BUSINESS, directionsHref, telHref, whatsappHref } from "@/lib/business";
import { HERO_IMAGE } from "@/content/images";
import { WhatsAppIcon } from "./BrandIcons";
import { EASE_OUT, ImageSlot, OpenStatus, useMotionReduced } from "./primitives";

const Hero = () => {
  const { t, lang } = useLang();
  const reduce = useMotionReduced();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImage = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

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
      className="theme-dark relative isolate overflow-hidden pb-20 pt-[calc(var(--header-h)+2.5rem)] lg:min-h-[100svh] lg:pb-28 lg:pt-[calc(var(--header-h)+4rem)]"
    >

      <div className="container-editorial grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">

          <h1 id="hero-title" className="font-display">
            <motion.span {...item(1)} className="block text-base font-normal text-stone sm:text-lg">
              {t.hero.titleLead}
            </motion.span>
            <motion.span
              {...item(2)}
              className="mt-3 block text-[clamp(2.4rem,5.5vw,4.25rem)] font-medium leading-[1.05]"
            >
              {t.hero.titleLine1}
            </motion.span>
          </h1>

          <motion.p {...item(4)} className="mt-6 max-w-xl text-lg leading-relaxed text-stone">
            {t.hero.lead}
          </motion.p>

          <motion.div {...item(5)} className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={whatsappHref(t.booking.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brass px-6"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t.common.bookWhatsapp}
              <span className="sr-only">{t.common.opensNewTab}</span>
            </a>
            <a
              href={telHref}
              aria-label={t.common.callAria}
              className="link-underline inline-flex items-center gap-2 py-2 font-semibold text-bone"
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              {t.common.call}
              <span dir="ltr" className="tabular-nums">
                {BUSINESS.phoneDisplay}
              </span>
            </a>
          </motion.div>

          <motion.p
            {...item(6)}
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-bone/10 pt-5 text-sm text-stone"
          >
            <span>
              <span className="sr-only">{t.common.ratingAria}</span>
              <span aria-hidden="true">
                {BUSINESS.googleRating} {t.common.googleRating}
              </span>
            </span>
            <span aria-hidden="true">·</span>
            <OpenStatus plain />
            <span aria-hidden="true">·</span>
            <a
              href={directionsHref(lang)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.visit.addressAria} ${t.common.opensNewTab}`}
              className="link-underline hover:text-bone"
            >
              {BUSINESS.address[lang]}
            </a>
          </motion.p>
        </div>

        {/* Photo in a plain frame. */}
        <div className="relative mx-auto w-full max-w-[28rem] lg:col-span-5 lg:max-w-[27rem]">
          <motion.div
            style={{ y: yImage }}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.25 }}
            className="relative overflow-hidden rounded-md ring-1 ring-bone/10"
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
    </section>
  );
};

export default Hero;
