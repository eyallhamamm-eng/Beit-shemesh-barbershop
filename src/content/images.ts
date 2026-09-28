/*
 * Photo slots. Drop real photos into /public/images and set `src` (e.g. "/images/hero.jpg").
 * Set `width`/`height` to the photo's real pixel size — the layout keeps each photo's
 * natural aspect ratio (nothing is cropped). Until `src` is set, a placeholder is shown.
 */

export type SiteImage = {
  src: string | null;
  width: number;
  height: number;
  alt: { he: string; en: string };
};

export const HERO_IMAGE: SiteImage = {
  src: null,
  width: 1000,
  height: 1300,
  alt: {
    he: "איציק מעצב תספורת גברים על כיסא הספרות במספרה בהרצל 3, בית שמש",
    en: "Itzik styling a men's haircut in the barber chair at 3 Herzl St, Beit Shemesh",
  },
};

export const BARBER_IMAGE: SiteImage = {
  src: null,
  width: 900,
  height: 1100,
  alt: {
    he: "דיוקן של איציק, הספר של מספרות גברים בית שמש, עומד ליד עמדת העבודה שלו",
    en: "Portrait of Itzik, the barber at Beit Shemesh Men's Barbershop, standing by his station",
  },
};

export const GALLERY: SiteImage[] = [
  {
    src: null,
    width: 800,
    height: 1000,
    alt: { he: "תספורת פייד קצרה עם מעבר חלק בצדדים, מבט מהצד", en: "Short fade haircut with a smooth side blend, side view" },
  },
  {
    src: null,
    width: 800,
    height: 800,
    alt: { he: "זקן מעוצב עם קווי לחיים וצוואר חדים", en: "Shaped beard with crisp cheek and neck lines" },
  },
  {
    src: null,
    width: 1200,
    height: 800,
    alt: { he: "עמדת הספרות במספרה: כיסא עור, מראה ומכונות תספורת", en: "The barber station: leather chair, mirror and clippers" },
  },
  {
    src: null,
    width: 800,
    height: 1100,
    alt: { he: "תספורת קלאסית מסורקת לצד, מבט מקדימה", en: "Classic side-parted haircut, front view" },
  },
  {
    src: null,
    width: 800,
    height: 800,
    alt: { he: "גימור בתער לאורך קו העורף", en: "Straight-razor finish along the neckline" },
  },
  {
    src: null,
    width: 800,
    height: 1000,
    alt: { he: "תספורת ילדים מסודרת עם דירוג רך", en: "Neat kids' haircut with a soft taper" },
  },
  {
    src: null,
    width: 1200,
    height: 850,
    alt: { he: "חזית המספרה ברחוב הרצל 3 במרכז בית שמש", en: "The shopfront at 3 Herzl St in central Beit Shemesh" },
  },
  {
    src: null,
    width: 800,
    height: 1050,
    alt: { he: "טקסטורה קצרה מעוצבת בחלק העליון עם פייד גבוה", en: "Short textured top with a high fade" },
  },
];
