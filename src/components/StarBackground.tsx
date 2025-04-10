import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  speed: number;
  phase: number;
  layer: number;
  color: string;
  direction: { x: number; y: number };
  twinkleSpeed: number;
  movementRange: number;
}

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };

    const createStars = () => {
      const stars: Star[] = [];
      const layers = 3;
      const starsPerLayer = 100; // Reduced for better scrolling performance

      // Star colors for variety - more bluish tones
      const starColors = [
        '#FFFFFF', // White
        '#87CEEB', // Sky Blue
        '#ADD8E6', // Light Blue
        '#B0E0E6', // Powder Blue
        '#E0FFFF', // Light Cyan
        '#AFEEEE', // Pale Turquoise
        '#00BFFF', // Deep Sky Blue
        '#1E90FF', // Dodger Blue
        '#FFD700', // Gold (fewer warm colors)
      ];

      for (let layer = 0; layer < layers; layer++) {
        for (let i = 0; i < starsPerLayer; i++) {
          // Random angle for movement direction
          const angle = Math.random() * Math.PI * 2;

          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * (2.5 - 0.5) + 0.5,
            brightness: Math.random(),
            speed: (Math.random() * 0.05 + 0.02) * (layer + 1),
            phase: Math.random() * Math.PI * 2,
            layer: layer,
            color: starColors[Math.floor(Math.random() * starColors.length)],
            direction: {
              x: Math.cos(angle) * (Math.random() * 0.3 + 0.1),
              y: Math.sin(angle) * (Math.random() * 0.3 + 0.1)
            },
            twinkleSpeed: Math.random() * 0.05 + 0.01,
            movementRange: Math.random() * 50 + 10
          });
        }
      }
      starsRef.current = stars;
    };

    const drawStar = (ctx: CanvasRenderingContext2D, star: Star) => {
      const brightness = (Math.sin(star.phase) + 1) / 2;
      const mouseDistance = Math.hypot(
        star.x - mouseRef.current.x,
        star.y - mouseRef.current.y
      );
      const mouseInfluence = Math.max(0, 1 - mouseDistance / 300);

      // Extract color components for glow effect
      let r = 255, g = 255, b = 255;
      if (star.color === '#FFD700') { r = 255; g = 215; b = 0; }
      else if (star.color === '#87CEEB') { r = 135; g = 206; b = 235; }
      else if (star.color === '#ADD8E6') { r = 173; g = 216; b = 230; }
      else if (star.color === '#B0E0E6') { r = 176; g = 224; b = 230; }
      else if (star.color === '#E0FFFF') { r = 224; g = 255; b = 255; }
      else if (star.color === '#AFEEEE') { r = 175; g = 238; b = 238; }
      else if (star.color === '#00BFFF') { r = 0; g = 191; b = 255; }
      else if (star.color === '#1E90FF') { r = 30; g = 144; b = 255; }

      // Draw the main star
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * (1 + mouseInfluence * 0.5), 0, Math.PI * 2);

      const gradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.size * (1 + mouseInfluence * 0.5)
      );

      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.3 + brightness * 0.7})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw sparkle effect for larger stars
      if (star.size > 1.5 || mouseInfluence > 0.5) {
        const sparkleSize = star.size * (1.5 + mouseInfluence);

        // Draw sparkle rays
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (Math.PI / 4) * i + (star.phase / 2);
          const rayLength = sparkleSize * (1 + brightness * 0.5);

          ctx.moveTo(star.x, star.y);
          ctx.lineTo(
            star.x + Math.cos(angle) * rayLength,
            star.y + Math.sin(angle) * rayLength
          );

          ctx.moveTo(star.x, star.y);
          ctx.lineTo(
            star.x + Math.cos(angle + Math.PI / 8) * (rayLength * 0.6),
            star.y + Math.sin(angle + Math.PI / 8) * (rayLength * 0.6)
          );
        }

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.1 + brightness * 0.2})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    // For throttling animation frames during scroll
    let isScrolling = false;
    let scrollTimeout: number | null = null;
    let lastFrameTime = 0;
    const targetFPS = 30; // Lower FPS for better scrolling performance
    const frameInterval = 1000 / targetFPS;

    const handleScroll = () => {
      isScrolling = true;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = (currentTime = 0) => {
      // Throttle frame rate for better performance
      const delta = currentTime - lastFrameTime;
      if (delta < frameInterval && !isScrolling) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      // Use more transparent fill during scrolling for better performance
      ctx.fillStyle = isScrolling ? 'rgba(0, 0, 10, 0.2)' : 'rgba(0, 0, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle bluish nebula-like background
      const time = Date.now() / 10000;
      const nebulaGradient = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time) * 0.2),
        canvas.height * (0.5 + Math.cos(time) * 0.2),
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      );

      nebulaGradient.addColorStop(0, 'rgba(0, 30, 60, 0.02)');
      nebulaGradient.addColorStop(0.5, 'rgba(30, 58, 138, 0.015)');
      nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        // Update twinkle phase
        star.phase += star.twinkleSpeed;

        // Natural star movement
        const originalX = star.x;
        const originalY = star.y;

        // Circular/elliptical movement pattern
        star.x += star.direction.x * Math.sin(star.phase * 0.5) * 0.5;
        star.y += star.direction.y * Math.cos(star.phase * 0.5) * 0.5;

        // Parallax effect based on mouse position
        const parallaxStrength = (star.layer + 1) * 0.7;
        star.x += ((mouseRef.current.x - window.innerWidth / 2) * parallaxStrength) / 800;
        star.y += ((mouseRef.current.y - window.innerHeight / 2) * parallaxStrength) / 800;

        // Limit movement range from original position
        const distFromOriginal = Math.hypot(star.x - originalX, star.y - originalY);
        if (distFromOriginal > star.movementRange) {
          const angle = Math.atan2(star.y - originalY, star.x - originalX);
          star.x = originalX + Math.cos(angle) * star.movementRange;
          star.y = originalY + Math.sin(angle) * star.movementRange;

          // Reverse direction when hitting movement boundary
          star.direction.x *= -0.8;
          star.direction.y *= -0.8;
        }

        // Wrap stars around screen
        if (star.x < -50) star.x = canvas.width + 50;
        if (star.x > canvas.width + 50) star.x = -50;
        if (star.y < -50) star.y = canvas.height + 50;
        if (star.y > canvas.height + 50) star.y = -50;

        drawStar(ctx, star);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    resizeCanvas();
    createStars();
    animationFrameRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, #000000, #050510, #0a0a20)' }}
    />
  );
};

export default StarBackground;