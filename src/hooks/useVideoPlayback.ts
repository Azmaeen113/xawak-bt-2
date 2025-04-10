import { useEffect, useRef } from 'react';

/**
 * Custom hook to handle reliable video playback
 * @param autoPlay Whether to autoplay the video
 * @param loop Whether to loop the video
 * @returns Video reference and play/pause functions
 */
export const useVideoPlayback = (autoPlay = true, loop = true) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Function to play video
  const playVideo = () => {
    if (videoRef.current) {
      // Some browsers require a user interaction to play videos
      // This trick helps in some cases
      videoRef.current.muted = true;
      
      // Try to play the video
      const playPromise = videoRef.current.play();
      
      // Handle play promise
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Video playback failed:', error);
          
          // Try again with a slight delay
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.play().catch(e => 
                console.error('Retry video playback failed:', e)
              );
            }
          }, 300);
        });
      }
    }
  };
  
  // Function to pause video
  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  
  // Function to reset and reload video
  const resetVideo = () => {
    if (videoRef.current) {
      // Reset the video source to force reload
      const videoSrc = videoRef.current.src;
      videoRef.current.src = '';
      
      // Small timeout to ensure browser registers the change
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.src = videoSrc;
          videoRef.current.load();
          if (autoPlay) {
            playVideo();
          }
        }
      }, 50);
    }
  };
  
  // Set up video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      // Set video properties
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.loop = loop;
      
      // Play video if autoPlay is true
      if (autoPlay) {
        playVideo();
      }
      
      // Handle visibility changes (e.g., tab switching)
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          playVideo();
        } else {
          pauseVideo();
        }
      };
      
      // Handle page focus/blur
      const handleFocus = () => playVideo();
      const handleBlur = () => pauseVideo();
      
      // Add event listeners
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);
      
      // Clean up event listeners
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('focus', handleFocus);
        window.removeEventListener('blur', handleBlur);
      };
    }
  }, [autoPlay, loop]);
  
  return { videoRef, playVideo, pauseVideo, resetVideo };
};

export default useVideoPlayback;
