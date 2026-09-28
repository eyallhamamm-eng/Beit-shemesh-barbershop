import { Accessibility, MapPin, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { BUSINESS, directionsHref, telHref, whatsappHref } from "@/lib/business";
import { WhatsAppIcon } from "./BrandIcons";
import { Logo } from "./primitives";
import Social from "./Social";

const Footer = () => {
  const { t, lang } = useLang();
  const { pathname } = useLocation();
  const href = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);
  const year = new Date().getFullYear();

  return (
    <footer className="theme-dark relative border-t border-bone/10 pb-28 pt-20 sm:pb-24">
      <div aria-hidden="true" className="barber-stripes absolute inset-x-0 top-0 h-1.5 opacity-80" />
      <div className="container-editorial grid gap-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <Social compact className="mt-8" />
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brass">{t.footer.contactTitle}</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={directionsHref(lang)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.visit.addressAria} ${t.common.opensNewTab}`}
                className="inline-flex items-center gap-2.5 hover:text-brass-light"
              >
                <MapPin aria-hidden="true" className="h-4 w-4 text-brass" />
                {BUSINESS.address[lang]}
              </a>
            </li>
            <li>
              <a href={telHref} aria-label={t.common.callAria} className="inline-flex items-center gap-2.5 hover:text-brass-light">
                <Phone aria-hidden="true" className="h-4 w-4 text-brass" />
                <span dir="ltr">{BUSINESS.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappHref(t.booking.defaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 hover:text-brass-light"
              >
                <WhatsAppIcon className="h-4 w-4 text-brass" />
                WhatsApp
                <span className="sr-only">{t.common.opensNewTab}</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brass">{t.footer.hoursTitle}</h2>
          <ul className="mt-5 space-y-2 text-stone">
            {t.footer.hoursRows.map((r) => (
              <li key={r.days}>
                {r.days} · <span dir={/\d/.test(r.time) ? "ltr" : undefined}>{r.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-nav-title" className="lg:col-span-3">
          <h2 id="footer-nav-title" className="text-sm font-bold uppercase tracking-[0.2em] text-brass">
            {t.footer.linksTitle}
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2">
            {(["gallery", "services", "reviews", "visit", "contact"] as const).map((id) => (
              <li key={id}>
                <a href={href(id)} className="link-underline text-bone/85 hover:text-bone">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <Link
            to="/accessibility"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-brass/40 px-4 font-semibold text-brass-light hover:border-brass hover:text-bone"
          >
            <Accessibility aria-hidden="true" className="h-4 w-4" />
            {t.footer.a11y}
          </Link>
        </nav>
      </div>

      <div className="container-editorial mt-16 flex flex-col gap-3 border-t border-bone/10 pt-8 text-sm text-stone sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {BUSINESS.name[lang]}. {t.footer.rights}
        </p>
        <Link to="/accessibility" className="underline underline-offset-4 hover:text-bone">
          {t.footer.a11y}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
