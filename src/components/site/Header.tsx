import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { telHref, whatsappHref } from "@/lib/business";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./BrandIcons";
import LanguageToggle from "./LanguageToggle";
import { EASE_OUT, Logo, useMotionReduced } from "./primitives";

const SECTIONS = ["gallery", "services", "reviews", "visit"] as const;

const Header = () => {
  const { t, dir } = useLang();
  const { pathname } = useLocation();
  const reduce = useMotionReduced();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoLink = (
    <Link to="/" onClick={() => onHome && window.scrollTo({ top: 0 })} className="rounded-md">
      <Logo />
    </Link>
  );

  return (
    <header
      id="site-header"
      className={cn(
        "theme-dark fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || !onHome
          ? "bg-ink/90 shadow-[0_1px_0_hsl(var(--bone)/0.08)] backdrop-blur-md"
          : "!bg-transparent",
      )}
    >
      {/* Mobile: hamburger at the physical left, logo centered, language toggle pinned top-right. */}
      <div className="relative flex h-[var(--header-h)] items-center justify-center px-4 lg:hidden">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger
            aria-label={t.nav.openMenu}
            className="absolute left-3 grid h-11 w-11 place-items-center rounded-full text-bone hover:bg-bone/10"
          >
            <Menu aria-hidden="true" className="h-6 w-6" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <Dialog.Content
              dir={dir}
              aria-describedby={undefined}
              className="theme-dark grain fixed inset-y-0 left-0 z-[90] flex w-[min(24rem,88vw)] flex-col overflow-y-auto border-e border-brass/20 bg-ink p-6 shadow-2xl data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left data-[state=closed]:duration-200 data-[state=open]:duration-300"
            >
              <div className="relative z-10 flex items-center justify-between">
                <Dialog.Title className="sr-only">{t.nav.menuTitle}</Dialog.Title>
                <Logo />
                <Dialog.Close
                  aria-label={t.nav.closeMenu}
                  className="grid h-11 w-11 place-items-center rounded-full text-bone hover:bg-bone/10"
                >
                  <X aria-hidden="true" className="h-6 w-6" />
                </Dialog.Close>
              </div>
              <nav aria-label={t.nav.label} className="relative z-10 mt-12">
                <ul className="space-y-1">
                  {[...SECTIONS, "contact"].map((id, i) => (
                    <motion.li
                      key={id}
                      initial={reduce ? false : { opacity: 0, x: dir === "rtl" ? 24 : -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 + i * 0.05 }}
                    >
                      <a
                        href={href(id)}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 border-b border-bone/10 py-4 font-display text-3xl font-bold text-bone transition-colors hover:text-brass-light"
                      >
                        {t.nav[id as keyof typeof t.nav]}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="relative z-10 mt-auto space-y-3 pt-10">
                <a
                  href={whatsappHref(t.booking.defaultMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brass w-full"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.common.bookWhatsapp}
                  <span className="sr-only">{t.common.opensNewTab}</span>
                </a>
                <a href={telHref} aria-label={t.common.callAria} className="btn-ghost-dark w-full">
                  <Phone aria-hidden="true" className="h-5 w-5" />
                  <span dir="ltr">050-688-5166</span>
                </a>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        {logoLink}

        <LanguageToggle className="absolute right-3" />
      </div>

      {/* Desktop: logical layout that flips with the page direction. */}
      <div className="container-editorial hidden h-[var(--header-h)] items-center justify-between gap-8 lg:flex">
        {logoLink}
        <nav aria-label={t.nav.label}>
          <ul className="flex items-center gap-7 xl:gap-9">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a href={href(id)} className="link-underline py-1 text-[0.95rem] font-medium text-bone/85 hover:text-bone">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a href={href("contact")} className="btn-brass min-h-11 px-5 py-2 text-[0.95rem]">
            {t.common.bookShort}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
