import Image from 'next/image';
import { useState } from 'react';
interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className = "w-full h-full object-cover" }: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="product-photo-box relative w-full h-full">
      {!hasError ? <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes="100vw"
        onError={() => setHasError(true)}
      /> : <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-[#8298aa] font-bold text-xl sm:text-2xl mb-1">GHK</div>
        <div className="text-[#7b898e] text-[10px] text-center px-2 leading-tight max-w-[80%]">{alt}</div>
      </div>}
    </div>
  );
}
