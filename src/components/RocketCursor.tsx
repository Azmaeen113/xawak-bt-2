import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  lifespan: number;
  createdAt: number;
}

const RocketCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const particleIdRef = useRef(0);
  const lastParticleTimeRef = useRef(0);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const movementTimeoutRef = useRef<NodeJS.Timeout>();

  // Colors for rocket flame particles - bluish sparkle colors
  const flameColors = ['#00BFFF', '#1E90FF', '#4169E1', '#0000FF', '#87CEFA', '#ADD8E6'];

  // Track mouse position and movement - with touch detection
  useEffect(() => {
    // Skip event listeners if we detect touch capability
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Prevent handling touch events disguised as mouse events
      if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) {
        return;
      }

      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if mouse is actually moving (not just hovering)
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastMousePositionRef.current.x, 2) +
        Math.pow(e.clientY - lastMousePositionRef.current.y, 2)
      );

      if (distance > 5) {
        setIsMoving(true);
        lastMousePositionRef.current = { x: e.clientX, y: e.clientY };

        // Reset the timeout
        if (movementTimeoutRef.current) {
          clearTimeout(movementTimeoutRef.current);
        }

        // Set a timeout to detect when movement stops
        movementTimeoutRef.current = setTimeout(() => {
          setIsMoving(false);
        }, 100);
      }
    };

    // Use passive event listener to improve performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (movementTimeoutRef.current) {
        clearTimeout(movementTimeoutRef.current);
      }
    };
  }, []);

  // Create and animate particles
  useEffect(() => {
    // Skip animation on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const animate = (time: number) => {
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time;
      }

      const deltaTime = time - (previousTimeRef.current || 0);
      previousTimeRef.current = time;

      // Create new particles at intervals when mouse is moving
      if (isMoving && time - lastParticleTimeRef.current > 15) { // Create particles more frequently
        // Calculate position behind the rocket
        const angle = Math.atan2(
          lastMousePositionRef.current.y - mousePosition.y,
          lastMousePositionRef.current.x - mousePosition.x
        );

        const offsetX = Math.cos(angle) * 15;
        const offsetY = Math.sin(angle) * 15;

        // Create 3-5 particles for a fuller sparkle effect
        const particleCount = Math.floor(Math.random() * 3) + 3;

        for (let i = 0; i < particleCount; i++) {
          // Create more scattered particles for a sparkle effect
          const spreadAngle = angle + (Math.random() * 1.2 - 0.6); // Wider spread
          const spreadDistance = Math.random() * 8;

          // Randomize particle shape by varying size
          const size = Math.random() * 6 + 2; // 2-8px

          // Add some randomness to position for sparkle effect
          const jitterX = (Math.random() - 0.5) * 10;
          const jitterY = (Math.random() - 0.5) * 10;

          const newParticle: Particle = {
            id: particleIdRef.current++,
            x: mousePosition.x + offsetX + Math.cos(spreadAngle) * spreadDistance + jitterX,
            y: mousePosition.y + offsetY + Math.sin(spreadAngle) * spreadDistance + jitterY,
            size: size,
            color: flameColors[Math.floor(Math.random() * flameColors.length)],
            opacity: 0.9,
            lifespan: Math.random() * 800 + 400, // 400-1200ms (longer lasting)
            createdAt: time,
          };

          setParticles(prevParticles => [...prevParticles, newParticle]);
        }

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
              size: particle.size * (1 - lifeProgress * 0.3),
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
  }, [mousePosition, isMoving]);

  // Calculate rocket rotation based on movement
  const rocketRotation = useRef(0);

  useEffect(() => {
    if (isMoving) {
      const dx = mousePosition.x - lastMousePositionRef.current.x;
      const dy = mousePosition.y - lastMousePositionRef.current.y;

      if (dx !== 0 || dy !== 0) {
        rocketRotation.current = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      }
    }
  }, [mousePosition, isMoving]);

  // Custom cursor styles
  const cursorStyle: React.CSSProperties = {
    position: 'fixed',
    left: `${mousePosition.x}px`,
    top: `${mousePosition.y}px`,
    width: '30px',
    height: '30px',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: `translate(-50%, -50%) rotate(${rocketRotation.current}deg)`,
    transition: 'transform 0.1s ease-out',
  };

  return (
    <>
      {/* Custom rocket cursor */}
      <div style={cursorStyle}>
        <svg
          width="30"
          height="40"
          viewBox="0 0 24 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Arrow-shaped rocket body */}
          <path
            d="M12 2L22 12H16V24H8V12H2L12 2Z"
            fill="#1E3A8A"
            stroke="#00BFFF"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Rocket window */}
          <circle
            cx="12"
            cy="10"
            r="2"
            fill="#87CEFA"
            stroke="#FFFFFF"
            strokeWidth="0.5"
          />

          {/* Rocket side boosters */}
          <path
            d="M8 16L5 18V14L8 16Z"
            fill="#4169E1"
            stroke="#00BFFF"
            strokeWidth="0.5"
          />
          <path
            d="M16 16L19 18V14L16 16Z"
            fill="#4169E1"
            stroke="#00BFFF"
            strokeWidth="0.5"
          />

          {/* Rocket flames (static) */}
          <path
            d="M10 24L8 30L12 28L16 30L14 24"
            fill="#00BFFF"
            stroke="#87CEFA"
            strokeWidth="0.5"
            className="animate-pulse"
          />

          {/* Sparkle effects */}
          <circle cx="6" cy="8" r="0.5" fill="#FFFFFF" className="animate-ping-slow" />
          <circle cx="18" cy="8" r="0.5" fill="#FFFFFF" className="animate-ping-slow" style={{ animationDelay: '0.5s' }} />
          <circle cx="10" cy="6" r="0.5" fill="#FFFFFF" className="animate-ping-slow" style={{ animationDelay: '0.3s' }} />
          <circle cx="14" cy="6" r="0.5" fill="#FFFFFF" className="animate-ping-slow" style={{ animationDelay: '0.7s' }} />
        </svg>
      </div>

      {/* Flame particles */}
      {particles.map(particle => {
        // Randomly choose between circle and star shape for particles
        const isStarShape = Math.random() > 0.7;

        return isStarShape ? (
          // Star-shaped sparkle
          <div
            key={particle.id}
            style={{
              position: 'fixed',
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size * 2}px`,
              height: `${particle.size * 2}px`,
              backgroundColor: 'transparent',
              opacity: particle.opacity,
              pointerEvents: 'none',
              zIndex: 9998,
              transform: 'translate(-50%, -50%) rotate(45deg)',
            }}
          >
            {/* Create star shape using multiple divs */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: `${particle.size / 3}px`,
              backgroundColor: particle.color,
              transform: 'translateY(-50%)',
              boxShadow: `0 0 ${particle.size / 2}px ${particle.color}`,
            }} />
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '0',
              bottom: '0',
              width: `${particle.size / 3}px`,
              backgroundColor: particle.color,
              transform: 'translateX(-50%)',
              boxShadow: `0 0 ${particle.size / 2}px ${particle.color}`,
            }} />
          </div>
        ) : (
          // Circle-shaped sparkle
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
              boxShadow: `0 0 ${particle.size}px ${particle.color}`,
            }}
          />
        );
      })}
    </>
  );
};

export default RocketCursor;
