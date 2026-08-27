import Image from "next/image";

export default function CoverPlaceholder({
  src,
  alt,
  initial,
  label,
  sizes,
}: {
  src: string;
  alt: string;
  initial: string;
  label: string;
  sizes: string;
}) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
        <span
          aria-hidden
          className="font-serif leading-none text-ink/10 text-[120px] lg:text-[160px] -ml-2 -mt-2"
        >
          {initial}
        </span>
        <span className="label text-ink/60 self-start">{label}</span>
      </div>
    </div>
  );
}
