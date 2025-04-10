import React, { useEffect, useRef, useState } from 'react';
import { Circle, DollarSign, Users, Rocket, Shield, Sparkles } from 'lucide-react';

interface TokenDistribution {
  label: string;
  percentage: number;
  color: string;
  description: string;
  icon: React.ReactNode;
}

const TokenomicsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [animatedPercentages, setAnimatedPercentages] = useState<{[key: string]: number}>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const distribution: TokenDistribution[] = [
    {
      label: 'Liquidity Pool',
      percentage: 40,
      color: '#FFD700',
      description: 'Ensures trading stability and market depth',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      label: 'Development',
      percentage: 25,
      color: '#FF0000',
      description: 'Fuels ongoing platform innovations',
      icon: <Rocket className="w-6 h-6" />
    },
    {
      label: 'Community Rewards',
      percentage: 20,
      color: '#6A0DAD',
      description: 'Powers staking rewards and airdrops',
      icon: <Users className="w-6 h-6" />
    },
    {
      label: 'Team & Advisors',
      percentage: 15,
      color: '#1E3A8A',
      description: 'Aligns long-term vision with growth',
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const tokenDetails = [
    { label: 'Total Supply', value: '1,000,000,000 XAWAK' },
    { label: 'Initial Price', value: '$0.01' },
    { label: 'Market Cap', value: '$50,000,000' },
    { label: 'Circulating Supply', value: '450,000,000 XAWAK' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animate percentages when section becomes visible
          const initialPercentages: {[key: string]: number} = {};
          distribution.forEach(segment => {
            initialPercentages[segment.label] = 0;
          });
          setAnimatedPercentages(initialPercentages);

          // Animate each percentage to its final value
          distribution.forEach(segment => {
            animatePercentage(segment.label, segment.percentage);
          });

          // Create cosmic particles
          if (particlesRef.current) {
            createCosmicParticles();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      // Clean up any animation frames or intervals here
    };
  }, []);

  // Function to animate percentage counters
  const animatePercentage = (label: string, targetValue: number) => {
    let startValue = 0;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const updateCounter = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime < duration) {
        // Calculate the current value based on elapsed time
        const value = Math.ceil((elapsedTime / duration) * targetValue);
        setAnimatedPercentages(prev => ({ ...prev, [label]: value }));
        requestAnimationFrame(updateCounter);
      } else {
        // Ensure we reach exactly the target value
        setAnimatedPercentages(prev => ({ ...prev, [label]: targetValue }));
      }
    };

    requestAnimationFrame(updateCounter);
  };

  // Function to create cosmic particles
  const createCosmicParticles = () => {
    if (!particlesRef.current) return;

    const container = particlesRef.current;
    const colors = ['#FFD700', '#FF0000', '#6A0DAD', '#1E3A8A', '#FFFFFF'];

    // Create 30 particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 1; // 1-5px
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Set particle styles
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.opacity = (Math.random() * 0.5 + 0.3).toString(); // 0.3-0.8

      // Random position around the chart
      const angle = Math.random() * Math.PI * 2; // 0-360 degrees
      const distance = 100 + Math.random() * 150; // 100-250px from center
      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;

      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      // Add animation
      particle.style.animation = `
        float ${3 + Math.random() * 7}s ease-in-out infinite ${Math.random() * 5}s,
        pulse-glow ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s
      `;

      container.appendChild(particle);
    }
  };

  const calculateRotation = (index: number): number => {
    let rotation = 0;
    for (let i = 0; i < index; i++) {
      rotation += (distribution[i].percentage / 100) * 360;
    }
    return rotation;
  };

  return (
    <section id="tokenomics" className="relative py-20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] mb-4">
            XAWAK Tokenomics
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our tokenomics model is designed to ensure long-term sustainability
            and value for all XAWAK holders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced 3D Pie Chart */}
          <div className="relative" ref={chartRef}>
            {/* Cosmic particles container */}
            <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0"></div>

            {/* Glowing background effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-[#FF0000]/30 via-transparent to-transparent blur-xl animate-pulse-glow"></div>

            <div className="aspect-square relative">
              {/* Chart container with 3D effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden transform transition-all duration-500 hover:scale-110 shadow-[0_0_50px_rgba(255,215,0,0.3)] hover:shadow-[0_0_70px_rgba(255,215,0,0.5)] group">
                {/* Outer glowing ring that intensifies on hover */}
                <div className="absolute -inset-1 rounded-full border-4 border-[#FFD700]/10 group-hover:border-[#FFD700]/30 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] blur-sm"></div>
                {/* Center circle */}
                <div className="absolute inset-[30%] bg-black rounded-full z-10 flex items-center justify-center shadow-inner transition-all duration-500 group-hover:shadow-[inset_0_0_20px_rgba(255,215,0,0.3)] overflow-hidden">
                  {/* Logo background glow */}
                  <div className="absolute inset-0 bg-gradient-radial from-[#FFD700]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Logo image */}
                  <div className="relative w-full h-full p-1 transition-all duration-500 transform group-hover:scale-110">
                    <img
                      src="/logooo1.jpg"
                      alt="XAWAK Logo"
                      className="w-full h-full object-contain rounded-full transition-all duration-500 group-hover:brightness-110"
                    />

                    {/* Overlay text at bottom */}
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-center">
                      <div className="text-center bg-black/60 px-3 py-1 rounded-t-md backdrop-blur-sm transition-all duration-500 group-hover:bg-black/50 w-full">
                        <div className="text-[#FFD700] font-orbitron font-bold text-xs group-hover:text-[#FFE44D] transition-colors duration-500 group-hover:text-shadow flex items-center justify-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#FFD700] animate-pulse group-hover:text-[#FFE44D] transition-colors duration-500" />
                          XAWAK
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pulsing ring around center */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#FFD700]/30 group-hover:border-[#FFD700]/60 animate-ping-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Pie segments */}
                {distribution.map((segment, index) => {
                  const rotation = calculateRotation(index);
                  const isHovered = hoveredSegment === segment.label;
                  const segmentAngle = (segment.percentage / 100) * 2 * Math.PI;
                  const midAngle = rotation * (Math.PI / 180) + segmentAngle / 2;

                  // Calculate position for the tooltip
                  const tooltipX = 50 + 35 * Math.cos(midAngle);
                  const tooltipY = 50 + 35 * Math.sin(midAngle);

                  return (
                    <div
                      key={segment.label}
                      className="absolute inset-0 transition-all duration-500"
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos(segmentAngle)}% ${50 + 50 * Math.sin(segmentAngle)}%)`,
                        filter: isHovered ? 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' : 'none',
                      }}
                      onMouseEnter={() => setHoveredSegment(segment.label)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      {/* Segment background with 3D effect */}
                      <div
                        className="absolute inset-0 transition-all duration-500"
                        style={{
                          background: isHovered
                            ? `linear-gradient(135deg, ${segment.color}, ${segment.color}EE)`
                            : `linear-gradient(135deg, ${segment.color}, ${segment.color}CC)`,
                          transform: isHovered ? 'translateZ(15px) scale(1.08)' : 'translateZ(0) scale(1)',
                          filter: isHovered ? 'brightness(1.7) contrast(1.1)' : 'brightness(1)',
                          boxShadow: isHovered ? `0 0 30px ${segment.color}A0` : 'none',
                          border: isHovered ? `2px solid ${segment.color}` : 'none',
                        }}
                      />

                      {/* Additional glow effect on hover */}
                      {isHovered && (
                        <div
                          className="absolute inset-0 transition-all duration-500 animate-pulse-glow"
                          style={{
                            background: `radial-gradient(circle at center, ${segment.color}80 0%, transparent 70%)`,
                            clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos(segmentAngle)}% ${50 + 50 * Math.sin(segmentAngle)}%)`,
                            transform: `rotate(${rotation}deg)`,
                            opacity: 0.6,
                          }}
                        />
                      )}

                      {/* Bright glowing border on hover */}
                      {isHovered && (
                        <div
                          className="absolute inset-0 animate-pulse-glow z-10 pointer-events-none"
                          style={{
                            border: `3px solid ${segment.color}`,
                            borderRadius: '50% 0 0 50% / 50% 0 0 50%',
                            transform: 'rotate(0deg)',
                            transformOrigin: 'center',
                            clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos(segmentAngle)}% ${50 + 50 * Math.sin(segmentAngle)}%)`,
                            boxShadow: `0 0 20px ${segment.color}, inset 0 0 15px ${segment.color}`,
                            opacity: 0.9,
                          }}
                        />
                      )}

                      {/* Pulsing highlight effect */}
                      {isHovered && (
                        <div
                          className="absolute inset-0 z-5 pointer-events-none animate-ping-slow"
                          style={{
                            background: `linear-gradient(135deg, ${segment.color}50, transparent)`,
                            clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos(segmentAngle)}% ${50 + 50 * Math.sin(segmentAngle)}%)`,
                            transform: `rotate(${rotation}deg)`,
                            opacity: 0.4,
                          }}
                        />
                      )}

                      {/* Percentage tooltip */}
                      {isHovered && (
                        <div
                          className="absolute z-20 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-bold transform -translate-x-1/2 -translate-y-1/2 border border-[#FFD700]/50 backdrop-blur-sm animate-fade-in"
                          style={{
                            left: `${tooltipX}%`,
                            top: `${tooltipY}%`,
                          }}
                        >
                          {segment.percentage}%
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Animated overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/10 via-[#1E3A8A]/10 to-[#6A0DAD]/10 rounded-full animate-spin-slow opacity-50" />

                {/* Glowing ring */}
                <div className="absolute inset-[-5px] rounded-full border-4 border-[#FFD700]/20 animate-pulse-glow"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Distribution Details */}
          <div className="space-y-6">
            {distribution.map((segment) => {
              const isActive = hoveredSegment === segment.label;
              const currentPercentage = animatedPercentages[segment.label] || 0;

              return (
                <div
                  key={segment.label}
                  className={`
                    transform transition-all duration-500
                    ${isActive ? 'scale-105 translate-x-2' : 'scale-100'}
                  `}
                  onMouseEnter={() => setHoveredSegment(segment.label)}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  <div
                    className="rounded-lg p-6 backdrop-blur-sm transition-all duration-500 relative overflow-hidden group"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${segment.color}20, ${segment.color}05)`
                        : 'rgba(30, 58, 138, 0.1)',
                      boxShadow: isActive
                        ? `0 10px 25px -5px ${segment.color}40`
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      borderLeft: isActive ? `4px solid ${segment.color}` : '4px solid transparent'
                    }}
                  >
                    {/* Background glow effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${segment.color}30 0%, transparent 70%)`,
                      }}
                    ></div>

                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center space-x-3">
                        <div
                          className="p-3 rounded-full transition-all duration-500 relative"
                          style={{
                            backgroundColor: segment.color + (isActive ? '30' : '20'),
                            boxShadow: isActive ? `0 0 15px ${segment.color}50` : 'none'
                          }}
                        >
                          {segment.icon}
                          {/* Animated ring */}
                          <div
                            className={`absolute inset-0 rounded-full border-2 ${isActive ? 'opacity-100' : 'opacity-0'} transition-all duration-500`}
                            style={{ borderColor: segment.color }}
                          ></div>
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {segment.label}
                        </h3>
                      </div>

                      {/* Circular progress indicator */}
                      <div className="relative h-16 w-16 flex items-center justify-center">
                        {/* Background circle */}
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="8"
                          />
                        </svg>

                        {/* Progress circle */}
                        <svg className="absolute inset-0 h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={segment.color}
                            strokeWidth="8"
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 - (251.2 * currentPercentage / 100)}
                            strokeLinecap="round"
                            className="transition-all duration-1000"
                          />
                        </svg>

                        {/* Percentage text */}
                        <span className="text-2xl font-bold" style={{ color: segment.color }}>
                          {currentPercentage}%
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-300 relative z-10">{segment.description}</p>

                    {/* Connecting line to pie chart (visible on hover) */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 w-6 h-0.5 -ml-6 animate-fade-in" style={{ backgroundColor: segment.color }}></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Token Details */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {tokenDetails.map((detail, index) => (
            <div
              key={index}
              className="p-6 rounded-lg text-center transition-all duration-500 transform hover:scale-105 relative group overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.2), rgba(106, 13, 173, 0.1))',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Animated background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
                }}
              ></div>

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-[#FFD700] animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      opacity: 0.6,
                    }}
                  ></div>
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <p className="text-gray-300 text-sm mb-3 font-medium">{detail.label}</p>
                <p className="text-[#FFD700] font-bold text-xl font-orbitron">{detail.value}</p>
              </div>

              {/* Bottom border glow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background: 'linear-gradient(to right, transparent, #FFD700, transparent)',
                  boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;