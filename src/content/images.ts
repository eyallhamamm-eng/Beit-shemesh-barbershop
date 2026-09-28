/*
 * Site photos (in /public/images). `width`/`height` are the files' real pixel sizes —
 * the layout keeps each photo's natural aspect ratio, so nothing is cropped.
 * A slot with `src: null` shows a placeholder instead.
 */

const BASE = import.meta.env.BASE_URL;

export type SiteImage = {
  src: string | null;
  width: number;
  height: number;
  alt: { he: string; en: string };
};

export const HERO_IMAGE: SiteImage = {
  src: `${BASE}images/hero-fringe-fade.jpg`,
  width: 1100,
  height: 1394,
  alt: {
    he: "תספורת עם פוני ופייד נמוך, על הכיסא במספרה של איציק",
    en: "Textured fringe with a low fade, in the chair at Itzik's barbershop",
  },
};

const img = (name: string, width: number, height: number, he: string, en: string): SiteImage => ({
  src: `${BASE}images/${name}.jpg`,
  width,
  height,
  alt: { he, en },
});

export const GALLERY: SiteImage[] = [
  img("fade-beard-line", 900, 988, "פייד גבוה עם זקן מעוצב וקו חד בלחי", "High fade with a shaped beard and a sharp cheek line"),
  img("curls-highlights", 900, 1158, "תלתלים עם גוונים, טייפר וזקן קצר", "Curls with highlights, a taper and a short beard"),
  img("fade-back", 900, 1671, "פייד קצר, מבט מאחור", "Short fade, seen from the back"),
  img("taper-beard", 900, 1151, "טייפר נמוך עם זקן מסודר", "Low taper with a neat beard"),
  img("premium-fade-beard", 900, 978, "פייד קצר עם זקן מלא ומעוצב", "Short fade with a full, shaped beard"),
  img("fringe-high-fade", 900, 1159, "פוני ארוך עם פייד גבוה", "Long fringe with a high fade"),
  img("curly-fade", 816, 1291, "שיער מתולתל למעלה עם פייד בצדדים", "Curly top with a fade on the sides"),
  img("crop-high-fade", 900, 1166, "תספורת קצרה עם פייד גבוה וזקן קצר", "Short crop with a high fade and a short beard"),
  img("taper-beard-side", 900, 1188, "תספורת קצרה עם טייפר וזקן, מבט מהצד", "Short cut with a taper and beard, side view"),
  img("taper-back-mirror", 900, 1166, "טייפר מאחור, מול המראה במספרה", "Taper from the back, in front of the shop mirror"),
];
