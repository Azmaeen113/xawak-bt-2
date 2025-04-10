import React, { useState, useEffect } from 'react';
import StarBackground from './components/StarBackground';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TokenomicsSection from './components/TokenomicsSection';
import RoadmapSection from './components/RoadmapSection';
import NftSection from './components/NftSection';
import TeamSection from './components/TeamSection';
import CommunitySection from './components/CommunitySection';
import WhitepaperSection from './components/WhitepaperSection';
import BundlesSection from './components/BundlesSection';
import InfinityLogoSection from './components/InfinityLogoSection';
import Footer from './components/Footer';
import MouseEffect from './components/MouseEffect';
import RocketCursor from './components/RocketCursor';
import KatanaCursor from './components/KatanaCursor';

function App() {
  const [cursorEffect, setCursorEffect] = useState<'sparkle' | 'rocket' | 'katana'>('katana');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle cursor effect with 'c' key (desktop only)
  useEffect(() => {
    if (isMobile) return; // Skip on mobile

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'c') {
        setCursorEffect(prev => {
          if (prev === 'sparkle') return 'rocket';
          if (prev === 'rocket') return 'katana';
          return 'sparkle';
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile]);

  // Hide default cursor (desktop only)
  useEffect(() => {
    if (isMobile) {
      document.body.style.cursor = 'auto';
      return;
    }

    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [isMobile]);

  // Render the appropriate cursor based on the selected effect
  const renderCursor = () => {
    if (isMobile) return null;

    switch (cursorEffect) {
      case 'sparkle':
        return <MouseEffect />;
      case 'rocket':
        return <RocketCursor />;
      case 'katana':
        return <KatanaCursor />;
      default:
        return <KatanaCursor />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Custom cursor effect - only on desktop */}
      {renderCursor()}

      <StarBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <TokenomicsSection />
      <RoadmapSection />
      <NftSection />
      <TeamSection />
      <InfinityLogoSection />
      <CommunitySection />
      <WhitepaperSection />
      <BundlesSection />
      <Footer />
    </div>
  );
}

export default App;