import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { getImageUrl } from "@/lib/images";

const sizes = {
  default: "h-16 w-17.5 md:h-19 md:w-21",
  lg: "h-20 w-22 md:h-25 md:w-27.5",
};

export function Logo({
  className,
  size = "default",
}: {
  className?: string;
  size?: keyof typeof sizes;
}) {
  return (
    <Link
      href="/"
      className={cn("flex shrink-0 items-center group", className)}
      aria-label="Shree Mahadev Travels Ujjain - Home"
    >
      <span
        className={cn(
          "relative shrink-0 transition-transform group-hover:scale-105",
          sizes[size]
        )}
      >
        <Image
          src={getImageUrl("/images/logo-mark.png")}
          alt="Shree Mahadev Travels Ujjain"
          fill
          sizes="120px"
          className="object-contain"
          priority
        />
      </span>
    </Link>
  );
}
