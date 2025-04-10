/**
 * Utility functions for video handling
 */

/**
 * Checks if a video file exists and is accessible
 * @param src Video source URL
 * @returns Promise that resolves to true if video exists and is accessible
 */
export const checkVideoExists = async (src: string): Promise<boolean> => {
  try {
    const response = await fetch(src, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error checking video existence:', error);
    return false;
  }
};

/**
 * Preloads a video to ensure it's in the browser cache
 * @param src Video source URL
 * @returns Promise that resolves when video is preloaded
 */
export const preloadVideo = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.src = src;
    
    video.onloadeddata = () => {
      resolve();
    };
    
    video.onerror = (error) => {
      reject(error);
    };
    
    // Start loading
    video.load();
  });
};

/**
 * Forces a video element to play with multiple fallback strategies
 * @param videoElement The video element to play
 * @returns Promise that resolves when video starts playing
 */
export const forceVideoPlay = async (videoElement: HTMLVideoElement): Promise<void> => {
  if (!videoElement) return;
  
  // Make sure video is ready to play
  videoElement.muted = true;
  videoElement.playsInline = true;
  
  try {
    // Try the standard way first
    await videoElement.play();
  } catch (error) {
    console.warn('Standard video play failed, trying fallbacks:', error);
    
    // Fallback 1: Reset the source
    const currentSrc = videoElement.src;
    videoElement.src = '';
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Set source back and try again
    videoElement.src = currentSrc;
    videoElement.load();
    
    try {
      await videoElement.play();
    } catch (secondError) {
      console.warn('Fallback 1 failed:', secondError);
      
      // Fallback 2: Create a user interaction simulation
      const simulateUserInteraction = () => {
        document.body.click();
        videoElement.play().catch(e => console.error('Final play attempt failed:', e));
      };
      
      // Try one more time after a longer delay
      setTimeout(simulateUserInteraction, 500);
    }
  }
};

export default {
  checkVideoExists,
  preloadVideo,
  forceVideoPlay
};
