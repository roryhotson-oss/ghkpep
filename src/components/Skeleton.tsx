interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
}

export default function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
}: SkeletonProps) {
  const baseClasses = 'bg-gray-800/50 animate-pulse';
  
  const variantClasses = {
    text: 'rounded-md h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const style = {
    width: width || (variant === 'circular' ? height : '100%'),
    height: height || (variant === 'text' ? '1rem' : '100%'),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-[#141414] rounded-xl p-4 border border-[#2b3538] card-glow">
      <div className="aspect-square bg-[#1a1a1a] rounded-lg mb-3 overflow-hidden relative">
        <Skeleton variant="rounded" className="w-full h-full" />
      </div>
      <div className="flex items-center gap-2 mb-1">
        <Skeleton variant="text" className="w-16 h-4" />
      </div>
      <Skeleton variant="text" className="w-3/4 h-4 mb-1" />
      <Skeleton variant="text" className="w-1/2 h-3" />
      <div className="mt-2">
        <Skeleton variant="text" className="w-20 h-5" />
        <Skeleton variant="text" className="w-16 h-3 mt-1" />
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-[#8298aa]/30 border-t-[#8298aa] rounded-full animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
