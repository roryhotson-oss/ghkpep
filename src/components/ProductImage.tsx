import Image from 'next/image';
interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className = "w-full h-full object-cover" }: ProductImageProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0d1a17]">
      <Image
        src={src}
        alt={alt} fill
        className={className}
        sizes="100vw" onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-[#00d4aa] font-bold text-xl sm:text-2xl mb-1">GHK</div>
        <div className="text-[#666] text-[10px] text-center px-2 leading-tight max-w-[80%]">{alt}</div>
      </div>
    </div>
  );
}
