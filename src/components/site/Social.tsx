import { useLang } from "@/i18n/LanguageContext";
import { SOCIAL } from "@/lib/business";
import { cn } from "@/lib/utils";
import { FacebookIcon, InstagramIcon } from "./BrandIcons";

/**
 * Prominent "Follow us" block. Profiles without a URL yet (see SOCIAL in lib/business.ts)
 * render as a visible, non-interactive "coming soon" tile, and turn into real links once filled in.
 */
const Social = ({ className, compact = false }: { className?: string; compact?: boolean }) => {
  const { t } = useLang();
  const items = [
    { key: "instagram", url: SOCIAL.instagram, label: t.social.instagram, aria: t.social.instagramAria, Icon: InstagramIcon },
    { key: "facebook", url: SOCIAL.facebook, label: t.social.facebook, aria: t.social.facebookAria, Icon: FacebookIcon },
  ] as const;

  return (
    <div className={className}>
      <p className={cn("font-display font-bold", compact ? "text-lg" : "text-2xl")}>{t.social.title}</p>
      <ul className={cn("flex flex-wrap gap-3", compact ? "mt-3" : "mt-5")}>
        {items.map(({ key, url, label, aria, Icon }) => {
          const inner = (
            <>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brass text-ink">
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-semibold text-bone">{label}</span>
                {!url && <span className="text-xs text-stone">{t.common.comingSoon}</span>}
              </span>
            </>
          );
          const tile = "flex items-center gap-3 rounded-full border border-bone/15 bg-ink-soft py-2 pe-5 ps-2";
          return (
            <li key={key}>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${aria} ${t.common.opensNewTab}`}
                  className={cn(tile, "transition-colors hover:border-brass")}
                >
                  {inner}
                </a>
              ) : (
                <span className={tile}>
                  <span className="sr-only">
                    {aria} {t.social.soonAria}
                  </span>
                  <span aria-hidden="true" className="contents">
                    {inner}
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Social;
