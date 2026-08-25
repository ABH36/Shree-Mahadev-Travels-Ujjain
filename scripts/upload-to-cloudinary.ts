import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PUBLIC_DIR = path.join(process.cwd(), "public");
const MAPPING_FILE = path.join(process.cwd(), "src", "lib", "cloudinary-mapping.json");

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (/\.(png|jpe?g|gif|webp|svg)$/i.test(file)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

async function uploadImages() {
  console.log("=== STARTING CLOUDINARY UPLOAD ===");
  const imagesDir = path.join(PUBLIC_DIR, "images");
  if (!fs.existsSync(imagesDir)) {
    console.error("No public/images directory found!");
    return;
  }

  const allImages = getAllFiles(imagesDir);
  console.log(`Found ${allImages.length} images to upload...`);

  let mapping: Record<string, string> = {};
  if (fs.existsSync(MAPPING_FILE)) {
    try {
      mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, "utf8"));
    } catch {
      mapping = {};
    }
  }

  for (const filePath of allImages) {
    // Relative path like /images/destinations/ujjain.png
    const relativePath = "/" + path.relative(PUBLIC_DIR, filePath).replace(/\\/g, "/");
    console.log(`Uploading: ${relativePath}...`);

    const folderName = path.dirname(path.relative(PUBLIC_DIR, filePath)).replace(/\\/g, "/");

    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: `shree-mahadev-travels/${folderName}`,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        resource_type: "auto",
      });

      console.log(`-> SUCCESS: ${res.secure_url}`);
      mapping[relativePath] = res.secure_url;
    } catch (err) {
      console.error(`-> FAILED for ${relativePath}:`, err instanceof Error ? err.message : err);
    }
  }

  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2), "utf8");
  console.log(`\nMapping saved to ${MAPPING_FILE}`);
  console.log("=== CLOUDINARY UPLOAD COMPLETE ===");
}

uploadImages();
