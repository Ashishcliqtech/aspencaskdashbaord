import React, { useState, useRef, useEffect } from 'react';
import { ImageIcon, AlertCircle } from 'lucide-react';
import { createImageProps, getPlaceholderImage } from '../../utils/images';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  placeholder?: boolean;
  showError?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  onLoad?: () => void;
  onError?: () => void;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallback,
  placeholder = true,
  showError = true,
  aspectRatio,
  objectFit = 'cover',
  className = '',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    
    if (fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback);
      setHasError(false);
      setIsLoading(true);
    } else {
      onError?.();
    }
  };

  const containerClasses = `
    relative overflow-hidden bg-gray-100 dark:bg-gray-800
    ${aspectRatio ? '' : 'inline-block'}
    ${className}
  `;

  const imageClasses = `
    transition-opacity duration-300
    ${isLoading ? 'opacity-0' : 'opacity-100'}
    ${objectFit === 'cover' ? 'object-cover' : ''}
    ${objectFit === 'contain' ? 'object-contain' : ''}
    ${objectFit === 'fill' ? 'object-fill' : ''}
    ${objectFit === 'scale-down' ? 'object-scale-down' : ''}
    ${objectFit === 'none' ? 'object-none' : ''}
  `;

  const containerStyle: React.CSSProperties = aspectRatio
    ? { aspectRatio }
    : {};

  if (hasError && !fallback) {
    return (
      <div 
        className={containerClasses}
        style={containerStyle}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {showError ? (
            <div className="flex flex-col items-center text-gray-400 dark:text-gray-600">
              <AlertCircle className="w-8 h-8 mb-2" />
              <span className="text-sm">Failed to load image</span>
            </div>
          ) : (
            <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-600" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={containerClasses}
      style={containerStyle}
    >
      {/* Loading placeholder */}
      {isLoading && placeholder && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 w-full h-full flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-600" />
          </div>
        </div>
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`w-full h-full ${imageClasses}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

// Optimized image component with automatic optimization
export const OptimizedImage: React.FC<ImageProps & {
  width?: number;
  height?: number;
  quality?: number;
}> = ({ src, width, height, quality, ...props }) => {
  const optimizedProps = createImageProps(src, props.alt, {
    width,
    height,
    optimize: true,
  });

  return <Image {...props} src={optimizedProps.src} />;
};

// Avatar component
export const Avatar: React.FC<{
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ src, name, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  if (src) {
    return (
      <Image
        src={src}
        alt={name || 'Avatar'}
        className={`${sizeClasses[size]} rounded-full ${className}`}
        fallback={getPlaceholderImage(64, 64, initials)}
      />
    );
  }

  return (
    <div className={`
      ${sizeClasses[size]} 
      rounded-full 
      bg-primary-500 
      text-white 
      flex 
      items-center 
      justify-center 
      font-medium
      ${className}
    `}>
      {initials}
    </div>
  );
};