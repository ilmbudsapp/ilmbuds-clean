import React from 'react';

type YouTubePlayerProps = {
  videoId: string;
  title?: string;
  className?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
};

export function YouTubePlayer({ 
  videoId, 
  title, 
  className = '', 
  aspectRatio = '16:9' 
}: YouTubePlayerProps) {
  // Calculate padding based on aspect ratio
  const getPaddingBottom = () => {
    switch (aspectRatio) {
      case '4:3': return '75%';
      case '1:1': return '100%';
      case '16:9':
      default: return '56.25%';
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden shadow-lg bg-white ${className}`}>
      {title && (
        <div className="p-3 font-medium text-lg border-b">
          {title}
        </div>
      )}
      <div className="relative w-full" style={{ paddingBottom: getPaddingBottom() }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title={title || "YouTube video player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}