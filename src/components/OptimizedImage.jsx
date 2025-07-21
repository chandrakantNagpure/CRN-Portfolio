import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useState } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  effect = 'blur',
  placeholder,
  threshold = 100,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

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

  // Fallback image for errors
  const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTAwSDIyNVYxNTBIMTc1VjEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+SW1hZ2UgTm90IEZvdW5kPC9wPgo8L3N2Zz4K';

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
    <LazyLoadImage
      src={generateOptimizedUrl(src, width || 800)}
      srcSet={generateSrcSet(src)}
      sizes="(max-width: 640px) 400px, (max-width: 1024px) 600px, 800px"
      alt={alt}
      className={className}
      width={width}
      height={height}
      effect={effect}
      threshold={threshold}
      placeholder={placeholder}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
};

export default OptimizedImage;