import { ArrowRight, Home, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import SiteLayout, { usePageMeta } from "@/components/site/SiteLayout";
import { useLang } from "@/i18n/LanguageContext";
import { A11Y_STATEMENT_UPDATED } from "@/i18n/translations";
import { BUSINESS, directionsHref, telHref } from "@/lib/business";

const BackHome = ({ className }: { className?: string }) => {
  const { t } = useLang();
  return (
    <Link to="/" className={`btn-ink ${className ?? ""}`}>
      <ArrowRight aria-hidden="true" className="h-5 w-5 ltr:rotate-180" />
      {t.common.backHome}
      <Home aria-hidden="true" className="h-4 w-4 opacity-70" />
    </Link>
  );
};

const AccessibilityStatement = () => {
  const { t, lang } = useLang();
  const p = t.a11yPage;
  usePageMeta(t.meta.a11yTitle, t.meta.a11yDescription);

  const updated = new Intl.DateTimeFormat(lang === "he" ? "he-IL" : "en-GB", { dateStyle: "long" }).format(
    new Date(`${A11Y_STATEMENT_UPDATED}T12:00:00`),
  );

  return (
    <SiteLayout>
      <article className="theme-light min-h-screen pb-24 pt-[calc(var(--header-h)+3rem)]">
        <div className="container-editorial max-w-3xl">
          <BackHome />

          <header className="mt-12 border-b border-ink/15 pb-10">
            <p className="eyebrow text-brass-deep">{p.eyebrow}</p>
            <h1 className="mt-5 text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.05] tracking-tight">{p.title}</h1>
            <p className="mt-5 text-umber">
              {p.updated}: <time dateTime={A11Y_STATEMENT_UPDATED}>{updated}</time>
            </p>
          </header>

          <div className="mt-10 space-y-12">
            {p.sections.map((s, i) => (
              <section key={s.title} aria-labelledby={`a11y-sec-${i}`}>
                <h2 id={`a11y-sec-${i}`} className="text-3xl font-bold">
                  {s.title}
                </h2>
                {s.body?.map((para) => (
                  <p key={para} className="mt-4 text-lg leading-relaxed text-umber">
                    {para}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-5 space-y-3">
                    {s.list.map((li) => (
                      <li key={li} className="flex gap-3 text-lg leading-relaxed text-umber">
                        <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rotate-45 bg-brass-deep" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section aria-labelledby="a11y-contact" className="rounded-lg bg-ink p-8 text-bone [--focus:var(--brass-light)] sm:p-10">
              <h2 id="a11y-contact" className="text-3xl font-bold">
                {p.contactTitle}
              </h2>
              <p className="mt-4 leading-relaxed text-stone">{p.contactIntro}</p>
              <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="flex gap-3">
                  <UserRound aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brass" />
                  <div>
                    <dt className="text-sm text-stone">{p.contactName}</dt>
                    <dd className="font-semibold">{p.contactNameValue}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brass" />
                  <div>
                    <dt className="text-sm text-stone">{p.contactPhone}</dt>
                    <dd>
                      <a href={telHref} className="font-semibold underline underline-offset-4" dir="ltr">
                        {BUSINESS.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brass" />
                  <div>
                    <dt className="text-sm text-stone">{p.contactEmail}</dt>
                    <dd className="font-semibold">{p.contactEmailValue}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brass" />
                  <div>
                    <dt className="text-sm text-stone">{p.contactAddress}</dt>
                    <dd>
                      <a
                        href={directionsHref(lang)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline underline-offset-4"
                      >
                        {BUSINESS.address[lang]}
                        <span className="sr-only"> {t.common.opensNewTab}</span>
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </section>
          </div>

          <BackHome className="mt-14" />
        </div>
      </article>
    </SiteLayout>
  );
};

export default AccessibilityStatement;
