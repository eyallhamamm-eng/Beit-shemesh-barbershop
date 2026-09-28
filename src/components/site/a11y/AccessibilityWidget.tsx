import * as Popover from "@radix-ui/react-popover";
import { Accessibility, AArrowDown, AArrowUp, Contrast, Droplet, Link2, PauseCircle, RotateCcw, X, FileText } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { SCALE_MAX, SCALE_MIN, SCALE_STEP, useA11ySettings, type ColorMode } from "./A11ySettings";

const ToggleRow = ({
  pressed,
  onClick,
  icon,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
}) => (
  <button
    type="button"
    aria-pressed={pressed}
    onClick={onClick}
    className={cn(
      "flex min-h-12 w-full items-center gap-3 rounded-lg px-3 py-2 text-start text-[0.95rem] font-medium transition-colors",
      pressed ? "bg-brass text-ink" : "bg-bone/[0.06] text-bone hover:bg-bone/[0.12]",
    )}
  >
    <span aria-hidden="true" className="shrink-0">
      {icon}
    </span>
    <span className="flex-1">{children}</span>
    <span
      aria-hidden="true"
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-full transition-colors",
        pressed ? "bg-ink/80" : "bg-bone/25",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-4 w-4 rounded-full transition-[inset-inline-start] duration-200",
          pressed ? "start-[1.125rem] bg-brass-light" : "start-0.5 bg-bone",
        )}
      />
    </span>
  </button>
);

const AccessibilityWidget = () => {
  const { t, dir } = useLang();
  const a = t.a11yWidget;
  const s = useA11ySettings();
  const [open, setOpen] = useState(false);
  const [announce, setAnnounce] = useState("");

  const setMode = (mode: ColorMode) => s.update({ colorMode: s.colorMode === mode ? "default" : mode });

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      {/* Pinned to the inline-start corner; the WhatsApp button owns the opposite corner so they never overlap. */}
      <div className="fixed bottom-5 start-4 z-[60] sm:bottom-6 sm:start-6">
        <Popover.Trigger
          aria-label={open ? a.close : a.open}
          className="focus-double grid h-14 w-14 place-items-center rounded-full bg-ink text-brass-light shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] ring-1 ring-brass/60 transition-transform duration-200 ease-out hover:scale-105 active:scale-95"
        >
          <Accessibility aria-hidden="true" className="h-7 w-7" strokeWidth={1.75} />
        </Popover.Trigger>
      </div>

      <Popover.Portal>
        <Popover.Content
          side="top"
          align={dir === "rtl" ? "end" : "start"}
          sideOffset={12}
          collisionPadding={12}
          aria-labelledby="a11y-panel-title"
          className="z-[70] max-h-[min(34rem,calc(100dvh-7rem))] w-[min(20rem,calc(100vw-2rem))] origin-[var(--radix-popover-content-transform-origin)] overflow-y-auto rounded-2xl border border-brass/30 bg-ink-soft p-4 text-bone shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] [--focus:var(--brass-light)] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-2"
          dir={dir}
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 id="a11y-panel-title" className="font-display text-xl font-bold">
              {a.title}
            </h2>
            <Popover.Close
              aria-label={a.close}
              className="grid h-10 w-10 place-items-center rounded-full text-stone hover:bg-bone/10 hover:text-bone"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </Popover.Close>
          </div>

          <div role="group" aria-labelledby="a11y-size-label" className="mb-4">
            <p id="a11y-size-label" className="mb-2 text-sm font-semibold text-stone">
              {a.textSize}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={a.decrease}
                disabled={s.scale <= SCALE_MIN}
                onClick={() => s.update({ scale: Math.max(SCALE_MIN, s.scale - SCALE_STEP) })}
                className="grid h-12 w-12 place-items-center rounded-lg bg-bone/[0.06] hover:bg-bone/[0.12] disabled:opacity-40"
              >
                <AArrowDown aria-hidden="true" className="h-5 w-5" />
              </button>
              <output
                aria-live="polite"
                aria-label={a.currentSize}
                className="flex-1 text-center font-display text-lg font-bold tabular-nums"
              >
                {s.scale}%
              </output>
              <button
                type="button"
                aria-label={a.increase}
                disabled={s.scale >= SCALE_MAX}
                onClick={() => s.update({ scale: Math.min(SCALE_MAX, s.scale + SCALE_STEP) })}
                className="grid h-12 w-12 place-items-center rounded-lg bg-bone/[0.06] hover:bg-bone/[0.12] disabled:opacity-40"
              >
                <AArrowUp aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div role="group" aria-labelledby="a11y-color-label" className="mb-4 space-y-2">
            <p id="a11y-color-label" className="mb-2 text-sm font-semibold text-stone">
              {a.colorMode}
            </p>
            <ToggleRow pressed={s.colorMode === "contrast"} onClick={() => setMode("contrast")} icon={<Contrast className="h-5 w-5" />}>
              {a.contrast}
            </ToggleRow>
            <ToggleRow pressed={s.colorMode === "mono"} onClick={() => setMode("mono")} icon={<Droplet className="h-5 w-5" />}>
              {a.mono}
            </ToggleRow>
          </div>

          <div className="mb-4 space-y-2">
            <ToggleRow pressed={s.links} onClick={() => s.update({ links: !s.links })} icon={<Link2 className="h-5 w-5" />}>
              {a.links}
            </ToggleRow>
            <ToggleRow
              pressed={s.stopMotion}
              onClick={() => s.update({ stopMotion: !s.stopMotion })}
              icon={<PauseCircle className="h-5 w-5" />}
            >
              {a.motion}
            </ToggleRow>
          </div>

          <button
            type="button"
            onClick={() => {
              s.reset();
              setAnnounce(a.resetDone);
              window.setTimeout(() => setAnnounce(""), 2000);
            }}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-bone/25 px-3 font-semibold hover:border-bone/60"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            {a.reset}
          </button>
          <p aria-live="polite" className="mt-2 min-h-5 text-center text-sm text-brass-light">
            {announce}
          </p>

          <Link
            to="/accessibility"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-center gap-2 text-sm font-medium text-stone underline underline-offset-4 hover:text-bone"
          >
            <FileText aria-hidden="true" className="h-4 w-4" />
            {a.statement}
          </Link>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AccessibilityWidget;
