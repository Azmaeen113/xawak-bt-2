import React, { useRef, useEffect } from 'react';

const InfinityLogoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simple direct approach to play the video
    const playVideo = () => {
      const video = videoRef.current;
      if (!video) return;

      // Set video properties
      video.muted = true;
      video.loop = true;
      video.playsInline = true;

      // Try to play
      video.play().catch(error => {
        console.error('Video play failed:', error);
      });
    };

    // Play video when component mounts
    playVideo();

    // Add click event to document to help with autoplay restrictions
    const handleDocumentClick = () => {
      playVideo();
    };

    document.addEventListener('click', handleDocumentClick, { once: true });

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <section id="infinity-logo" className="relative w-full h-screen overflow-hidden">
      {/* Full-screen video container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Glowing border */}
        <div className="absolute inset-0 border-t border-b border-[#1E90FF]/30 shadow-[0_0_30px_rgba(30,144,255,0.3)] z-10"></div>

        {/* Background color as fallback */}
        <div className="absolute inset-0 bg-black z-0"></div>

        {/* Infinity Video - full screen with simple implementation */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-1"
          src="/planetjupiter.mp4" /* Using planetjupiter.mp4 instead since it's a copy of infinity.mp4 */
          loop
          muted
          playsInline
          autoPlay
          controls={false}
        />

        {/* Video overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/60 pointer-events-none z-2"></div>
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
