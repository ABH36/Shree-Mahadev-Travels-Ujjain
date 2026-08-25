"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { destinations } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const slides = destinations.map((d) => ({
  id: d.slug,
  image: d.image,
  alt: `Taxi service to ${d.name}`,
  contain: d.slug === "kubereshwar-mahadev-sehore",
}));

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      id="home"
      className="scroll-mt-20 relative isolate overflow-hidden bg-secondary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-2/1 w-full">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            {slide.contain ? (
              <>
                <Image
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="100vw"
                  className="object-cover scale-150 blur-[80px] brightness-[0.35] saturate-50"
                />
                <div className="absolute inset-0 bg-black/25" />
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="relative object-contain"
                />
              </>
            ) : (
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>
        ))}

        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:left-5 sm:h-11 sm:w-11"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:right-5 sm:h-11 sm:w-11"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-2 sm:bottom-5">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-primary" : "w-1.5 bg-white/50 hover:bg-white/75"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
