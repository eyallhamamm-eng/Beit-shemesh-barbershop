import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { whatsappHref } from "@/lib/business";
import { WhatsAppIcon } from "./BrandIcons";
import { Reveal, SectionHeading, staggerChild, staggerParent, useMotionReduced } from "./primitives";

/** Editorial "menu board" list — numbered rows instead of generic icon cards. */
const Services = () => {
  const { t } = useLang();
  const reduce = useMotionReduced();

  return (
    <section id="services" aria-labelledby="services-title" className="theme-dark grain relative py-24 sm:py-32">
      <div className="container-editorial">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-span-4 lg:self-start">
            <SectionHeading id="services-title" eyebrow={t.services.eyebrow} title={t.services.title} intro={t.services.intro} />
            <Reveal delay={0.18}>
              <div className="mt-10 rounded-2xl border border-brass/30 bg-ink-soft p-6">
                <p className="font-display text-xl font-bold">{t.services.note}</p>
                <a
                  href={whatsappHref(t.booking.photoMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 inline-flex items-center gap-2 font-semibold text-brass-light"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  <span className="link-underline">{t.services.noteCta}</span>
                  <span className="sr-only">{t.common.opensNewTab}</span>
                  <ArrowLeft
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 ltr:rotate-180 group-hover:-translate-x-1 ltr:group-hover:translate-x-1"
                  />
                </a>
              </div>
            </Reveal>
          </div>

          <motion.ol
            variants={staggerParent}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="border-t border-bone/15 lg:col-span-7 lg:col-start-6"
          >
            {t.services.items.map((s, i) => (
              <motion.li
                key={s.name}
                variants={staggerChild}
                className="group relative grid grid-cols-[3rem_1fr] gap-x-5 border-b border-bone/15 py-8 sm:grid-cols-[4.5rem_1fr] sm:py-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 start-0 w-0 bg-gradient-to-l from-transparent to-brass/[0.07] transition-[width] duration-500 ease-out group-hover:w-full rtl:bg-gradient-to-r"
                />
                <span aria-hidden="true" className="relative font-display text-4xl font-bold italic text-brass sm:text-5xl">
                  0{i + 1}
                </span>
                <div className="relative">
                  <h3 className="text-[1.75rem] font-bold leading-tight sm:text-4xl">{s.name}</h3>
                  <p className="mt-3 max-w-lg text-lg leading-relaxed text-stone">{s.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
};

export default Services;
