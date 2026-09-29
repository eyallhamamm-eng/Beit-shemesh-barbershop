# מספרת גברים בית שמש — אתר

אתר תדמית דו־לשוני (עברית/אנגלית) לספר גברים בהרצל 3, בית שמש. React + Vite + Tailwind + Framer Motion.

```bash
npm install
npm run dev      # http://localhost:8080
npm run build
npm test
```

## איפה משנים מה

| מה | קובץ |
|---|---|
| טלפון, כתובת, שעות פתיחה, דירוג | `src/lib/business.ts` |
| קישורי אינסטגרם / פייסבוק (כרגע ריקים — מוצג "בקרוב") | `SOCIAL` ב־`src/lib/business.ts` |
| כל הטקסטים בשתי השפות | `src/i18n/translations.ts` |
| תמונות (Hero, איציק, גלריה) + טקסט חלופי | `src/content/images.ts` |
| פרטי רכז נגישות ותאריך עדכון ההצהרה | `a11yPage` ו־`A11Y_STATEMENT_UPDATED` ב־`src/i18n/translations.ts` |
| מטא־תגיות, Open Graph, Schema.org | `index.html` |

### הוספת תמונות
1. שמים את הקבצים ב־`public/images/` (למשל `public/images/hero.jpg`).
2. ב־`src/content/images.ts` מעדכנים `src: "/images/hero.jpg"` ואת `width`/`height` לגודל האמיתי של התמונה.
3. הגלריה בנויה כ־masonry — כל תמונה מוצגת ביחס המקורי שלה, בלי חיתוך.

### לפני עלייה לאוויר
- להחליף את `og:image` ו־`og:url` ב־`index.html` לכתובות מלאות (`https://your-domain/og-image.jpg`) ולהוסיף `<link rel="canonical">`.
- להשלים את פרטי רכז הנגישות והנגישות הפיזית בעמוד `/accessibility`.
