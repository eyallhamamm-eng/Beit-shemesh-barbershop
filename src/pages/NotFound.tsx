import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SiteLayout, { usePageMeta } from "@/components/site/SiteLayout";
import { useLang } from "@/i18n/LanguageContext";

const NotFound = () => {
  const { t } = useLang();
  usePageMeta(t.meta.notFoundTitle);

  return (
    <SiteLayout>
      <section className="theme-dark relative flex min-h-[80vh] items-center pt-[var(--header-h)]">
        <div className="container-editorial py-24">
          <p aria-hidden="true" className="font-display text-[8rem] font-black leading-none text-brass/80">
            404
          </p>
          <h1 className="mt-4 text-5xl font-bold">{t.notFound.title}</h1>
          <p className="mt-4 max-w-md text-lg text-stone">{t.notFound.text}</p>
          <Link to="/" className="btn-brass mt-10">
            <ArrowRight aria-hidden="true" className="h-5 w-5 ltr:rotate-180" />
            {t.common.backHome}
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
