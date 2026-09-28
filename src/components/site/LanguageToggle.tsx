import { Languages } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const LanguageToggle = ({ className }: { className?: string }) => {
  const { t, lang, toggleLang } = useLang();
  const target = lang === "he" ? "en" : "he";

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.lang.switchAria}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full border border-bone/25 bg-ink/60 px-3.5 text-sm font-semibold text-bone backdrop-blur transition-colors hover:border-brass hover:text-brass-light",
        className,
      )}
    >
      <Languages aria-hidden="true" className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} />
      {/* The label is in the language we switch TO, so mark it for screen readers. */}
      <span lang={target} dir={target === "he" ? "rtl" : "ltr"}>
        {t.lang.switchTo}
      </span>
    </button>
  );
};

export default LanguageToggle;
