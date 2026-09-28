import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { BARBER_IMAGE } from "@/content/images";
import { ImageSlot, Reveal, staggerChild, staggerParent, useMotionReduced } from "./primitives";

const About = () => {
  const { t, lang } = useLang();
  const reduce = useMotionReduced();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);

  return (
    <section id="about" aria-labelledby="about-title" className="theme-light relative overflow-hidden py-24 sm:py-32">
      <div className="container-editorial grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Portrait with an offset brass plate behind it. */}
        <div ref={ref} className="relative order-2 lg:order-1 lg:col-span-5">
          <div aria-hidden="true" className="absolute -inset-3 translate-x-6 translate-y-6 rounded-[2rem] bg-brass/25 rtl:-translate-x-6" />
          <motion.div style={{ y }} className="relative overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(21,18,15,0.6)]">
            <ImageSlot
              src={BARBER_IMAGE.src}
              alt={BARBER_IMAGE.alt[lang]}
              width={BARBER_IMAGE.width}
              height={BARBER_IMAGE.height}
              tone="dark"
            />
          </motion.div>
          <Reveal className="relative -mt-12 ms-6 max-w-sm sm:ms-12" delay={0.1}>
            <figure className="rounded-2xl bg-ink p-6 text-bone shadow-[0_30px_60px_-25px_rgba(21,18,15,0.7)]">
              <blockquote className="font-display text-xl font-bold leading-snug sm:text-2xl">
                {lang === "he" ? `״${t.about.pullQuote}״` : `“${t.about.pullQuote}”`}
              </blockquote>
              <figcaption className="mt-3 text-sm text-stone">{t.about.pullQuoteBy}</figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7 lg:ps-10">
          <Reveal>
            <p className="eyebrow text-brass-deep">{t.about.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="about-title" className="mt-5 text-[clamp(2.25rem,4.6vw,3.6rem)] font-bold leading-[1.08] tracking-tight">
              {t.about.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 text-lg leading-relaxed text-umber">{t.about.p1}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-lg leading-relaxed text-umber">{t.about.p2}</p>
          </Reveal>

          <h3 className="mt-14 font-body text-sm font-bold uppercase tracking-[0.2em] text-brass-deep">
            {t.about.principlesTitle}
          </h3>
          <motion.ol
            variants={staggerParent}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="mt-6 divide-y divide-ink/15 border-y border-ink/15"
          >
            {t.about.principles.map((p, i) => (
              <motion.li key={p.title} variants={staggerChild} className="grid grid-cols-[3.5rem_1fr] gap-4 py-6">
                <span aria-hidden="true" className="font-display text-3xl font-bold italic text-brass-deep">
                  0{i + 1}
                </span>
                <div>
                  <p className="font-display text-2xl font-bold">{p.title}</p>
                  <p className="mt-2 leading-relaxed text-umber">{p.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
};

export default About;
