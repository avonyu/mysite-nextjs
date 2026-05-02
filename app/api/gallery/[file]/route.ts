import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const GALLERY_DIR = path.join(process.cwd(), "content/gallery");

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  const decoded = decodeURIComponent(file);

  if (/[\\/]/.test(decoded) || !/\.(jpg|jpeg)$/i.test(decoded)) {
    return new Response("Forbidden", { status: 403 });
  }

  const fullPath = path.join(GALLERY_DIR, decoded);

  if (!fs.existsSync(fullPath)) {
    return new Response("Not Found", { status: 404 });
  }

  const buf = fs.readFileSync(fullPath);
  return new Response(buf, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
