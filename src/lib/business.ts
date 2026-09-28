import type { Lang } from "@/i18n/translations";

/** Single source of truth for the business's public details (NAP, hours, links). */
export const BUSINESS = {
  name: { he: "מספרות גברים בית שמש", en: "Beit Shemesh Men's Barbershop" },
  barber: { he: "איציק", en: "Itzik" },
  phoneDisplay: "050-688-5166",
  phoneTel: "+972506885166",
  whatsapp: "972506885166",
  address: { he: "הרצל 3, בית שמש", en: "Herzl St 3, Bet Shemesh" },
  googleRating: "4.9",
} as const;

/**
 * Social profiles. Leave empty until the business has a profile —
 * the icons stay visible (marked "coming soon") and become real links
 * as soon as a URL is filled in here.
 */
export const SOCIAL = {
  instagram: "",
  facebook: "",
} as const;

export const telHref = `tel:${BUSINESS.phoneTel}`;

export const whatsappHref = (message?: string) =>
  `https://wa.me/${BUSINESS.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const directionsHref = (lang: Lang) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS.address[lang])}`;

export const wazeHref = (lang: Lang) =>
  `https://waze.com/ul?q=${encodeURIComponent(BUSINESS.address[lang])}&navigate=yes`;

export const googleReviewsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "מספרות גברים בית שמש הרצל 3",
)}`;

export const mapEmbedSrc = (lang: Lang) =>
  `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.address[lang])}&hl=${lang === "he" ? "iw" : "en"}&z=17&output=embed`;

/** Opening hours by JS weekday (0 = Sunday). Times are "HH:MM" in Israel time; null = closed. */
export const HOURS: ReadonlyArray<{ open: string; close: string } | null> = [
  { open: "08:00", close: "21:00" },
  { open: "08:00", close: "21:00" },
  { open: "08:00", close: "21:00" },
  { open: "08:00", close: "21:00" },
  { open: "08:00", close: "21:00" },
  { open: "08:00", close: "14:30" },
  null,
];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Current weekday + minutes-since-midnight in Israel, regardless of the visitor's timezone. */
export const israelNow = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jerusalem",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
};

export type OpenStatus =
  | { state: "open"; closesAt: string }
  | { state: "closed"; opensDay: number; opensAt: string };

export const getOpenStatus = (date = new Date()): OpenStatus => {
  const { day, minutes } = israelNow(date);
  const today = HOURS[day];
  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { state: "open", closesAt: today.close };
  }
  // Find the next opening: later today, or the next day that has hours.
  if (today && minutes < toMinutes(today.open)) {
    return { state: "closed", opensDay: day, opensAt: today.open };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const h = HOURS[d];
    if (h) return { state: "closed", opensDay: d, opensAt: h.open };
  }
  return { state: "closed", opensDay: day, opensAt: "08:00" };
};

export const formatTime = (hhmm: string, lang: Lang) => {
  if (lang === "he") return hhmm;
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
};
