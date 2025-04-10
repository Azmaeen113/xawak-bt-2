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

const KatanaCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const [rotation, setRotation] = useState(0);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const particleIdRef = useRef(0);
  const lastParticleTimeRef = useRef(0);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const movementTimeoutRef = useRef<NodeJS.Timeout>();

  // Colors for katana sparkle particles - red theme with more vibrant colors
  const sparkleColors = ['#FF0000', '#FF3333', '#FF6666', '#FF0000', '#FF3333', '#FFFFFF', '#FF0000'];

  // Track mouse position and movement
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

      // Calculate movement direction for rotation
      const dx = e.clientX - lastMousePositionRef.current.x;
      const dy = e.clientY - lastMousePositionRef.current.y;

      // Only update rotation if there's significant movement
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        setRotation(angle + 45); // Add 45 degrees to align katana with movement
      }

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
        // Calculate position for particles (along the katana blade)
        const katanaLength = 40; // Length of katana in pixels
        const katanaAngle = rotation * (Math.PI / 180);

        // Create 3-5 particles for a fuller sparkle effect
        const particleCount = Math.floor(Math.random() * 3) + 3;

        for (let i = 0; i < particleCount; i++) {
          // Position particles along the blade
          const distanceFromTip = Math.random() * katanaLength;
          const offsetX = Math.cos(katanaAngle) * distanceFromTip;
          const offsetY = Math.sin(katanaAngle) * distanceFromTip;

          // Add some randomness for sparkle effect
          const jitterRadius = 5;
          const jitterAngle = Math.random() * Math.PI * 2;
          const jitterX = Math.cos(jitterAngle) * jitterRadius * Math.random();
          const jitterY = Math.sin(jitterAngle) * jitterRadius * Math.random();

          const newParticle: Particle = {
            id: particleIdRef.current++,
            x: mousePosition.x + offsetX + jitterX,
            y: mousePosition.y + offsetY + jitterY,
            size: Math.random() * 4 + 1, // 1-5px
            color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
            opacity: 0.9,
            lifespan: Math.random() * 500 + 300, // 300-800ms
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
              opacity: 0.9 * (1 - lifeProgress),
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
  }, [mousePosition, isMoving, rotation]);

  // Custom cursor styles
  const cursorStyle: React.CSSProperties = {
    position: 'fixed',
    left: `${mousePosition.x}px`,
    top: `${mousePosition.y}px`,
    width: '40px',
    height: '40px',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
    transition: 'transform 0.1s ease-out',
  };

  return (
    <>
      {/* Custom katana cursor */}
      <div style={cursorStyle}>
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-pulse-slow"
        >
          {/* Katana handle */}
          <rect
            x="5"
            y="23"
            width="12"
            height="4"
            rx="1"
            fill="#8B0000"
            stroke="#FF0000"
            strokeWidth="0.5"
          />

          {/* Katana handle wrapping */}
          <rect
            x="7"
            y="22"
            width="8"
            height="6"
            rx="1"
            fill="#8B0000"
            stroke="#FF3333"
            strokeWidth="0.5"
            className="animate-pulse"
          />

          {/* Katana guard (tsuba) */}
          <rect
            x="16"
            y="21"
            width="5"
            height="8"
            rx="2"
            fill="#FF0000"
            stroke="#FFFFFF"
            strokeWidth="0.5"
          />

          {/* Katana blade */}
          <path
            d="M21 25L45 12L42 25L45 38L21 25Z"
            fill="url(#katana-gradient)"
            stroke="#FFFFFF"
            strokeWidth="0.5"
          />

          {/* Blade shine */}
          <path
            d="M21 25L42 21L45 12L21 25Z"
            fill="#FFFFFF"
            fillOpacity="0.7"
            className="animate-pulse"
          />

          {/* Blade edge */}
          <path
            d="M21 25L45 12"
            stroke="#FF0000"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-pulse"
          />

          {/* Blood drip */}
          <path
            d="M40 14.5C40 14.5 41 16 41 17.5C41 19 39.5 19 39.5 19C39.5 19 38 19 38 17.5C38 16 39 14.5 39 14.5C39 14.5 40 14.5 40 14.5Z"
            fill="#FF0000"
            className="animate-bounce-slow"
          />

          {/* Sparkle effects */}
          <circle cx="43" cy="13" r="1" fill="#FFFFFF" className="animate-ping-slow" />
          <circle cx="38" cy="15" r="0.8" fill="#FFFFFF" className="animate-ping-slow" style={{ animationDelay: '0.3s' }} />
          <circle cx="35" cy="17" r="0.6" fill="#FFFFFF" className="animate-ping-slow" style={{ animationDelay: '0.6s' }} />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="katana-gradient" x1="21" y1="25" x2="45" y2="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF0000" />
              <stop offset="0.3" stopColor="#FF3333" />
              <stop offset="0.7" stopColor="#FF0000" />
              <stop offset="1" stopColor="#FF3333" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full bg-red-600 blur-md opacity-40 animate-pulse"
          style={{ animationDuration: '1.5s' }}
        ></div>

        {/* Additional pulsing glow */}
        <div
          className="absolute inset-0 rounded-full bg-red-500 blur-lg opacity-20 animate-pulse-glow"
          style={{ animationDuration: '3s', animationDelay: '0.5s' }}
        ></div>
      </div>

      {/* Sparkle particles */}
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

export default KatanaCursor;
