import { useEffect, useRef } from 'react';

export default function VideoPlayer({ src, poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  return (
    <div className="flex justify-center bg-black/20 rounded-xl overflow-hidden backdrop-blur-sm">
      <video
        ref={videoRef}
        src={src.startsWith('http') ? src : `${import.meta.env.BASE_URL}${src.startsWith('/') ? src.slice(1) : src}`}
        controls
        playsInline
        loop
        className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
      />
    </div>
  );
}
