import Header from './LandingPageComponents/Header';
import Hero from './LandingPageComponents/Hero';
import Philosophy from './LandingPageComponents/Philosophy';
import TextWorkspace from './LandingPageComponents/TextWorkspace';
import VisionWorkspace from './LandingPageComponents/VisionWorkspace';
import Working from './LandingPageComponents/Working';
import BentoGrid from './LandingPageComponents/BentoGrid';
import Footer from './LandingPageComponents/Footer';
import './LandingPageComponents/landing.css';

export default function LandingPage() {
  return (
    <div className="relative overflow-x-hidden select-none">
      <Header />
      <main>
        <Hero />
        <TextWorkspace />
        <VisionWorkspace />
        <Philosophy />
        <Working />
        <BentoGrid />
        <Footer />
      </main>
    </div>
  );
}