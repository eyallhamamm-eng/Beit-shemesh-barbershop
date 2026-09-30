import { motion } from "framer-motion";
import { useMotionReduced } from "./primitives";
import { useLang } from "@/i18n/LanguageContext";
import { whatsappHref } from "@/lib/business";
import { WhatsAppIcon } from "./BrandIcons";

/** Pinned to the inline-end corner, opposite the accessibility button. */
const FloatingWhatsApp = () => {
  const { t } = useLang();
  const reduce = useMotionReduced();

  return (
    <motion.a
      href={whatsappHref(t.booking.defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsappFloat.aria}
      initial={reduce ? false : { opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 20 }}
      className="focus-double group fixed bottom-5 end-4 z-[60] grid h-14 w-14 place-items-center rounded-full bg-brass text-ink shadow-[0_12px_32px_-8px_hsl(var(--brass)/0.8)] sm:bottom-6 sm:end-6 sm:h-16 sm:w-16"
    >
      <WhatsAppIcon className="relative h-7 w-7 transition-transform duration-200 ease-out group-hover:scale-110 sm:h-8 sm:w-8" />
    </motion.a>
  );
};

export default FloatingWhatsApp;
