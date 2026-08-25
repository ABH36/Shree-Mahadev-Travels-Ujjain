import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { MongoClient } from "mongodb";

dotenv.config();

async function main() {
  console.log("--- TESTING CLOUDINARY ---");
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const res = await cloudinary.api.ping();
    console.log("Cloudinary connection SUCCESS:", res);
  } catch (err: any) {
    console.error("Cloudinary connection FAILED:", err.message);
  }

  console.log("\n--- TESTING MONGODB ---");
  const uri = process.env.MONGODB_URI;
  console.log("Connecting to URI:", uri?.replace(/:([^@]+)@/, ":****@"));
  if (!uri) {
    console.error("MONGODB_URI is missing");
    return;
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("MongoDB connection SUCCESS!");
    await client.close();
  } catch (err: any) {
    console.error("MongoDB connection FAILED:", err.message);
  }
}

main();
