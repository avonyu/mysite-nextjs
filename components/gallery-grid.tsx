"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Grid3X3, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GalleryPhoto } from "@/lib/gallery";

export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [square, setSquare] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [selected]);

  return (
    <>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="aspect-square overflow-hidden cursor-pointer"
            onClick={() => setSelected(i)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              placeholder="blur"
              blurDataURL={photo.blurDataURL}
              quality={75}
              className={
                square
                  ? "w-full h-full object-cover"
                  : "w-full h-full object-contain"
              }
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center cursor-pointer"
            onClick={() => setSelected(null)}
          >
            <div className="relative w-full h-full">
              <Image
                src={photos[selected].src}
                alt={photos[selected].alt}
                fill
                className="object-contain"
                quality={50}
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
