import fs from "fs";
import path from "path";

export interface GalleryPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurhash: string;
  exif: Record<string, string | undefined>;
}

const MANIFEST_PATH = path.join(process.cwd(), "public/gallery/manifest.json");

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  if (!fs.existsSync(MANIFEST_PATH)) return [];

  const raw = fs.readFileSync(MANIFEST_PATH, "utf-8");
  const { photos } = JSON.parse(raw);
  return photos as GalleryPhoto[];
}
