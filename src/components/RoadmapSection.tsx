import React from 'react';
import { Rocket, Star, Flag, Zap, Award } from 'lucide-react';

interface Milestone {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'current' | 'upcoming';
}

const RoadmapSection: React.FC = () => {
  const milestones: Milestone[] = [
    {
      date: 'Q1 2025',
      title: 'Project Launch',
      description: 'Initial token release and platform development',
      icon: <Rocket className="w-6 h-6" />,
      status: 'completed'
    },
    {
      date: 'Q2 2025',
      title: 'Exchange Listings',
      description: 'Major exchange partnerships and listings',
      icon: <Star className="w-6 h-6" />,
      status: 'current'
    },
    {
      date: 'Q3 2025',
      title: 'NFT Marketplace',
      description: 'Launch of the XAWAK NFT marketplace',
      icon: <Flag className="w-6 h-6" />,
      status: 'upcoming'
    },
    {
      date: 'Q4 2025',
      title: 'Global Expansion',
      description: 'International market penetration and partnerships',
      icon: <Zap className="w-6 h-6" />,
      status: 'upcoming'
    },
    {
      date: 'Q1 2026',
      title: 'Ecosystem Growth',
      description: 'Launch of additional platform features and tools',
      icon: <Award className="w-6 h-6" />,
      status: 'upcoming'
    }
  ];

  return (
    <section id="roadmap" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
            Roadmap to the Stars
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our journey through the cosmos is mapped out with clear milestones
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[#1E3A8A] via-[#6A0DAD] to-[#FFD700]" />

          {/* Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative pt-16 ${
                  index % 2 === 0 ? 'md:pt-16' : 'md:pt-32'
                }`}
              >
                <div
                  className={`
                    relative z-10 p-6 rounded-lg backdrop-blur-lg
                    ${
                      milestone.status === 'completed'
                        ? 'bg-space-blue/20'
                        : milestone.status === 'current'
                        ? 'bg-space-purple/20'
                        : 'bg-black/40'
                    }
                    transform hover:scale-105 transition-all duration-300
                  `}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div
                      className={`
                        p-4 rounded-full
                        ${
                          milestone.status === 'completed'
                            ? 'bg-[#1E3A8A]'
                            : milestone.status === 'current'
                            ? 'bg-[#6A0DAD]'
                            : 'bg-gray-800'
                        }
                      `}
                    >
                      {milestone.icon}
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-[#FFD700] font-semibold block mb-2">
                      {milestone.date}
                    </span>
                    <h3 className="text-white font-bold mb-2">{milestone.title}</h3>
                    <p className="text-gray-400 text-sm">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;