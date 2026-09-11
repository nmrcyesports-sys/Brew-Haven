import { useState } from 'react';
import { Coffee } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
}

export function ImageWithFallback({ className, fallbackClassName, alt, src, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-zinc-900/50 text-zinc-500',
          className,
          fallbackClassName
        )}
      >
        <Coffee className="w-8 h-8 opacity-50" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        'transition-opacity duration-500',
        loaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      {...props}
    />
  );
}
