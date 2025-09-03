import React, { useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LookbookSection from './components/LookbookSection';
import StyleAdvisorSection from './components/StyleAdvisorSection';
import OutfitGeneratorSection from './components/OutfitGeneratorSection';
import DesignerDirectorySection from './components/DesignerDirectorySection';
import Footer from './components/Footer';
import { AppSection } from './types';

export default function App() {
  const sectionRefs = {
    [AppSection.LOOKBOOK]: useRef<HTMLDivElement>(null),
    [AppSection.ADVISOR]: useRef<HTMLDivElement>(null),
    [AppSection.GENERATOR]: useRef<HTMLDivElement>(null),
    [AppSection.DESIGNERS]: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: AppSection) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-brand-cream">
      <Header onNavigate={scrollToSection} />
      <main>
        <Hero onGetStarted={() => scrollToSection(AppSection.GENERATOR)} />
        <div ref={sectionRefs[AppSection.LOOKBOOK]}>
          <LookbookSection />
        </div>
        <div ref={sectionRefs[AppSection.ADVISOR]}>
          <StyleAdvisorSection />
        </div>
        <div ref={sectionRefs[AppSection.GENERATOR]}>
          <OutfitGeneratorSection />
        </div>
        <div ref={sectionRefs[AppSection.DESIGNERS]}>
          <DesignerDirectorySection />
        </div>
      </main>
      <Footer />
    </div>
  );
}