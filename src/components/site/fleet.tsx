import Image from "next/image";
import { Users, Snowflake } from "lucide-react";
import { fleet } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

export function Fleet() {
  return (
    <section id="fleet" className="scroll-mt-20 bg-slate-100/90 py-16 md:py-24 border-y border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="text-center mb-10 md:mb-16 overflow-x-auto no-scrollbar">
          <h2 className="font-heading text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight whitespace-nowrap inline-block">
            <span className="text-slate-950">FIND YOUR </span>
            <span className="text-primary">PERFECT RIDE</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-slate-800 font-medium text-base md:text-lg">
            Well-maintained, comfortable vehicles for every group size — from solo darshan trips to full family yatras.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute h-64 w-64 rounded-full bg-primary/30 blur-3xl sm:h-80 sm:w-80" />
            <div className="relative aspect-4/3 w-full max-w-xl transition-transform duration-300 hover:scale-105">
              <Image
                src={fleet[2].image}
                alt={fleet[2].name}
                fill
                sizes="(max-width: 768px) 95vw, 576px"
                className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col divide-y divide-slate-200/80 bg-white/80 p-5.5 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xl shadow-black/5">
            {fleet.map((car) => (
              <div key={car.slug} className="flex items-center gap-5 py-4.5 first:pt-0 last:pb-0 sm:gap-6 sm:py-5">
                <div className="relative h-18 w-28 shrink-0 sm:h-20 sm:w-32 flex items-center justify-center">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="128px"
                    className="object-contain drop-shadow-[0_7px_14px_rgba(0,0,0,0.16)] transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-lg font-extrabold text-slate-950 sm:text-xl">{car.name}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-slate-700 font-semibold sm:text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-primary" /> {car.seats} Seats
                    </span>
                    {car.ac ? (
                      <span className="flex items-center gap-1">
                        <Snowflake className="h-3.5 w-3.5 text-primary" /> AC
                      </span>
                    ) : null}
                    <span className="text-primary font-bold">{car.category}</span>
                  </div>
                </div>

                <Button
                  render={<a href="#book" />}
                  nativeButton={false}
                  size="default"
                  className="shrink-0 font-extrabold px-4.5 py-2 text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md hover:scale-105 transition-all"
                >
                  Book Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
