import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Optimized scroll handling with debouncing and throttling
    let lastScrollY = 0;
    let ticking = false;
    let activeUpdateTimeout: number | null = null;

    const handleScroll = () => {
      lastScrollY = window.pageYOffset;

      // Handle navbar visibility immediately for responsive feel
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(lastScrollY > 50);
          ticking = false;
        });
        ticking = true;
      }

      // Debounce the more expensive section detection
      if (activeUpdateTimeout) {
        clearTimeout(activeUpdateTimeout);
      }

      activeUpdateTimeout = window.setTimeout(() => {
        // Use IntersectionObserver API for better performance
        const viewportHeight = window.innerHeight;
        const viewportMiddle = viewportHeight / 2;

        // Find which section is most visible in the viewport
        const sections = document.querySelectorAll('section[id]');
        let bestVisibleSection = '';
        let maxVisibleArea = 0;

        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const sectionId = section.getAttribute('id') || '';

          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          // Give more weight to sections near the middle of the viewport
          const distanceFromMiddle = Math.abs(viewportMiddle - (visibleTop + visibleBottom) / 2);
          const visibleArea = visibleHeight * (1 - distanceFromMiddle / viewportHeight);

          if (visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea;
            bestVisibleSection = sectionId;
          }
        });

        if (bestVisibleSection && bestVisibleSection !== activeSection) {
          setActiveSection(bestVisibleSection);
        }
      }, 100); // 100ms debounce for section detection
    };

    // Use passive event listener with capture for better performance
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      if (activeUpdateTimeout) clearTimeout(activeUpdateTimeout);
    };
  }, [activeSection]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'NFTs', href: '#nfts' },
    { name: 'Team', href: '#team' },
    { name: 'Infinity', href: '#infinity-logo' },
    { name: 'Community', href: '#community' },
    { name: 'Whitepaper', href: '#whitepaper' },
    { name: 'Bundles', href: '#bundles' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      // Get the height of the navbar for proper offset
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;

      // Calculate position with a bit of extra padding for better visual spacing
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;

      // Use custom smooth scrolling for better performance
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 800; // ms - longer duration for smoother feel
      let startTime: number | null = null;

      // Easing function for natural motion
      const easeInOutCubic = (t: number): number => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);

      // Update active section manually for immediate feedback
      const sectionId = href.substring(1);
      setActiveSection(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/50 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center group">
            <img
              src="/logooo2.jpg"
              alt="XAWAK Logo"
              className="h-14 w-14 md:h-16 md:w-16 object-contain rounded-full transition-all duration-300 group-hover:scale-105 shadow-lg shadow-[#1E90FF]/20"
            />
            <span className="ml-3 text-2xl md:text-3xl font-bold text-white font-['Orbitron'] group-hover:text-[#FFD700] transition-colors duration-300">
              XAWAK
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                    ${
                      activeSection === item.href.substring(1)
                        ? 'text-[#FFD700] bg-white/5'
                        : 'text-gray-300 hover:text-[#FFD700] hover:bg-white/5'
                    }
                  `}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Launch App Button */}
          <div className="hidden md:block">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 border border-[#FFD700] rounded-md text-[#FFD700] bg-transparent hover:bg-[#FFD700] hover:text-black transition-all duration-200"
            >
              Launch App
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          md:hidden transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-md">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className={`
                block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200
                ${
                  activeSection === item.href.substring(1)
                    ? 'text-[#FFD700] bg-white/5'
                    : 'text-gray-300 hover:text-[#FFD700] hover:bg-white/5'
                }
              `}
            >
              {item.name}
            </button>
          ))}
          <a
            href="#"
            className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-[#FFD700] border border-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all duration-200 mt-4"
          >
            Launch App
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;