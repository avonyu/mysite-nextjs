"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { decode } from "blurhash";
import { Grid3X3, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { GalleryPhoto } from "@/lib/gallery";

// blurhash 解码缓存（module-level，避免重复解码）
const blurCache = new Map<string, string>();

// 同步解码 blurhash → base64 PNG data URL（render 阶段直接调用，不经过 effect）
function blurHashToDataURL(hash: string): string | null {
  if (typeof document === "undefined") return null; // SSR 时返回 null
  const cached = blurCache.get(hash);
  if (cached) return cached;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const imageData = ctx.createImageData(32, 32);
    imageData.data.set(decode(hash, 32, 32)); // blurhash 纯函数解码
    ctx.putImageData(imageData, 0, 0);
    const url = canvas.toDataURL("image/png");
    blurCache.set(hash, url);
    return url;
  } catch {
    return null;
  }
}

// 异步版（通过 useEffect 解码），用于 SSR 兼容的 BlurImage
function useBlurDataURL(hash: string): string | null {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    setDataUrl(blurHashToDataURL(hash));
  }, [hash]);

  return dataUrl;
}

// 缩略图：blur 图层 + next/image 渐入 + Skeleton SSR fallback
function BlurImage({
  photo,
  square,
  sizes,
}: {
  photo: GalleryPhoto;
  square: boolean;
  sizes: string;
}) {
  const blurDataURL = useBlurDataURL(photo.blurhash);
  const [loaded, setLoaded] = useState(false);

  if (!blurDataURL) {
    return <Skeleton className="size-full rounded-none" />;
  }

  return (
    <div className="relative size-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${blurDataURL})` }}
      />
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        placeholder="empty"
        quality={75}
        sizes={sizes}
        className={cn(
          "relative size-full transition-opacity duration-500",
          square ? "object-cover" : "object-contain",
          loaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

// 大图浮层：图片加载后渐入（仅客户端，无需 SSR 兼容）
function LightboxImage({ photo }: { photo: GalleryPhoto }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative flex items-center justify-center w-[90vw] h-[85vh]">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className={cn(
          "object-contain transition-opacity duration-200",
          loaded ? "opacity-100" : "opacity-0",
        )}
        quality={85}
        sizes="100vw"
        priority
        placeholder="empty"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

// 格式化 EXIF 数据为可读字符串数组（相机 · 光圈 · 快门 · ISO · 焦距）
function formatExif(exif: Record<string, string | undefined>): string[] {
  const parts: string[] = [];
  const camera = [exif.make, exif.model].filter(Boolean).join(" ");
  if (camera) parts.push(camera);
  if (exif.aperture) parts.push(`ƒ/${exif.aperture.replace(/^f\//i, "")}`);
  if (exif.shutterSpeed) {
    const s = exif.shutterSpeed.replace(/\s+/g, "");
    parts.push(s.endsWith("s") ? s : `${s}s`);
  }
  if (exif.iso) parts.push(`ISO ${exif.iso}`);
  if (exif.focalLength) parts.push(exif.focalLength);
  return parts;
}

export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [square, setSquare] = useState(true); // true: 正方形裁切, false: 原始比例
  const [selected, setSelected] = useState<number | null>(null); // 当前大图索引

  // Escape 键关闭大图
  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [selected]);

  const selectedPhoto = selected !== null ? photos[selected] : null;
  const exifParts = selectedPhoto ? formatExif(selectedPhoto.exif) : [];

  return (
    <>
      {/* 裁切模式切换 */}
      <div className="flex items-center justify-end mb-4 gap-2">
        <Button
          variant={square ? "default" : "outline"}
          size="sm"
          onClick={() => setSquare(true)}
          className="size-8 p-0"
          aria-label="Square grid"
        >
          <Grid3X3 className="size-4" />
        </Button>
        <Button
          variant={!square ? "default" : "outline"}
          size="sm"
          onClick={() => setSquare(false)}
          className="size-8 p-0"
          aria-label="Original aspect"
        >
          <ImageIcon className="size-4" />
        </Button>
      </div>

      {/* 缩略图网格（1→2→3→4 列响应式） */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            className="aspect-square overflow-hidden cursor-pointer rounded-lg"
            onClick={() => setSelected(i)}
          >
            <BlurImage
              photo={photo}
              square={square}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>

      {/* Lightbox 大图浮层 */}
      <AnimatePresence>
        {selected !== null && selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)} // 点击遮罩关闭
          >
            <LightboxImage photo={selectedPhoto} />

            {/* EXIF 信息条 */}
            {exifParts.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 via-black/30 to-transparent">
                <div className="px-6 py-5 pt-10">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/80 font-medium tracking-wide">
                    {exifParts.map((part, i) => (
                      <span key={i}>{part}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
