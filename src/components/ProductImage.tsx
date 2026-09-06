import Image from 'next/image';
import { useState } from 'react';
interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  showBoxLabel?: boolean;
  showPackagingNotice?: boolean;
}

export default function ProductImage({ src, alt, className = "w-full h-full object-cover", showBoxLabel = false, showPackagingNotice = false }: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#111d2c] to-[#0d1a17]">
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
      {showBoxLabel && !hasError && (
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <div className="min-w-0 rounded-sm border border-white/40 bg-white/90 px-2 py-1 text-[#17212a] shadow-lg">
            <div className="truncate text-[9px] font-black uppercase tracking-[0.12em]">GHK Peptides</div>
            <div className="truncate text-[10px] font-bold">{alt}</div>
          </div>
          <span className="rounded-sm border border-[#8298aa] bg-[#0d151c]/90 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#e8f0f4] shadow-lg">
            Box of 10
          </span>
        </div>
      )}
      {showPackagingNotice && !hasError && (
        <div className="pointer-events-none absolute left-3 top-3 max-w-[85%] rounded-xl border-2 border-[#FBFAF7] bg-[#0c1622]/95 px-3 py-2 text-xs sm:text-sm font-semibold leading-snug text-[#e6edf3] shadow-md">
          Packaging may differ. Shipped in plastic box.
        </div>
      )}
    </div>
  );
}
