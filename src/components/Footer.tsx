import React from 'react';
import { Twitter, Github, Disc as Discord } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="relative py-12 bg-gradient-to-t from-space-blue/20 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/logooo1.jpg"
                alt="XAWAK Secondary Logo"
                className="h-10 w-10 object-contain rounded-full"
              />
              <span className="ml-2 text-2xl font-bold text-white font-['Orbitron']">
                XAWAK
              </span>
            </div>
            <p className="text-gray-400">
              Transcending the boundaries of blockchain technology
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#tokenomics"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
                >
                  Tokenomics
                </a>
              </li>
              <li>
                <a
                  href="#roadmap"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
                >
                  Roadmap
                </a>
              </li>
              <li>
                <a
                  href="#nfts"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
                >
                  NFTs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
                >
                  Whitepaper
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
              >
                <Discord className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} XAWAK. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Built by AzmaeenNoor
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;