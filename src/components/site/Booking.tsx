import { Phone, Send } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { BUSINESS, telHref, whatsappHref } from "@/lib/business";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./BrandIcons";
import { Reveal, SectionHeading } from "./primitives";
import Social from "./Social";

/** Local date as yyyy-mm-dd, for the date picker's minimum. */
const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const fieldClass =
  "mt-2 block min-h-12 w-full rounded-xl border border-bone/20 bg-ink px-4 py-3 text-base text-bone placeholder:text-stone/80 transition-colors hover:border-bone/40 focus:border-brass focus-visible:outline-offset-2";

const Booking = () => {
  const { t } = useLang();
  const b = t.booking;
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    nameError: `${uid}-name-error`,
    service: `${uid}-service`,
    date: `${uid}-date`,
    dateError: `${uid}-date-error`,
    notes: `${uid}-notes`,
    privacy: `${uid}-privacy`,
  };
  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [dateError, setDateError] = useState<"" | "required" | "saturday">("");
  const [sentHref, setSentHref] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const date = String(data.get("date") ?? "");
    const day = date ? new Date(`${date}T12:00:00`).getDay() : -1;
    const dErr = !date ? "required" : day === 6 ? "saturday" : "";
    setError(!name);
    setDateError(dErr);
    if (!name) {
      nameRef.current?.focus();
      return;
    }
    if (dErr) {
      dateRef.current?.focus();
      return;
    }
    const [y, m, d] = date.split("-");
    const when = `${t.visit.days[day]} ${d}/${m}/${y}`;
    const notes = String(data.get("notes") ?? "").trim();
    const lines = [
      b.messageIntro,
      `${b.messageName}: ${name}`,
      `${b.messageService}: ${data.get("service")}`,
      `${b.messageWhen}: ${when}`,
      notes && `${b.messageNotes}: ${notes}`,
    ].filter(Boolean);
    const href = whatsappHref(lines.join("\n"));
    setSentHref(href);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="theme-dark grain relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 start-[-10%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,hsl(var(--brass)/0.16),transparent)]"
      />
      <div className="container-editorial relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-title" title={b.title} />

          <Reveal delay={0.16}>
            <div className="mt-10 space-y-4">
              <p className="font-display text-xl font-bold">{b.orDirect}</p>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a href={telHref} aria-label={t.common.callAria} className="btn-ghost-dark">
                  <Phone aria-hidden="true" className="h-5 w-5" />
                  <span dir="ltr" className="tabular-nums">
                    {BUSINESS.phoneDisplay}
                  </span>
                </a>
                <a
                  href={whatsappHref(b.defaultMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-dark"
                >
                  <WhatsAppIcon className="h-5 w-5 text-brass-light" />
                  {b.whatsappDirect}
                  <span className="sr-only">{t.common.opensNewTab}</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Social className="mt-12" />
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <form
            noValidate
            onSubmit={onSubmit}
            aria-labelledby={`${uid}-form-title`}
            aria-describedby={ids.privacy}
            className="rounded-3xl border border-bone/10 bg-ink-soft p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] sm:p-10"
          >
            <h3 id={`${uid}-form-title`} className="text-2xl font-bold sm:text-3xl">
              {b.formTitle}
            </h3>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor={ids.name} className="text-[0.95rem] font-semibold">
                  {b.name} <span className="font-normal text-stone">{b.requiredMark}</span>
                </label>
                <input
                  ref={nameRef}
                  id={ids.name}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={error || undefined}
                  aria-describedby={error ? ids.nameError : undefined}
                  onChange={() => error && setError(false)}
                  className={cn(fieldClass, error && "border-red-400")}
                />
                {error && (
                  <p id={ids.nameError} role="alert" className="mt-2 text-sm font-medium text-red-300">
                    {b.nameError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={ids.service} className="text-[0.95rem] font-semibold">
                  {b.service}
                </label>
                <select id={ids.service} name="service" defaultValue={b.serviceDefault} className={fieldClass}>
                  {t.services.items.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={ids.date} className="text-[0.95rem] font-semibold">
                  {b.date} <span className="font-normal text-stone">{b.requiredMark}</span>
                </label>
                <input
                  ref={dateRef}
                  id={ids.date}
                  name="date"
                  type="date"
                  required
                  aria-required="true"
                  min={todayISO()}
                  aria-invalid={dateError ? true : undefined}
                  aria-describedby={dateError ? ids.dateError : undefined}
                  onChange={() => dateError && setDateError("")}
                  className={cn(fieldClass, "[color-scheme:dark]", dateError && "border-red-400")}
                />
                {dateError && (
                  <p id={ids.dateError} role="alert" className="mt-2 text-sm font-medium text-red-300">
                    {dateError === "saturday" ? b.saturdayError : b.dateError}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={ids.notes} className="text-[0.95rem] font-semibold">
                  {b.notes}
                </label>
                <textarea
                  id={ids.notes}
                  name="notes"
                  rows={3}
                  className={cn(fieldClass, "resize-y")}
                />
              </div>
            </div>

            <button type="submit" className="btn-brass mt-8 w-full text-[1.05rem] sm:w-auto sm:px-9">
              <Send aria-hidden="true" className="h-5 w-5 rtl:-scale-x-100" />
              {b.submit}
              <span className="sr-only">{t.common.opensNewTab}</span>
            </button>
            <p id={ids.privacy} className="mt-4 text-sm text-stone">
              {b.privacy}
            </p>
            {/* Confirmation + fallback in case the browser blocked the new tab. */}
            <p role="status" className="mt-4 text-[0.95rem] empty:hidden">
              {sentHref && (
                <>
                  {b.sentText}{" "}
                  <a href={sentHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-brass-light underline underline-offset-4">
                    {b.sentFallback}
                    <span className="sr-only"> {t.common.opensNewTab}</span>
                  </a>
                </>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Booking;
