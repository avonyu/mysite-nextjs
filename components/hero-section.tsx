"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { TypingEffect } from "@/components/typing-effect";

export function HeroSection() {
  const t = useTranslations("Hero");
  const bt = useTranslations("HeroButtons");
  const locale = useLocale();

  const slogans: string[] = t.raw("slogans") as unknown as string[];

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono text-xs text-blue-500 tracking-[0.2em] uppercase mb-6"
      >
        {t("greeting")}
      </motion.div>

      {/* Slogan with typing effect */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-tight tracking-tight mb-6 bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-shift"
      >
        <TypingEffect texts={slogans} />
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
          className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-5 border-r-2 border-b-2 border-muted-foreground rotate-45 animate-bounce-soft" />
      </motion.div>
    </section>
  );
}
