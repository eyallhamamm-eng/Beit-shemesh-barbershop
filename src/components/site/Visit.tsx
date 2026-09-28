import { MapPin, Navigation } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { BUSINESS, HOURS, directionsHref, formatTime, israelNow, mapEmbedSrc, wazeHref } from "@/lib/business";
import { cn } from "@/lib/utils";
import { OpenStatus, Reveal, SectionHeading } from "./primitives";

const Visit = () => {
  const { t, lang } = useLang();
  const today = israelNow().day;

  return (
    <section id="visit" aria-labelledby="visit-title" className="theme-light py-24 sm:py-32">
      <div className="container-editorial">
        <SectionHeading id="visit-title" tone="light" title={t.visit.title} />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="h-full rounded-3xl bg-paper p-7 shadow-[0_30px_60px_-40px_rgba(21,18,15,0.5)] ring-1 ring-ink/10 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-2xl font-bold">{t.visit.hoursTitle}</h3>
                <OpenStatus className="rounded-full bg-ink px-3 py-1.5 text-sm font-medium text-bone" />
              </div>
              <table className="mt-6 w-full text-[1.05rem]">
                <caption className="sr-only">{t.visit.hoursTitle}</caption>
                <tbody>
                  {HOURS.map((h, d) => (
                    <tr
                      key={d}
                      aria-current={d === today ? "date" : undefined}
                      className={cn("border-b border-ink/10 last:border-0", d === today && "font-bold")}
                    >
                      <th scope="row" className="py-3 text-start font-[inherit]">
                        <span className="inline-flex items-center gap-2">
                          {t.visit.days[d]}
                          {d === today && (
                            <span className="rounded-full bg-brass-deep px-2 py-0.5 text-xs font-bold text-bone">
                              {t.visit.todayTag}
                            </span>
                          )}
                        </span>
                      </th>
                      <td className="py-3 text-end tabular-nums text-umber">
                        {h ? (
                          <span dir="ltr">
                            {formatTime(h.open, lang)}-{formatTime(h.close, lang)}
                          </span>
                        ) : (
                          t.visit.closed
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.08}>
            <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-ink text-bone shadow-[0_30px_60px_-30px_rgba(21,18,15,0.7)]">
              <div className="p-7 sm:p-9">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brass">{t.visit.addressTitle}</h3>
                <a
                  href={directionsHref(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.visit.addressAria} ${t.common.opensNewTab}`}
                  className="group mt-3 inline-flex items-center gap-3 font-display text-3xl font-bold sm:text-4xl"
                >
                  <MapPin aria-hidden="true" className="h-7 w-7 shrink-0 text-brass transition-transform duration-300 group-hover:-translate-y-1" />
                  <span className="link-underline">{BUSINESS.address[lang]}</span>
                </a>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={directionsHref(lang)} target="_blank" rel="noopener noreferrer" className="btn-brass">
                    <MapPin aria-hidden="true" className="h-5 w-5" />
                    {t.visit.directions}
                    <span className="sr-only">{t.common.opensNewTab}</span>
                  </a>
                  <a href={wazeHref(lang)} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark">
                    <Navigation aria-hidden="true" className="h-5 w-5" />
                    {t.visit.waze}
                    <span className="sr-only">{t.common.opensNewTab}</span>
                  </a>
                </div>
              </div>
              <iframe
                key={lang}
                title={t.visit.mapTitle}
                src={mapEmbedSrc(lang)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[18rem] w-full flex-1 border-0 grayscale-[0.35] contrast-[1.05]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Visit;
