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
    <section id="team" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
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
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Cosmic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/20 to-[#6A0DAD]/20 mix-blend-overlay" />
                
                {/* Interactive Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />
                  <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-[#FFD700] rounded-full animate-pulse delay-100" />
                  <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-[#FFD700] rounded-full animate-pulse delay-200" />
                </div>
              </div>

              <div className="relative mt-6 text-center">
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-[#FFD700] font-semibold mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4">{member.bio}</p>

                <div className="flex justify-center space-x-4">
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
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