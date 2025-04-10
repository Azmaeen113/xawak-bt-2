import React from 'react';
import { FileText, Download, ExternalLink, BookOpen } from 'lucide-react';

const WhitepaperSection: React.FC = () => {
  return (
    <section id="whitepaper" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] mb-4 whitespace-nowrap">
            Whitepaper
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto px-4">
            <span className="inline-block">Explore the technical details and vision</span> <span className="inline-block">behind XAWAK in our comprehensive whitepaper</span>
          </p>
        </div>

        {/* Whitepaper Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Whitepaper Preview */}
          <div className="relative group">
            <div className="aspect-[3/4] bg-gradient-to-b from-[#1E3A8A]/10 to-[#6A0DAD]/10 rounded-lg overflow-hidden border border-[#FFD700]/20 shadow-lg shadow-[#FFD700]/10 transition-all duration-500 group-hover:shadow-[#FFD700]/30 group-hover:border-[#FFD700]/40">
              {/* Document Preview */}
              <div className="absolute inset-0 flex flex-col p-8">
                {/* Document Header */}
                <div className="mb-8 text-center">
                  <div className="flex justify-center mb-4">
                    <img
                      src="/logooo2.jpg"
                      alt="XAWAK Logo"
                      className="w-16 h-16 object-contain rounded-full"
                    />
                  </div>
                  <h3 className="text-2xl font-orbitron font-bold text-white mb-2">XAWAK Whitepaper</h3>
                  <p className="text-[#FFD700] text-sm">v1.0.0 | 2025</p>
                </div>

                {/* Document Content Preview */}
                <div className="space-y-4 flex-grow">
                  <div className="h-2 bg-white/20 rounded-full w-full"></div>
                  <div className="h-2 bg-white/20 rounded-full w-5/6"></div>
                  <div className="h-2 bg-white/20 rounded-full w-4/6"></div>
                  <div className="h-2 bg-white/20 rounded-full w-full"></div>
                  <div className="h-2 bg-white/20 rounded-full w-3/6"></div>
                  <div className="h-2 bg-white/20 rounded-full w-5/6"></div>
                  <div className="h-2 bg-white/20 rounded-full w-4/6"></div>
                  <div className="h-2 bg-white/20 rounded-full w-full"></div>
                  <div className="h-2 bg-white/20 rounded-full w-3/6"></div>
                </div>

                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <FileText className="w-48 h-48 text-[#FFD700]" />
                </div>
              </div>
            </div>

            {/* Glowing effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/20 to-[#FFD700]/0 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          </div>

          {/* Right Side - Whitepaper Details & Download */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-orbitron font-bold text-white">Technical Documentation</h3>
              <p className="text-gray-300">
                Our whitepaper provides a comprehensive overview of the XAWAK ecosystem, tokenomics, technology stack, and future roadmap. Dive deep into the technical aspects that make XAWAK revolutionary.
              </p>
            </div>

            <div className="space-y-6">
              {/* Whitepaper Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#1E3A8A]/20 to-[#6A0DAD]/20 p-4 rounded-lg border border-[#FFD700]/10">
                  <h4 className="font-orbitron font-bold text-[#FFD700] mb-2 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Technology
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Detailed explanation of our proprietary blockchain technology
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#1E3A8A]/20 to-[#6A0DAD]/20 p-4 rounded-lg border border-[#FFD700]/10">
                  <h4 className="font-orbitron font-bold text-[#FFD700] mb-2 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Tokenomics
                  </h4>
                  <p className="text-gray-300 text-sm">
                    In-depth analysis of token distribution and economic model
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#1E3A8A]/20 to-[#6A0DAD]/20 p-4 rounded-lg border border-[#FFD700]/10">
                  <h4 className="font-orbitron font-bold text-[#FFD700] mb-2 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Roadmap
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Detailed timeline of development milestones and future plans
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#1E3A8A]/20 to-[#6A0DAD]/20 p-4 rounded-lg border border-[#FFD700]/10">
                  <h4 className="font-orbitron font-bold text-[#FFD700] mb-2 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Use Cases
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Real-world applications and integration possibilities
                  </p>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#"
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-lg text-black font-bold transition-transform duration-300 hover:scale-105 shadow-lg shadow-[#FFD700]/20"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center px-6 py-3 bg-transparent border border-[#FFD700] rounded-lg text-[#FFD700] font-bold transition-all duration-300 hover:bg-[#FFD700]/10"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Read Online
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhitepaperSection;
