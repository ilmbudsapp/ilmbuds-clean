import React, { useState, useEffect } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  fallback = '/images/quiz/error.jpg',  // Default fallback image
  className = '',
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setError(false);
    
    // If src is already a direct filename, add public/images/quiz/ prefix
    let imgPath = src;
    let filenameFallback = null;
    
    if (!src.startsWith('http')) {
      // Extract filename for possible fallback use
      const parts = src.split('/');
      const filename = parts[parts.length - 1];
      filenameFallback = `/images/quiz/${filename}`;
      
      // Ensure it has leading slash if it's a relative path
      if (!src.startsWith('/')) {
        imgPath = '/' + src;
      }
    }
    
    console.log(`Loading image from: ${imgPath}`);
    
    const img = new Image();
    img.src = imgPath;
    
    img.onload = () => {
      console.log(`Successfully loaded image: ${imgPath}`);
      setImgSrc(imgPath);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      console.warn(`Failed to load image: ${imgPath}`);
      setError(true);
      setIsLoading(false);
      
      // First try the filename fallback path if relevant
      if (filenameFallback && imgPath !== filenameFallback) {
        console.log(`Trying alternative path: ${filenameFallback}`);
        
        const fallbackImg = new Image();
        fallbackImg.src = filenameFallback;
        
        fallbackImg.onload = () => {
          console.log(`Successfully loaded fallback: ${filenameFallback}`);
          setImgSrc(filenameFallback);
          setError(false);
        };
        
        fallbackImg.onerror = () => {
          console.warn(`Failed to load from fallback: ${filenameFallback}`);
          // If filename fallback fails, try explicit fallback
          if (fallback && fallback !== filenameFallback) {
            console.log(`Trying explicit fallback: ${fallback}`);
            setImgSrc(fallback);
          }
        };
      } else if (fallback) {
        // If no filename fallback, use explicit fallback directly
        console.log(`Using explicit fallback: ${fallback}`);
        setImgSrc(fallback);
      }
    };
    
    // Clean up
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallback]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
      </div>
    );
  }

  if (error && !fallback) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-gray-400 text-sm">Image not available</div>
      </div>
    );
  }

  return (
    <img
      src={imgSrc || ''}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        // Final fallback if the image fails to load at render time
        if (fallback && imgSrc !== fallback) {
          console.log('Image error at render time, using fallback');
          setImgSrc(fallback);
        }
      }}
      {...props}
    />
  );
}