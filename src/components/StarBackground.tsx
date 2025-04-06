import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  speed: number;
  phase: number;
  layer: number;
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
      const starsPerLayer = 100;

      for (let layer = 0; layer < layers; layer++) {
        for (let i = 0; i < starsPerLayer; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * (2 - 0.5) + 0.5,
            brightness: Math.random(),
            speed: (Math.random() * 0.05 + 0.02) * (layer + 1),
            phase: Math.random() * Math.PI * 2,
            layer: layer,
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
      const mouseInfluence = Math.max(0, 1 - mouseDistance / 200);
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * (1 + mouseInfluence), 0, Math.PI * 2);
      
      const gradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.size * (1 + mouseInfluence)
      );
      
      gradient.addColorStop(0, `rgba(255, 215, 0, ${0.2 + brightness * 0.8})`);
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        star.phase += star.speed;
        
        // Parallax effect based on mouse position
        const parallaxStrength = (star.layer + 1) * 0.5;
        star.x += ((mouseRef.current.x - window.innerWidth / 2) * parallaxStrength) / 1000;
        star.y += ((mouseRef.current.y - window.innerHeight / 2) * parallaxStrength) / 1000;

        // Wrap stars around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

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
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, #000000, #1a1a2e)' }}
    />
  );
};

export default StarBackground;