import fs from "fs";
import path from "path";
import sharp from "sharp";

export interface GalleryPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
}

const GALLERY_DIR = path.join(process.cwd(), "content/gallery");

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  if (!fs.existsSync(GALLERY_DIR)) return [];

  const files = fs
    .readdirSync(GALLERY_DIR)
    .filter((f) => /\.(jpg|jpeg)$/i.test(f))
    .sort();

  const results = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(GALLERY_DIR, file);
      const buf = fs.readFileSync(fullPath);

      const [{ width, height }, blurBuf] = await Promise.all([
        sharp(buf).metadata(),
        sharp(buf).resize(8, 8, { fit: "cover" }).blur(10).jpeg({ quality: 20 }).toBuffer(),
      ]);

      return {
        src: `/api/gallery/${encodeURIComponent(file)}`,
        alt: file.replace(/\.(jpg|jpeg)$/i, ""),
        width: width ?? 1024,
        height: height ?? 768,
        blurDataURL: `data:image/jpeg;base64,${blurBuf.toString("base64")}`,
      };
    }),
  );

  return results;
}
