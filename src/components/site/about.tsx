import Image from "next/image";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 relative overflow-hidden bg-background py-16 md:py-24">
      <div className="pointer-events-none absolute -right-16 top-16 h-40 w-40 rounded-full bg-primary/25 md:h-56 md:w-56" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-16 w-16 rounded-full bg-primary md:h-20 md:w-20" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="text-center mb-10 md:mb-16 overflow-x-auto no-scrollbar">
          <h2 className="font-heading text-lg min-[400px]:text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight whitespace-nowrap inline-block">
            <span className="text-slate-950 dark:text-slate-100">Welcome To </span>
            <span className="text-primary">{siteConfig.name}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative flex items-center justify-center py-6 sm:py-10">
            <div className="absolute h-56 w-56 rounded-full bg-primary/25 sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[420px] lg:w-[420px] blur-xs" />
            <div className="relative aspect-2172/724 w-full max-w-2xl lg:max-w-3xl transition-transform duration-300 hover:scale-105">
              <Image
                src="/images/hero/about.png"
                alt="Shree Mahadev Travels Ujjain fleet — Swift Dzire, Ertiga and Innova Crysta"
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]"
                priority
              />
            </div>
          </div>

          <div>
            <p className="text-slate-800 dark:text-slate-200 font-medium text-justify leading-relaxed text-base sm:text-lg">
              {siteConfig.name} has been serving pilgrims and travellers with dependable,
              comfortable taxis for Ujjain, Omkareshwar, Indore, Maheshwar and Mandu routes —
              available round the clock with experienced local drivers.
            </p>
            <p className="mt-5 text-slate-800 dark:text-slate-200 font-medium text-justify leading-relaxed text-base sm:text-lg">
              From a quick darshan trip to a full family yatra, our fleet ranges from compact
              sedans to spacious MUVs — all bookable directly on call or WhatsApp, with honest,
              upfront pricing and no hidden charges.
            </p>
            <Button
              render={<a href="#benefits" />}
              nativeButton={false}
              variant="secondary"
              size="lg"
              className="mt-8 font-semibold"
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
