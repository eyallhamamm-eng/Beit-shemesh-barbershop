import { useLang } from "@/i18n/LanguageContext";

/** Decorative ticker of services. Hidden from assistive tech (the services list carries the content). */
const Marquee = () => {
  const { t } = useLang();
  const words = [...t.marquee, ...t.marquee];
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-ink/15 bg-brass py-5 text-ink">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {words.map((w, i) => (
              <li key={`${copy}-${i}`} className="flex items-center font-display text-2xl font-bold italic sm:text-3xl">
                <span className="px-7">{w}</span>
                <span className="h-2 w-2 rotate-45 bg-ink/70" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
