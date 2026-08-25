import Image from "next/image";
import { Clock, Home, Zap, Wallet, UserCheck, Car, type LucideIcon } from "lucide-react";
import { benefits } from "@/lib/site-config";

const icons: Record<string, LucideIcon> = {
  clock: Clock,
  home: Home,
  zap: Zap,
  wallet: Wallet,
  "steering-wheel": UserCheck,
  car: Car,
};

function BenefitItem({
  icon,
  title,
  description,
  align,
}: {
  icon: string;
  title: string;
  description: string;
  align: "left" | "right";
}) {
  const Icon = icons[icon] ?? Car;
  return (
    <div className={`flex gap-4 ${align === "right" ? "sm:flex-row-reverse sm:text-right" : ""}`}>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-heading text-base font-semibold text-primary">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/75 text-justify">{description}</p>
      </div>
    </div>
  );
}

export function Benefits() {
  const left = benefits.slice(0, 3);
  const right = benefits.slice(3, 6);

  return (
    <section id="benefits" className="scroll-mt-20 bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="mb-14 text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
            Why You <span className="text-primary">Choose Us?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            {left.map((b) => (
              <BenefitItem key={b.title} icon={b.icon} title={b.title} description={b.description} align="left" />
            ))}
          </div>

          <div className="relative mx-auto hidden h-72 w-72 items-center justify-center lg:flex xl:h-80 xl:w-80">
            <div className="absolute inset-0 rounded-full bg-primary/10" />
            <div className="relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full bg-white/5 p-3 ring-4 ring-primary/30 xl:h-64 xl:w-64">
              <Image
                src="/images/logo-mark.png"
                alt="Shree Mahadev Travels Ujjain Logo"
                fill
                sizes="256px"
                className="object-contain p-2 drop-shadow-lg"
                priority
              />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            {right.map((b) => (
              <BenefitItem key={b.title} icon={b.icon} title={b.title} description={b.description} align="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
