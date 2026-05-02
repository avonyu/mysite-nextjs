"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import TextType from "@/components/TextType";

export function HeroSection() {
  const t = useTranslations("Hero");
  const bt = useTranslations("HeroButtons");

  const slogans: string[] = t.raw("slogans") as unknown as string[];

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      {/* Slogan with TextType animation */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-tight tracking-tight mb-6 bg-linear-to-r from-blue-500 via-cyan-400 to-violet-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-shift"
      >
        <TextType
          as="span"
          text={slogans}
          cursorCharacter="_"
          cursorBlinkDuration={0.5}
          typingSpeed={30}
          deletingSpeed={30}
          pauseDuration={2000}
          loop
          showCursor={false}
        />
      </motion.h1>

      {/* Intro card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[560px] bg-background/40 backdrop-blur-md border border-border/10 rounded-2xl px-8 py-7"
      >
        <p className="text-base leading-relaxed text-muted-foreground">
          {t("intro")}
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex gap-3 mt-8"
      >
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-linear-to-r from-blue-500 to-blue-600 rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
        >
          {bt("projects")}
        </a>
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-3 text-sm font-medium border border-border rounded-full text-foreground hover:bg-foreground/5 transition-all"
        >
          {bt("blog")}
        </Link>
      </motion.div>
    </section>
  );
}
