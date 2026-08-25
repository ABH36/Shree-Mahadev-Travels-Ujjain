import Image from "next/image";

export function HeaderStrip() {
  return (
    <div className="relative w-full bg-black">
      <Image
        src="/images/header-strip.png"
        alt="Shree Mahadev Travels Ujjain — Ujjain, Omkareshwar, Indore, Maheshwar, Mandu"
        width={2172}
        height={227}
        sizes="100vw"
        className="h-auto w-full"
        priority
      />
    </div>
  );
}
