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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <TrustStrip />
        <Services />
        <Results />
        <WhyUs />
        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
