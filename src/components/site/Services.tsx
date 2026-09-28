import { motion } from "framer-motion";
import { Scissors } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { whatsappHref } from "@/lib/business";
import { WhatsAppIcon } from "./BrandIcons";
import { Reveal, staggerChild, staggerParent, useMotionReduced } from "./primitives";

/** Heading row, a full-width rule, then a grid of service cells separated by hairlines. */
const Services = () => {
  const { t } = useLang();
  const reduce = useMotionReduced();

  return (
    <section id="services" aria-labelledby="services-title" className="theme-dark relative py-24 sm:py-32">
      <div className="container-editorial">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 id="services-title" className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight">
              {t.services.title}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-lg text-stone">{t.services.intro}</p>
          </Reveal>
        </div>

        <motion.ul
          variants={staggerParent}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-12 grid gap-px border-y border-bone/15 bg-bone/15 md:grid-cols-3"
        >
          {t.services.items.map((s, i) => (
            <motion.li key={s.name} variants={staggerChild} className="bg-ink px-2 py-10 sm:px-8">
              <Scissors aria-hidden="true" className="h-6 w-6 text-brass" strokeWidth={1.75} />
              <span aria-hidden="true" className="mt-6 block text-sm font-semibold tabular-nums text-stone">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-2xl font-bold sm:text-[1.75rem]">{s.name}</h3>
              <p className="mt-3 leading-relaxed text-stone">{s.text}</p>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal delay={0.1}>
          <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg">
            <span className="font-semibold">{t.services.note}</span>
            <a
              href={whatsappHref(t.booking.photoMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-brass-light"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span className="link-underline">{t.services.noteCta}</span>
              <span className="sr-only">{t.common.opensNewTab}</span>
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
