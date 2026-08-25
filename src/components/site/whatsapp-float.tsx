import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppFloat() {
  const message = encodeURIComponent(
    "Namaste! I want to book a taxi with Shree Mahadev Travels Ujjain."
  );

  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-xl shadow-black/40 ring-4 ring-[#25D366]/30 transition-transform hover:scale-110 active:scale-95"
    >
      <Image
        src="/images/icons/icons8-whatsapp-logo-100.gif"
        alt="WhatsApp"
        width={44}
        height={44}
        className="object-contain rounded-full"
        unoptimized
      />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
