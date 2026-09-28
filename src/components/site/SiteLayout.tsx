import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import AccessibilityWidget from "./a11y/AccessibilityWidget";
import FloatingWhatsApp from "./FloatingWhatsApp";
import Footer from "./Footer";
import Header from "./Header";

/** Keeps <title>, description and OG tags in sync with the route and language. */
export const usePageMeta = (title: string, description?: string) => {
  useEffect(() => {
    document.title = title;
    const set = (selector: string, value: string) => document.querySelector(selector)?.setAttribute("content", value);
    set('meta[property="og:title"]', title);
    set('meta[name="twitter:title"]', title);
    if (description) {
      set('meta[name="description"]', description);
      set('meta[property="og:description"]', description);
      set('meta[name="twitter:description"]', description);
    }
  }, [title, description]);
};

const SiteLayout = ({ children }: { children: ReactNode }) => {
  const { t, lang } = useLang();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", lang === "he" ? "he_IL" : "en_US");
  }, [lang]);

  // Scroll to the anchor after client-side navigation (e.g. /accessibility → /#visit), else to top.
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView());
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <a
        href="#main"
        className="fixed start-4 top-3 z-[100] -translate-y-24 rounded-full bg-brass px-5 py-3 font-semibold text-ink shadow-lg transition-transform focus:translate-y-0 focus-double"
      >
        {t.common.skipToContent}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <AccessibilityWidget />
    </>
  );
};

export default SiteLayout;
