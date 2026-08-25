import { getImageUrl } from "./images";

export const siteConfig = {
  name: "Shree Mahadev Travels Ujjain",
  shortName: "Shree Mahadev Travels",
  tagline: "Your Trusted Travel Partner in Ujjain",
  description:
    "Shree Mahadev Travels Ujjain offers reliable and affordable taxi and cab booking services in Ujjain, Omkareshwar, Indore, Maheshwar, Mandu and nearby pilgrim destinations. Book Swift Dzire, Ertiga or Innova Crysta for outstation trips, darshan yatra and local sightseeing.",
  url: "https://shreemahadevtravelsujjain.com",
  phones: ["+918815192528", "+919713629770"],
  phonesDisplay: ["8815192528", "9713629770"],
  whatsapp: "918815192528",
  whatsappDisplay: "8815192528",
  email: "shreemahadevtravelsujjain@gmail.com",
  address: {
    line1: "97, Vrindavanpura, Mahaveer Marg",
    city: "Ujjain",
    district: "Ujjain",
    state: "Madhya Pradesh",
    full: "97 Vrindavanpura, Mahaveer Marg, Ujjain, Dist. Ujjain, Madhya Pradesh",
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  googleMapsQuery: "Shree+Mahadev+Travels+Ujjain",
} as const;

export type Vehicle = {
  slug: string;
  name: string;
  category: string;
  seats: number;
  bags: number;
  ac: boolean;
  image: string;
  highlight?: string;
};

export const fleet: Vehicle[] = [
  {
    slug: "swift-dzire",
    name: "Swift Dzire",
    category: "Sedan",
    seats: 4,
    bags: 2,
    ac: true,
    image: getImageUrl("/images/fleet/swift-dzire.png"),
    highlight: "Best for small families",
  },
  {
    slug: "ertiga",
    name: "Ertiga",
    category: "MUV",
    seats: 6,
    bags: 3,
    ac: true,
    image: getImageUrl("/images/fleet/ertiga.png"),
    highlight: "Most popular for group travel",
  },
  {
    slug: "innova-crysta",
    name: "Innova Crysta",
    category: "Premium MUV",
    seats: 7,
    bags: 4,
    ac: true,
    image: getImageUrl("/images/fleet/innova-crysta.png"),
    highlight: "Premium comfort for long trips",
  },
];

export type Destination = {
  slug: string;
  name: string;
  nameHindi: string;
  description: string;
  image: string;
};

export const destinations: Destination[] = [
  {
    slug: "ujjain-darshan",
    name: "Ujjain Darshan",
    nameHindi: "उज्जैन दर्शन",
    description:
      "Mahakaleshwar Jyotirlinga, Ram Ghat, Kal Bhairav and other sacred temples on the banks of the Shipra.",
    image: getImageUrl("/images/destinations/ujjain.png"),
  },
  {
    slug: "omkareshwar",
    name: "Omkareshwar",
    nameHindi: "ओंकारेश्वर",
    description:
      "One of the twelve Jyotirlingas, set on an island in the Narmada river surrounded by ghats and temples.",
    image: getImageUrl("/images/destinations/omkareshwar.png"),
  },
  {
    slug: "maheshwar",
    name: "Maheshwar",
    nameHindi: "महेश्वर",
    description:
      "Ahilya Fort, Narmada Ghats and the historic weaving town on the banks of the holy Narmada river.",
    image: getImageUrl("/images/destinations/maheshwar.png"),
  },
  {
    slug: "mandu",
    name: "Mandu",
    nameHindi: "मांडू",
    description:
      "Jahaz Mahal, Roopmati Pavilion and centuries-old Afghan-style monuments atop the Malwa plateau.",
    image: getImageUrl("/images/destinations/mandu.png"),
  },
  {
    slug: "baglamukhi-nalkheda",
    name: "Baglamukhi Nalkheda",
    nameHindi: "बगलामुखी नलखेड़ा",
    description:
      "Renowned Maa Baglamukhi Shakti Peeth temple at Nalkheda, on the banks of the Lakhundar river.",
    image: getImageUrl("/images/destinations/baglamukhi.png"),
  },
  {
    slug: "kubereshwar-mahadev-sehore",
    name: "Kubereshwar Mahadev, Sehore",
    nameHindi: "कुबेरेश्वर महादेव सीहोर",
    description:
      "Famous Shiva temple in Sehore, known for the annual Rudraksha Mahotsav and large devotee gatherings.",
    image: getImageUrl("/images/destinations/kubereshwar.png"),
  },
  {
    slug: "indore-sightseeing",
    name: "Indore Sightseeing",
    nameHindi: "इंदौर साईट सीन",
    description:
      "Rajwada Palace, Lal Bagh Palace, Sarafa Bazaar and the vibrant heart of Madhya Pradesh's largest city.",
    image: getImageUrl("/images/destinations/indore.png"),
  },
];

export const benefits = [
  {
    icon: "clock",
    title: "24/7 Availability",
    description: "Book a cab any time of day or night for pickups, drops and darshan yatras.",
  },
  {
    icon: "home",
    title: "Doorstep Pickup",
    description: "We pick you up from your home, hotel or the station — no need to travel to us.",
  },
  {
    icon: "zap",
    title: "Easy & Quick Booking",
    description: "Confirm your ride in minutes over a call or WhatsApp message, no app required.",
  },
  {
    icon: "wallet",
    title: "Affordable, Transparent Rates",
    description: "Clear pricing with no hidden charges, decided upfront before your trip.",
  },
  {
    icon: "steering-wheel",
    title: "Experienced Local Drivers",
    description: "Drivers who know the pilgrim routes and highways around Ujjain well.",
  },
  {
    icon: "car",
    title: "Wide Range of Vehicles",
    description: "From compact sedans to spacious MUVs, choose the car that fits your group.",
  },
];
