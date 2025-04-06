import React from 'react';
import { Rocket, Star, Zap, Globe } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <Star className="w-6 h-6 text-[#FFD700]" />,
      title: 'Revolutionary Technology',
      description: 'Pushing the boundaries of blockchain innovation'
    },
    {
      icon: <Zap className="w-6 h-6 text-[#FFD700]" />,
      title: 'Lightning Fast',
      description: 'Instant transactions at minimal cost'
    },
    {
      icon: <Globe className="w-6 h-6 text-[#FFD700]" />,
      title: 'Global Access',
      description: 'Available worldwide with no restrictions'
    }
  ];

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-orbitron font-bold text-white">
              The XAWAK Universe
            </h2>
            <p className="text-gray-300 text-lg">
              XAWAK represents the next evolution in blockchain technology, 
              combining cutting-edge innovation with unparalleled security and 
              scalability. Our mission is to create a decentralized ecosystem 
              that transcends traditional boundaries.
            </p>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-space-blue/20 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="px-6 py-3 bg-transparent border-2 border-[#FFD700] text-[#FFD700] rounded-md hover:bg-[#FFD700] hover:text-black transition-all duration-300">
              Learn More
            </button>
          </div>
          
          <div className="relative">
            <div className="aspect-square relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Rocket 
                  className="w-48 h-48 text-[#FFD700] animate-pulse transform rotate-45"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))'
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/20 to-[#6A0DAD]/20 rounded-full animate-spin-slow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;