import { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder,
  threshold = 100,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);

  // Generate optimized image URLs for different sizes
  const generateOptimizedUrl = (originalUrl, targetWidth) => {
    if (!originalUrl) return '';
    
    // For Unsplash images, add optimization parameters
    if (originalUrl.includes('unsplash.com')) {
      const baseUrl = originalUrl.split('?')[0];
      return `${baseUrl}?w=${targetWidth}&q=80&fm=webp&fit=crop`;
    }
    
    // For other images, return as-is (could be extended for other CDNs)
    return originalUrl;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (originalUrl) => {
    if (!originalUrl) return '';
    
    const sizes = [400, 600, 800, 1200];
    return sizes
      .map(size => `${generateOptimizedUrl(originalUrl, size)} ${size}w`)
      .join(', ');
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${threshold}px` }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 text-gray-500 text-sm ${className}`}
        style={{ width, height }}
        role="img"
        aria-label="Image failed to load"
      >
        <div className="text-center">
          <div className="text-2xl mb-2">📷</div>
          <div>Image not available</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          {placeholder || (
            <div className="text-gray-400">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      )}
      
      {/* Actual Image */}
      {isInView && (
        <img
          src={generateOptimizedUrl(src, width || 800)}
          srcSet={generateSrcSet(src)}
          sizes="(max-width: 640px) 400px, (max-width: 1024px) 600px, 800px"
          alt={alt}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;