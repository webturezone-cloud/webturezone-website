import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { Services } from '@/components/sections/Services';
import { Results } from '@/components/sections/Results';
import { WhyUs } from '@/components/sections/WhyUs';
import { Process } from '@/components/sections/Process';
import { CTA } from '@/components/sections/CTA';
import { Footer } from '@/components/sections/Footer';
import { getSiteSettingsServer } from '@/lib/site-settings';

export const revalidate = 0;

export default async function HomePage() {
  const settings = await getSiteSettingsServer();

  const serviceImages: Record<string, string> = {
    '01': settings.google_ads_image,
    '02': settings.meta_ads_image,
    '03': settings.web_dev_image,
    '04': settings.automation_image,
  };

  const sectionHeadingSize = settings.section_heading_size;
  const bodyTextSize = settings.body_text_size;

  return (
    <>
      <Navbar />
      <main>
        <Hero
          headlineLine1={settings.hero_headline_1}
          headlineLine2={settings.hero_headline_2}
          subtext={settings.hero_subtext}
          heroHeadlineSize={settings.hero_headline_size}
          bodyTextSize={bodyTextSize}
        />
        <Marquee />
        <TrustStrip />
        <Services
          heading={settings.services_heading}
          imageOverrides={serviceImages}
          sectionHeadingSize={sectionHeadingSize}
          bodyTextSize={bodyTextSize}
        />
        <Results
          heading={settings.results_heading}
          sectionHeadingSize={sectionHeadingSize}
          bodyTextSize={bodyTextSize}
        />
        <WhyUs
          heading={settings.whyus_heading}
          sectionHeadingSize={sectionHeadingSize}
          bodyTextSize={bodyTextSize}
        />
        <Process
          heading={settings.process_heading}
          sectionHeadingSize={sectionHeadingSize}
          bodyTextSize={bodyTextSize}
        />
        <CTA
          heading={settings.cta_heading}
          sectionHeadingSize={sectionHeadingSize}
          bodyTextSize={bodyTextSize}
        />
      </main>
      <Footer />
    </>
  );
}
