import React, { useRef, useEffect } from 'react';

const InfinityLogoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays in a loop and starts automatically
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <section id="infinity-logo" className="relative w-full h-screen overflow-hidden">
      {/* Full-screen video container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Glowing border */}
        <div className="absolute inset-0 border-t border-b border-[#1E90FF]/30 shadow-[0_0_30px_rgba(30,144,255,0.3)] z-10"></div>

        {/* Infinity Video - full screen */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/infinity.mp4"
          loop
          muted
          playsInline
          autoPlay
        />

        {/* Video overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/60 pointer-events-none"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full px-4">
        <div className="text-center mb-8 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#87CEEB] to-[#1E90FF] mb-6 animate-pulse-glow whitespace-nowrap">
            Infinite Possibilities
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto px-4">
            <span className="inline-block">Explore the boundless universe of XAWAK,</span> <span className="inline-block">where innovation meets infinity</span>
          </p>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-10 left-0 right-0 text-center">
          <p className="text-[#87CEEB] text-base font-medium">
            Cosmic innovation in motion
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfinityLogoSection;
