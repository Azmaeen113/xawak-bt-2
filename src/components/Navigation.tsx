import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.scrollY;

      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'NFTs', href: '#nfts' },
    { name: 'Team', href: '#team' },
    { name: 'Community', href: '#community' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Height of the fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
              className="h-10 w-10 object-contain rounded-full transition-all duration-300 group-hover:scale-105"
            />
            <span className="ml-2 text-2xl font-bold text-white font-['Orbitron'] group-hover:text-[#FFD700] transition-colors duration-300">
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