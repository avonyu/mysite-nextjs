import { getTranslations } from "next-intl/server";

export default async function BlogPage() {
  const t = await getTranslations("Blog");

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
      <p className="text-muted-foreground text-lg">{t("comingSoon")}</p>
    </section>
  );
}
