"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#benefits", label: "Benefits", id: "benefits" },
  { href: "#destinations", label: "Destinations", id: "destinations" },
  { href: "#fleet", label: "Fleet", id: "fleet" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-300",
        scrolled ? "bg-secondary/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-secondary/40 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-10">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1 rounded-full bg-white/5 p-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all",
                active === link.id
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                  : "text-white/70 hover:text-white"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            render={<a href={`tel:${siteConfig.phones[0]}`} />}
            nativeButton={false}
            className="font-bold border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            <Phone className="h-3.5 w-3.5 text-primary" />
            <span>Call Now</span>
          </Button>
          <Button
            render={<a href="#book" />}
            nativeButton={false}
            className="hidden sm:inline-flex font-bold"
          >
            Book Now
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden text-white hover:bg-white/10 hover:text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <nav className="lg:hidden border-t border-white/10 bg-secondary px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active === link.id
                  ? "bg-primary text-primary-foreground"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <a
              href={`tel:${siteConfig.phones[0]}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-3 py-2.5 text-center text-sm font-bold text-white hover:bg-white/20"
            >
              <Phone className="h-4 w-4 text-primary" />
              Call Now
            </a>
            <Link
              href="#book"
              onClick={() => setOpen(false)}
              className="rounded-md bg-primary px-3 py-2.5 text-center text-sm font-bold text-primary-foreground"
            >
              Book Now
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
