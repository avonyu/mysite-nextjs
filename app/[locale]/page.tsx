import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/hero-section";
import Projects from "@/app/projects";

export default async function HomePage() {
  const t = await getTranslations("Hero");

  return (
    <>
      <HeroSection />
      <Projects />
    </>
  );
}
