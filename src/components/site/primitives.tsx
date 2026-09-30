import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Clock, Scissors, Star } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useA11ySettings } from "./a11y/A11ySettings";
import { formatTime, getOpenStatus, israelNow, type OpenStatus as Status } from "@/lib/business";
import { cn } from "@/lib/utils";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** True when the OS asks for reduced motion OR the accessibility widget's "stop animations" is on. */
export const useMotionReduced = () => {
  const os = useReducedMotion();
  const { stopMotion } = useA11ySettings();
  return Boolean(os || stopMotion);
};

/** Scroll-triggered reveal. Motion is dropped automatically under reduced-motion. */
export const Reveal = ({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "figure";
}) => {
  const Comp = as;
  return <Comp className={className}>{children}</Comp>;
};

// Lists render static; these variants are kept as no-ops so callers stay unchanged.
export const staggerParent: Variants = { hidden: {}, show: {} };
export const staggerChild: Variants = { hidden: {}, show: {} };

/** Brand mark: a miniature barber pole beside a two-line wordmark. */
export const Logo = ({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) => {
  const { t, lang } = useLang();
  const [line1, line2] = lang === "he" ? ["מספרת גברים", "בית שמש"] : ["Men's Barbershop", "Beit Shemesh"];
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span aria-hidden="true" className="relative h-10 w-3 overflow-hidden rounded-full ring-1 ring-brass/70">
        <span className="barber-stripes absolute inset-0" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.15rem] font-bold tracking-tight",
            tone === "light" ? "text-bone" : "text-ink",
          )}
        >
          {line1}
        </span>
        <span
          className={cn(
            "mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em]",
            tone === "light" ? "text-brass" : "text-brass-deep",
          )}
        >
          {line2}
        </span>
      </span>
      <span className="sr-only">{t.nav.logoAria}</span>
    </span>
  );
};

export const Stars = ({ className }: { className?: string }) => (
  <span aria-hidden="true" className={cn("inline-flex gap-0.5", className)}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
    ))}
  </span>
);

export const useOpenStatus = () => {
  const [status, setStatus] = useState<Status>(() => getOpenStatus());
  useEffect(() => {
    const id = window.setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
};

export const OpenStatus = ({ className, plain = false }: { className?: string; plain?: boolean }) => {
  const { t, lang } = useLang();
  const status = useOpenStatus();
  const today = israelNow().day;

  let text: string;
  if (status.state === "open") {
    text = `${t.status.openUntil} ${formatTime(status.closesAt, lang)}`;
  } else {
    const when =
      status.opensDay === today
        ? t.status.today
        : status.opensDay === (today + 1) % 7
          ? t.status.tomorrow
          : `${lang === "he" ? "ביום " : "on "}${t.visit.days[status.opensDay]}`;
    text = `${t.status.closedOpens} ${when} ${t.status.at}${lang === "he" ? "" : " "}${formatTime(status.opensAt, lang)}`;
  }

  const dot = (
    <span
      aria-hidden="true"
      className={cn("inline-flex h-2 w-2 shrink-0 rounded-full", status.state === "open" ? "bg-emerald-400" : "bg-red-500")}
    />
  );

  if (plain) {
    return (
      <span className={cn("inline-flex items-center gap-2", className)}>
        {dot}
        {text}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      {dot}
      <Clock aria-hidden="true" className="h-4 w-4 opacity-80" />
      {text}
    </span>
  );
};

/**
 * Photo slot. With a `src` it renders a real, uncropped image; without one it shows a
 * tasteful placeholder at the intended aspect ratio, so the layout is final before photos arrive.
 */
export const ImageSlot = ({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  eager = false,
  tone = "dark",
}: {
  src?: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  tone?: "dark" | "light";
}) => {
  const { t } = useLang();
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn("block h-auto w-full", imgClassName, className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={cn(
        "relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden",
        tone === "dark"
          ? "bg-[radial-gradient(120%_90%_at_30%_20%,hsl(var(--ink-line)),hsl(var(--ink-soft))_55%,hsl(var(--ink)))] text-stone"
          : "bg-[radial-gradient(120%_90%_at_30%_20%,hsl(var(--paper)),hsl(38_28%_86%))] text-umber",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid h-12 w-12 place-items-center rounded-full ring-1",
          tone === "dark" ? "ring-brass/40 text-brass" : "ring-brass-deep/40 text-brass-deep",
        )}
      >
        <Scissors className="h-5 w-5" strokeWidth={1.5} />
      </span>
      <span aria-hidden="true" className="px-4 text-center text-xs font-semibold uppercase tracking-[0.2em]">
        {t.gallery.placeholder}
      </span>
    </div>
  );
};

export const SectionHeading = ({
  id,
  eyebrow,
  title,
  intro,
  tone = "dark",
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "dark" | "light";
  className?: string;
}) => (
  <div className={cn("max-w-2xl", className)}>
    {eyebrow && (
      <Reveal>
        <p className={cn("eyebrow mb-5", tone === "dark" ? "text-brass" : "text-brass-deep")}>{eyebrow}</p>
      </Reveal>
    )}
    <Reveal delay={0.06}>
      <h2 id={id} className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight">
        {title}
      </h2>
    </Reveal>
    {intro && (
      <Reveal delay={0.12}>
        <p className={cn("mt-5 text-lg leading-relaxed", tone === "dark" ? "text-stone" : "text-umber")}>{intro}</p>
      </Reveal>
    )}
  </div>
);
