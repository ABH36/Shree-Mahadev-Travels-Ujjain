import dotenv from "dotenv";
import dns from "node:dns";
import fs from "node:fs";
import path from "node:path";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const MAPPING_FILE = path.join(process.cwd(), "src", "lib", "cloudinary-mapping.json");

function getCloudinaryUrl(localPath: string): string {
  if (fs.existsSync(MAPPING_FILE)) {
    try {
      const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, "utf8"));
      return mapping[localPath] || localPath;
    } catch {
      return localPath;
    }
  }
  return localPath;
}

async function seed() {
  console.log("=== SEEDING MONGODB DATABASE ===");
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is missing in .env!");
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    const db = client.db(process.env.MONGODB_DB || "shree_mahadev_travels");

    // 1. Site Config Collection
    const siteConfigData = {
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
      updatedAt: new Date(),
    };

    await db.collection("site_config").updateOne(
      { key: "main_config" },
      { $set: { key: "main_config", ...siteConfigData } },
      { upsert: true }
    );
    console.log("-> Collection 'site_config' seeded successfully!");

    // 2. Destinations Collection
    const rawDestinations = [
      {
        slug: "ujjain-darshan",
        name: "Ujjain Darshan",
        nameHindi: "उज्जैन दर्शन",
        description:
          "Mahakaleshwar Jyotirlinga, Ram Ghat, Kal Bhairav and other sacred temples on the banks of the Shipra.",
        image: getCloudinaryUrl("/images/destinations/ujjain.png"),
      },
      {
        slug: "omkareshwar",
        name: "Omkareshwar",
        nameHindi: "ओंकारेश्वर",
        description:
          "One of the twelve Jyotirlingas, set on an island in the Narmada river surrounded by ghats and temples.",
        image: getCloudinaryUrl("/images/destinations/omkareshwar.png"),
      },
      {
        slug: "maheshwar",
        name: "Maheshwar",
        nameHindi: "महेश्वर",
        description:
          "Ahilya Fort, Narmada Ghats and the historic weaving town on the banks of the holy Narmada river.",
        image: getCloudinaryUrl("/images/destinations/maheshwar.png"),
      },
      {
        slug: "mandu",
        name: "Mandu",
        nameHindi: "मांडू",
        description:
          "Jahaz Mahal, Roopmati Pavilion and centuries-old Afghan-style monuments atop the Malwa plateau.",
        image: getCloudinaryUrl("/images/destinations/mandu.png"),
      },
      {
        slug: "baglamukhi-nalkheda",
        name: "Baglamukhi Nalkheda",
        nameHindi: "बगलामुखी नलखेड़ा",
        description:
          "Renowned Maa Baglamukhi Shakti Peeth temple at Nalkheda, on the banks of the Lakhundar river.",
        image: getCloudinaryUrl("/images/destinations/baglamukhi.png"),
      },
      {
        slug: "kubereshwar-mahadev-sehore",
        name: "Kubereshwar Mahadev, Sehore",
        nameHindi: "कुबेरेश्वर महादेव सीहोर",
        description:
          "Famous Shiva temple in Sehore, known for the annual Rudraksha Mahotsav and large devotee gatherings.",
        image: getCloudinaryUrl("/images/destinations/kubereshwar.png"),
      },
      {
        slug: "indore-sightseeing",
        name: "Indore Sightseeing",
        nameHindi: "इंदौर साईट सीन",
        description:
          "Rajwada Palace, Lal Bagh Palace, Sarafa Bazaar and the vibrant heart of Madhya Pradesh's largest city.",
        image: getCloudinaryUrl("/images/destinations/indore.png"),
      },
    ];

    for (const d of rawDestinations) {
      await db.collection("destinations").updateOne(
        { slug: d.slug },
        { $set: { ...d, updatedAt: new Date() } },
        { upsert: true }
      );
    }
    console.log("-> Collection 'destinations' (7 items) seeded successfully!");

    // 3. Fleet Collection
    const rawFleet = [
      {
        slug: "swift-dzire",
        name: "Swift Dzire",
        category: "Sedan",
        seats: 4,
        bags: 2,
        ac: true,
        image: getCloudinaryUrl("/images/fleet/swift-dzire.png"),
        highlight: "Best for small families",
      },
      {
        slug: "ertiga",
        name: "Ertiga",
        category: "MUV",
        seats: 6,
        bags: 3,
        ac: true,
        image: getCloudinaryUrl("/images/fleet/ertiga.png"),
        highlight: "Most popular for group travel",
      },
      {
        slug: "innova-crysta",
        name: "Innova Crysta",
        category: "Premium MUV",
        seats: 7,
        bags: 4,
        ac: true,
        image: getCloudinaryUrl("/images/fleet/innova-crysta.png"),
        highlight: "Premium comfort for long trips",
      },
    ];

    for (const car of rawFleet) {
      await db.collection("fleet").updateOne(
        { slug: car.slug },
        { $set: { ...car, updatedAt: new Date() } },
        { upsert: true }
      );
    }
    console.log("-> Collection 'fleet' (3 items) seeded successfully!");

    // 4. Benefits Collection
    const rawBenefits = [
      {
        icon: "clock",
        title: "24/7 Availability",
        description:
          "Book your taxi round the clock for early morning Mahakal Aarti, late night railway station drops, or emergency outstation trips.",
      },
      {
        icon: "home",
        title: "Doorstep Pickup & Drop",
        description:
          "Direct pickup from Ujjain Junction railway station, hotel, residence or Indore airport — hassle free travel with your luggage.",
      },
      {
        icon: "zap",
        title: "Instant Booking",
        description:
          "No long wait times or complex registration. Confirm your cab instantly over call or WhatsApp in under 2 minutes.",
      },
      {
        icon: "wallet",
        title: "Transparent & Best Rates",
        description:
          "Clean per-km and fixed package rates with zero hidden charges. Honest pricing for all outstation and local sight-seeing routes.",
      },
      {
        icon: "steering-wheel",
        title: "Experienced Local Drivers",
        description:
          "Polite, verified local drivers familiar with all temple timings, shortcut routes, ghat entry points and highway conditions.",
      },
      {
        icon: "car",
        title: "Clean & Well-Maintained Cabs",
        description:
          "Fully sanitized, AC cars — Swift Dzire, Ertiga & Innova Crysta — maintained for maximum comfort and smooth long journeys.",
      },
    ];

    for (const b of rawBenefits) {
      await db.collection("benefits").updateOne(
        { title: b.title },
        { $set: { ...b, updatedAt: new Date() } },
        { upsert: true }
      );
    }
    console.log("-> Collection 'benefits' (6 items) seeded successfully!");

    console.log("\n=== ALL MONGODB DATA SEEDED PERFECTLY ===");
  } catch (err) {
    console.error("Seeding failed:", err instanceof Error ? err.message : err);
  } finally {
    await client.close();
  }
}

seed();
