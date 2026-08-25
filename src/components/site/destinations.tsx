"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { destinations } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/images";

export function Destinations() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dest = destinations[active];
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${dest.name}, Madhya Pradesh`
  )}`;

  const listRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % destinations.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const button = cardRefs.current[active];
    const container = listRef.current;
    if (!button || !container) return;

    // Scroll ONLY the sub-container horizontally without touching the main window scroll
    const scrollLeft = button.offsetLeft - container.clientWidth / 2 + button.clientWidth / 2;
    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <section
      id="destinations"
      className="scroll-mt-20 bg-background py-16 md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="text-center mb-10 md:mb-14 overflow-x-auto no-scrollbar">
          <h2 className="font-heading text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight whitespace-nowrap inline-block">
            <span className="text-slate-950 dark:text-slate-100">TOURIST </span>
            <span className="text-primary">PLACES</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-slate-800 dark:text-slate-200 font-medium text-base md:text-lg">
            From Jyotirlingas to Shakti Peeths and heritage towns — pick a destination to preview it, then book a taxi there.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-8">
          <div ref={listRef} className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {destinations.map((d, i) => (
              <button
                key={d.slug}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                onClick={() => {
                  setActive(i);
                  setPaused(true);
                }}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all lg:shrink",
                  active === i
                    ? "border-transparent bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <MapPin
                  className={cn("h-4 w-4 shrink-0", active === i ? "text-primary-foreground" : "text-primary")}
                />
                <span className="min-w-max lg:min-w-0">
                  <span className="block text-sm font-semibold">{d.name}</span>
                  <span
                    className={cn(
                      "block text-xs",
                      active === i ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}
                  >
                    {d.nameHindi}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/20">
            <div key={dest.slug} className="relative aspect-2/1 w-full overflow-hidden animate-in fade-in duration-500 bg-slate-950">
              {dest.slug === "kubereshwar-mahadev-sehore" ? (
                <>
                  <Image
                    src={dest.image}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover scale-150 blur-[80px] brightness-[0.35] saturate-50"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <Image
                    src={dest.image}
                    alt={`${dest.name} taxi and cab booking`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="relative object-contain"
                    priority={active === 0}
                  />
                </>
              ) : (
                <Image
                  src={dest.image}
                  alt={`${dest.name} taxi and cab booking`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                  priority={active === 0}
                />
              )}
            </div>

            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 bg-slate-900">
              <p className="text-sm sm:text-base leading-relaxed text-slate-100 font-medium text-justify">{dest.description}</p>
              <div className="flex shrink-0 gap-3">
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800 px-4 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap text-slate-100 transition-all hover:bg-slate-700 hover:border-slate-400 hover:text-white shadow-sm"
                >
                  <Image src={getImageUrl("/images/icons/icons8-google-maps-100.png")} alt="Map" width={20} height={20} className="object-contain" /> View on Map
                </a>
                <a
                  href="#book"
                  className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider whitespace-nowrap text-slate-950 transition-all hover:bg-primary/90 hover:scale-105 shadow-md shadow-primary/30"
                >
                  Book This Trip
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
