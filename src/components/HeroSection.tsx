import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/20 via-[#6A0DAD]/20 to-transparent" />

        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Star className="w-12 h-12 text-[#FFD700]/20" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delayed">
          <Star className="w-8 h-8 text-[#FFD700]/30" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float-slow">
          <Star className="w-16 h-16 text-[#FFD700]/10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img
                src="/logooo2.jpg"
                alt="XAWAK Logo"
                className="w-32 h-32 object-contain rounded-full animate-pulse shadow-lg shadow-[#FFD700]/30"
              />
              <div className="absolute inset-0 bg-[#FFD700]/20 blur-xl rounded-full" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white font-['Orbitron'] mb-6 animate-fade-in">
            Transcend the Speed of Light with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] animate-pulse">
              XAWAK
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Join the next generation of cosmic exploration in the digital frontier.
            <br />
            Experience unprecedented speed, security, and innovation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group px-8 py-4 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFE44D] transform hover:scale-105 transition-all duration-200 font-semibold flex items-center gap-2 shadow-lg shadow-[#FFD700]/20">
              Join the Odyssey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group px-8 py-4 border-2 border-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/20 transition-all duration-200 font-semibold flex items-center gap-2">
              Explore XAWAK
              <Star className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { label: 'Total Value Locked', value: '$50M+' },
              { label: 'Daily Transactions', value: '1M+' },
              { label: 'Active Users', value: '100K+' }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-[#FFD700] text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;