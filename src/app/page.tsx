import { Header } from "@/components/site/header";
import { HeaderStrip } from "@/components/site/header-strip";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Benefits } from "@/components/site/benefits";
import { Destinations } from "@/components/site/destinations";
import { Fleet } from "@/components/site/fleet";
import { Book } from "@/components/site/book";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { ScrollToTop } from "@/components/site/scroll-to-top";

export default function Home() {
  return (
    <>
      <Header />
      <HeaderStrip />
      <main className="flex-1">
        <Hero />
        <About />
        <Benefits />
        <Destinations />
        <Fleet />
        <Book />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  );
}
