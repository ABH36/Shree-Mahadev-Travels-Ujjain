import Image from "next/image";
import { BookingForm } from "@/components/site/booking-form";
import { siteConfig } from "@/lib/site-config";

export function Book() {
  return (
    <section id="book" className="scroll-mt-20 relative overflow-hidden bg-background py-16 md:py-24">
      <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-primary/20 md:h-56 md:w-56" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="text-center mb-10 md:mb-14 overflow-x-auto no-scrollbar">
          <h3 className="font-heading text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight whitespace-nowrap inline-block">
            <span className="text-slate-950 dark:text-slate-100">Get In </span>
            <span className="text-primary">Touch</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-slate-100">
              Your Ride is Just a{" "}
              <span className="relative inline-block">
                Click Away
                <svg
                  className="absolute -bottom-1 left-0 w-full text-primary"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M0 6 Q 50 0 100 5 T 200 4" stroke="currentColor" strokeWidth="5" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="mt-5 max-w-md text-slate-800 dark:text-slate-200 font-medium text-justify leading-relaxed text-base">
              Book a safe, comfortable and affordable cab instantly. Whether you&apos;re
              travelling within the city, going outstation, or need an airport pickup — we&apos;ve
              got you covered. Choose your vehicle, enter your details and get ready to travel
              hassle-free.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-4">
              <a
                href={`tel:${siteConfig.phones[0]}`}
                className="flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-xl border border-primary bg-primary px-2 py-3 sm:px-4 sm:py-3.5 text-sm min-[380px]:text-base sm:text-lg font-black tracking-tight text-slate-950 shadow-md shadow-primary/30 transition-all hover:bg-primary/90 hover:scale-105"
              >
                <div className="relative h-7 w-7 sm:h-9 sm:w-9 shrink-0 overflow-hidden rounded-full flex items-center justify-center bg-slate-950/10">
                  <Image
                    src="/images/icons/icons8-call-100.png"
                    alt="Call"
                    width={28}
                    height={28}
                    className="object-contain rounded-full"
                  />
                </div>
                <span className="whitespace-nowrap">{siteConfig.phonesDisplay[0]}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-xl border border-primary bg-primary px-2 py-3 sm:px-4 sm:py-3.5 text-sm min-[380px]:text-base sm:text-lg font-black tracking-tight text-slate-950 shadow-md shadow-primary/30 transition-all hover:bg-primary/90 hover:scale-105"
              >
                <div className="relative h-7 w-7 sm:h-9 sm:w-9 shrink-0 overflow-hidden rounded-full flex items-center justify-center bg-slate-950/10">
                  <Image
                    src="/images/icons/icons8-whatsapp-logo-100.gif"
                    alt="WhatsApp"
                    width={28}
                    height={28}
                    className="object-contain rounded-full"
                    unoptimized
                  />
                </div>
                <span className="whitespace-nowrap">WhatsApp Us</span>
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-secondary p-6 shadow-2xl shadow-black/20 sm:p-8">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
