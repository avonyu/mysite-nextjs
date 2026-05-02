import { getTranslations } from "next-intl/server";
import { Camera } from "lucide-react";
import { getGalleryPhotos } from "@/lib/gallery";
import { GalleryGrid } from "@/components/gallery-grid";

export default async function GalleryPage() {
  const t = await getTranslations("Gallery");
  const photos = await getGalleryPhotos();

  return (
    <section className="relative min-h-screen px-6 pt-28 pb-16">
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Camera className="h-6 w-6 text-blue-500" />
            <h1 className="text-4xl font-extrabold tracking-tight">
              {t("title")}
            </h1>
          </div>
        </div>
        <p className="text-muted-foreground mb-8 text-lg">
          {t("description")}
        </p>

        {photos.length > 0 ? (
          <GalleryGrid photos={photos} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Camera className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg">{t("comingSoon")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
