import Image from "next/image";
import { Star } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { siteConfig } from "@/lib/site-config";
import { getImageUrl } from "@/lib/images";

const pages = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#benefits", label: "Benefits" },
  { href: "#fleet", label: "Fleet" },
  { href: "#book", label: "Book Now" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 md:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-10">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <Star className="h-3.5 w-3.5" fill="currentColor" /> Find Us on Google
            </span>
            <h3 className="font-heading mt-4 text-2xl font-bold sm:text-3xl">Visit or Call Us Anytime</h3>
            <ul className="mt-5 flex flex-col items-center sm:items-start gap-3.5 text-sm text-white/80 font-medium w-full">
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <Image src={getImageUrl("/images/icons/icons8-call-100.png")} alt="Phone" width={24} height={24} className="object-contain shrink-0 rounded-full overflow-hidden" />
                <span>{siteConfig.phonesDisplay[0]} / {siteConfig.phonesDisplay[1]}</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <Image src={getImageUrl("/images/icons/icons8-gmail-100.png")} alt="Gmail" width={24} height={24} className="object-contain shrink-0 rounded-full overflow-hidden" />
                <span className="break-all">{siteConfig.email}</span>
              </li>
              <li className="flex items-start justify-center sm:justify-start gap-3 text-center sm:text-justify">
                <Image src={getImageUrl("/images/icons/icons8-google-maps-100.png")} alt="Location" width={24} height={24} className="mt-0.5 object-contain shrink-0 rounded-full overflow-hidden" />
                <span>{siteConfig.address.full}</span>
              </li>
            </ul>
            <div className="mt-5 flex justify-center sm:justify-start w-full">
              <a
                href={`https://www.google.com/search?q=${siteConfig.googleMapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-extrabold text-slate-950 transition-transform hover:scale-105"
              >
                <Image src={getImageUrl("/images/icons/icons8-google-maps-100.png")} alt="Google Maps" width={20} height={20} className="object-contain rounded-full overflow-hidden" />
                See Our Reviews on Google
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
            <iframe
              title="Shree Mahadev Travels Ujjain location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                siteConfig.address.full
              )}&output=embed`}
              width="100%"
              height="240"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center justify-between gap-4 sm:block">
              <Logo size="lg" />
              <div className="flex items-center gap-2.5 shrink-0 sm:hidden">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center justify-center transition-transform hover:scale-110 rounded-full overflow-hidden"
                >
                  <Image
                    src={getImageUrl("/images/icons/icons8-instagram-100.gif")}
                    alt="Instagram"
                    width={38}
                    height={38}
                    className="object-contain rounded-full overflow-hidden"
                    unoptimized
                  />
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex items-center justify-center transition-transform hover:scale-110 rounded-full overflow-hidden"
                >
                  <Image
                    src={getImageUrl("/images/icons/icons8-facebook-circled-100.gif")}
                    alt="Facebook"
                    width={38}
                    height={38}
                    className="object-contain rounded-full overflow-hidden"
                    unoptimized
                  />
                </a>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60 text-justify">
              {siteConfig.description}
            </p>

            <div className="mt-5 hidden sm:flex flex-col gap-2.5">
              <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-primary">Follow Us</h3>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center justify-center transition-transform hover:scale-110 rounded-full overflow-hidden"
                >
                  <Image
                    src={getImageUrl("/images/icons/icons8-instagram-100.gif")}
                    alt="Instagram"
                    width={40}
                    height={40}
                    className="object-contain rounded-full overflow-hidden"
                    unoptimized
                  />
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex items-center justify-center transition-transform hover:scale-110 rounded-full overflow-hidden"
                >
                  <Image
                    src={getImageUrl("/images/icons/icons8-facebook-circled-100.gif")}
                    alt="Facebook"
                    width={40}
                    height={40}
                    className="object-contain rounded-full overflow-hidden"
                    unoptimized
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:contents">
            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">Pages</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {pages.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-white/60 transition-colors hover:text-primary">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                Popular Destinations
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {["Ujjain Darshan", "Omkareshwar", "Maheshwar", "Mandu", "Indore Sightseeing"].map((d) => (
                  <li key={d}>
                    <a href="#destinations" className="text-sm text-white/60 transition-colors hover:text-primary">
                      {d}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">Work Hours</h3>
            <p className="mt-4 text-2xl font-bold text-primary">24/7</p>
            <div className="mt-3 flex flex-col items-center sm:items-start gap-2.5 text-sm text-white/80 font-medium w-full">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-2 hover:text-primary transition-colors"
              >
                <Image
                  src={getImageUrl("/images/icons/icons8-whatsapp-logo-100.gif")}
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="object-contain rounded-full overflow-hidden shrink-0"
                  unoptimized
                />
                <span className="font-semibold">{siteConfig.whatsappDisplay}</span>
              </a>
              <a
                href={`tel:${siteConfig.phones[1]}`}
                className="flex items-center justify-center sm:justify-start gap-2 hover:text-primary transition-colors"
              >
                <Image
                  src={getImageUrl("/images/icons/icons8-call-100.png")}
                  alt="Phone"
                  width={20}
                  height={20}
                  className="object-contain rounded-full overflow-hidden shrink-0"
                />
                <span className="font-semibold">{siteConfig.phonesDisplay[1]}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center justify-center sm:justify-start gap-2 hover:text-primary transition-colors"
              >
                <Image
                  src={getImageUrl("/images/icons/icons8-gmail-100.png")}
                  alt="Gmail"
                  width={20}
                  height={20}
                  className="object-contain rounded-full overflow-hidden shrink-0"
                />
                <span className="font-semibold break-all text-xs sm:text-sm">{siteConfig.email}</span>
              </a>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60 text-center sm:text-justify">
              Our support &amp; sales team is available round the clock to answer your queries.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center text-center gap-3 px-4 py-6 text-xs text-white/60 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:text-left lg:gap-4 lg:px-10">
          <p className="whitespace-nowrap">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-white/70 font-medium shrink-0">
            <span className="whitespace-nowrap">Designed &amp; Developed by</span>
            <a
              href="https://bdm.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center transition-transform hover:scale-105"
            >
              <Image
                src={getImageUrl("/images/bdmlogo.png")}
                alt="BDM - Designed & Developed"
                width={85}
                height={26}
                className="h-6.5 w-auto object-contain rounded-sm"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
