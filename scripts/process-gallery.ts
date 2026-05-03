import fs from "fs";
import path from "path";
import sharp from "sharp";
import { encode } from "blurhash";
import exifreader from "exifreader";

const SOURCE = path.join(process.cwd(), "content/gallery");
const TARGET = path.join(process.cwd(), "public/gallery");
const MAX_DIM = 1600;

interface PhotoMeta {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurhash: string;
  exif: Record<string, string | undefined>;
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.log("No content/gallery directory found.");
    process.exit(0);
  }

  fs.mkdirSync(TARGET, { recursive: true });

  const files = fs
    .readdirSync(SOURCE)
    .filter((f) => /\.(jpe?g)$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.log("No JPEG files found in content/gallery/.");
    process.exit(0);
  }

  const photos: PhotoMeta[] = [];

  for (const file of files) {
    const fullPath = path.join(SOURCE, file);
    const buf = fs.readFileSync(fullPath);
    const name = file.replace(/\.(jpe?g)$/i, "");
    const webpName = `${name}.webp`;

    const tags = exifreader.load(buf);
    const exif: Record<string, string | undefined> = {};

    if (tags["Make"]) exif.make = tags["Make"].description;
    if (tags["Model"]) exif.model = tags["Model"].description;
    if (tags["FNumber"]) exif.aperture = tags["FNumber"].description;
    if (tags["ExposureTime"]) exif.shutterSpeed = tags["ExposureTime"].description;
    if (tags["ISOSpeedRatings"]) exif.iso = tags["ISOSpeedRatings"].description;
    if (tags["FocalLength"]) exif.focalLength = tags["FocalLengthIn35mmFilm"]?.description ?? tags["FocalLength"].description;
    if (tags["DateTimeOriginal"]) exif.dateTime = tags["DateTimeOriginal"].description;

    const meta = await sharp(buf).metadata();

    const output = await sharp(buf)
      .resize({ width: MAX_DIM, height: MAX_DIM, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toBuffer();

    const outMeta = await sharp(output).metadata();

    fs.writeFileSync(path.join(TARGET, webpName), output);

    const raw = await sharp(buf)
      .resize(64, 64, { fit: "cover" })
      .raw()
      .ensureAlpha()
      .toBuffer();

    const hash = encode(new Uint8ClampedArray(raw), 64, 64, 4, 4);

    const savedPct = (((buf.length - output.length) / buf.length) * 100).toFixed(0);

    photos.push({
      src: `/gallery/${webpName}`,
      alt: name,
      width: outMeta.width ?? meta.width ?? 1024,
      height: outMeta.height ?? meta.height ?? 768,
      blurhash: hash,
      exif,
    });

    console.log(`  ✓ ${file}  ${meta.width}×${meta.height} → ${outMeta.width}×${outMeta.height}  -${savedPct}%  ${hash}`);
  }

  fs.writeFileSync(
    path.join(TARGET, "manifest.json"),
    JSON.stringify({ photos }, null, 2),
  );

  console.log(`\nDone — ${photos.length} photos processed.`);
}

main().catch(console.error);
