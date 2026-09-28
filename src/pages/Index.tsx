import About from "@/components/site/About";
import Booking from "@/components/site/Booking";
import Gallery from "@/components/site/Gallery";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Reviews from "@/components/site/Reviews";
import Services from "@/components/site/Services";
import SiteLayout, { usePageMeta } from "@/components/site/SiteLayout";
import Visit from "@/components/site/Visit";
import { useLang } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useLang();
  usePageMeta(t.meta.homeTitle, t.meta.homeDescription);

  return (
    <SiteLayout>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Gallery />
      <Reviews />
      <Visit />
      <Booking />
    </SiteLayout>
  );
};

export default Index;
