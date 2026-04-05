"use client";

import Image, { ImageProps } from "next/image";

interface WatermarkImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  watermarkSize?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-sm sm:text-base",
  md: "text-base sm:text-lg md:text-xl",
  lg: "text-lg sm:text-xl md:text-2xl lg:text-3xl",
};

export default function WatermarkImage({
  watermarkSize = "md",
  className,
  ...props
}: WatermarkImageProps) {
  return (
    <>
      <Image className={className} {...props} />
      <span
        className={`pointer-events-none absolute inset-0 flex items-center justify-center select-none ${sizeClasses[watermarkSize]}`}
        aria-hidden="true"
      >
        <span className="font-bold tracking-wider text-white/40 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>
          Kalindayapi.com
        </span>
      </span>
    </>
  );
}
