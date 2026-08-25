import mappingData from "./cloudinary-mapping.json";

const mapping: Record<string, string> = mappingData as Record<string, string>;

export function getImageUrl(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return mapping[path] || path;
}
