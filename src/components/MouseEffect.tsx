import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  rotation: number;
  lifespan: number;
  createdAt: number;
}

const MouseEffect: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const particleIdRef = useRef(0);
  const lastParticleTimeRef = useRef(0);
  
  // Colors for particles
  const colors = ['#FFD700', '#FF0000', '#6A0DAD', '#1E3A8A', '#FFFFFF'];
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Create and animate particles
  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time;
      }
      
      const deltaTime = time - (previousTimeRef.current || 0);
      previousTimeRef.current = time;
      
      // Create new particles at intervals
      if (time - lastParticleTimeRef.current > 50) { // Create a particle every 50ms
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: mousePosition.x,
          y: mousePosition.y,
          size: Math.random() * 10 + 5, // 5-15px
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.8,
          rotation: Math.random() * 360,
          lifespan: Math.random() * 1000 + 500, // 500-1500ms
          createdAt: time,
        };
        
        setParticles(prevParticles => [...prevParticles, newParticle]);
        lastParticleTimeRef.current = time;
      }
      
      // Update existing particles
      setParticles(prevParticles => 
        prevParticles
          .map(particle => {
            const age = time - particle.createdAt;
            const lifeProgress = age / particle.lifespan;
            
            // Remove particles that have exceeded their lifespan
            if (lifeProgress >= 1) {
              return null;
            }
            
            // Update particle properties based on age
            return {
              ...particle,
              opacity: 0.8 * (1 - lifeProgress),
              size: particle.size * (1 - lifeProgress * 0.5),
              x: particle.x + Math.cos(particle.rotation * Math.PI / 180) * deltaTime * 0.05,
              y: particle.y + Math.sin(particle.rotation * Math.PI / 180) * deltaTime * 0.05,
            };
          })
          .filter(Boolean) as Particle[]
      );
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mousePosition]);
  
  // Custom cursor styles
  const cursorStyle: React.CSSProperties = {
    position: 'fixed',
    left: `${mousePosition.x}px`,
    top: `${mousePosition.y}px`,
    width: '30px',
    height: '30px',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
  };
  
  return (
    <>
      {/* Custom cursor */}
      <div style={cursorStyle}>
        <div className="relative w-full h-full">
          <svg 
            width="30" 
            height="30" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="animate-pulse"
          >
            <path 
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
              fill="#FFD700" 
              stroke="#FFD700" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      
      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'fixed',
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: '50%',
            opacity: particle.opacity,
            pointerEvents: 'none',
            zIndex: 9998,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${particle.size / 2}px ${particle.color}`,
          }}
        />
      ))}
    </>
  );
};

export default MouseEffect;
