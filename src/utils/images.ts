// Image utilities for handling public assets and external images
export interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  className?: string;
}

// Public image paths
export const PUBLIC_IMAGES = {
  logos: {
    main: '/images/logo.svg',
    dark: '/images/logo-dark.svg',
    icon: '/images/icon.svg',
  },
  avatars: {
    default: '/images/avatars/default.png',
    placeholder: '/images/avatars/placeholder.svg',
  },
  illustrations: {
    empty: '/images/illustrations/empty-state.svg',
    error: '/images/illustrations/error.svg',
    maintenance: '/images/illustrations/maintenance.svg',
  },
  backgrounds: {
    hero: '/images/backgrounds/hero.jpg',
    pattern: '/images/backgrounds/pattern.svg',
  },
} as const;

// External image sources
export const EXTERNAL_IMAGES = {
  pexels: {
    business: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    office: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg',
    team: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    meeting: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
  },
  unsplash: {
    dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    analytics: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  },
} as const;

// Image optimization utilities
export const getOptimizedImageUrl = (
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string => {
  const { width, height, quality = 80, format = 'webp' } = options;
  
  // For external URLs, you might want to use a service like Cloudinary or ImageKit
  if (url.startsWith('http')) {
    // Example with Unsplash's built-in optimization
    if (url.includes('unsplash.com')) {
      const params = new URLSearchParams();
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      if (quality) params.set('q', quality.toString());
      if (format) params.set('fm', format);
      
      return `${url}${url.includes('?') ? '&' : '?'}${params.toString()}`;
    }
    
    return url;
  }
  
  // For local images, return as-is (you could implement local optimization here)
  return url;
};

// Image loading utilities
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (urls: string[]): Promise<void> => {
  try {
    await Promise.all(urls.map(preloadImage));
  } catch (error) {
    console.warn('Failed to preload some images:', error);
  }
};

// Avatar utilities
export const getAvatarUrl = (
  user: { name?: string; email?: string; avatar?: string },
  size: number = 40
): string => {
  if (user.avatar) {
    return getOptimizedImageUrl(user.avatar, { width: size, height: size });
  }
  
  // Generate avatar from initials or use a service like Gravatar
  if (user.name) {
    const initials = user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    // You could use a service like UI Avatars or generate locally
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=${size}&background=0ea5e9&color=fff&bold=true`;
  }
  
  if (user.email) {
    // Gravatar fallback
    const hash = btoa(user.email.toLowerCase().trim());
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
  }
  
  return PUBLIC_IMAGES.avatars.default;
};

// Image component props helper
export const createImageProps = (
  src: string,
  alt: string,
  options: {
    width?: number;
    height?: number;
    loading?: 'lazy' | 'eager';
    className?: string;
    optimize?: boolean;
  } = {}
): ImageConfig => {
  const { width, height, loading = 'lazy', className, optimize = true } = options;
  
  return {
    src: optimize ? getOptimizedImageUrl(src, { width, height }) : src,
    alt,
    width,
    height,
    loading,
    className,
  };
};

// Placeholder image generator
export const getPlaceholderImage = (
  width: number,
  height: number,
  text?: string,
  backgroundColor = 'e5e7eb',
  textColor = '6b7280'
): string => {
  const displayText = text || `${width}×${height}`;
  return `https://via.placeholder.com/${width}x${height}/${backgroundColor}/${textColor}?text=${encodeURIComponent(displayText)}`;
};