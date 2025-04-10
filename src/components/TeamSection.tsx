import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const TeamSection: React.FC = () => {
  const team: TeamMember[] = [
    {
      name: 'Pioneer Alpha',
      role: 'Quantum Architect',
      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      bio: 'Leading the quantum revolution in blockchain technology',
      social: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Pioneer Beta',
      role: 'Nebula Engineer',
      image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      bio: 'Architecting the future of decentralized systems',
      social: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Pioneer Gamma',
      role: 'Cosmic Strategist',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      bio: 'Mapping the trajectory of blockchain evolution',
      social: {
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Pioneer Delta',
      role: 'Stellar Developer',
      image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      bio: 'Crafting the infrastructure of tomorrow',
      social: {
        github: '#',
        linkedin: '#'
      }
    }
  ];

  return (
    <section id="team" className="relative py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#FF0000] animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.4,
            }}
          />
        ))}

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-radial from-[#FF0000]/20 via-transparent to-transparent blur-3xl animate-pulse-glow" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-radial from-[#6A0DAD]/20 via-transparent to-transparent blur-3xl animate-pulse-glow" style={{ animationDuration: '12s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] mb-4">
            Meet the Pioneers
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            The visionaries and experts building the future of XAWAK
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="relative group transform transition-all duration-500 hover:scale-105"
            >
              {/* Glowing border effect with red */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF0000]/30 via-[#FFD700]/20 to-[#FF0000]/30 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>

              <div className="relative overflow-hidden rounded-lg aspect-square shadow-lg shadow-[#FF0000]/10 group-hover:shadow-[#FF0000]/30 transition-all duration-500 border border-[#FF0000]/10 group-hover:border-[#FF0000]/30">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-radial from-[#FF0000]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-500" />

                {/* Cosmic Overlay with animation and red */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/30 via-[#1E3A8A]/20 to-[#6A0DAD]/20 mix-blend-overlay animate-pulse-glow" style={{ animationDuration: `${8 + index}s` }} />

                {/* Interactive Particles */}
                <div className="absolute inset-0 transition-opacity duration-500">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-[#FF0000] rounded-full animate-ping-slow"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${2 + Math.random() * 3}s`,
                        opacity: 0.6,
                      }}
                    />
                  ))}
                </div>

                {/* Member info overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-xl font-bold text-white mb-1 font-orbitron">{member.name}</h3>
                  <p className="text-[#FF0000] font-semibold mb-2">{member.role}</p>
                </div>
              </div>

              <div className="relative mt-6 p-4 rounded-lg bg-gradient-to-br from-[#FF0000]/10 via-[#1E3A8A]/10 to-[#6A0DAD]/10 backdrop-blur-sm border border-[#FF0000]/5 group-hover:border-[#FF0000]/30 transition-all duration-500">
                <p className="text-gray-300 text-sm mb-4">{member.bio}</p>

                <div className="flex justify-center space-x-4">
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="text-gray-400 hover:text-[#FF0000] transition-colors duration-300 transform hover:scale-110"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="text-gray-400 hover:text-[#FF0000] transition-colors duration-300 transform hover:scale-110"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="text-gray-400 hover:text-[#FF0000] transition-colors duration-300 transform hover:scale-110"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;