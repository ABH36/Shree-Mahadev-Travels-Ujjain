import Image from "next/image";
import { getImageUrl } from "@/lib/images";

export function HeaderStrip() {
  return (
    <div className="w-full bg-[#3d0008] flex justify-center items-center overflow-hidden border-b border-amber-500/20 py-0.5">
      <div className="relative h-12 min-[400px]:h-14 sm:h-16 md:h-20 lg:h-24 w-full max-w-7xl">
        <Image
          src={getImageUrl("/images/header-strip.png")}
          alt="Shree Mahadev Travels Ujjain Banner"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-contain object-center scale-105"
        />
      </div>
    </div>
  );
}
