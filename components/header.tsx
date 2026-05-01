"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useEffect, useState } from "react";

export default function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale();

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[720px] bg-background/60 backdrop-blur-xl backdrop-saturate-150 border border-border/10 rounded-full px-6 py-3 flex items-center justify-between shadow-lg shadow-black/5 dark:shadow-black/20 transition-all hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 hover:border-border/20">
      <Link
        href="/"
        className="text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
      >
        {"Avon's Page"}
      </Link>

      <div className="flex items-center gap-0.5">
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors ${
            activeSection === "projects"
              ? "text-blue-500 bg-blue-500/10"
              : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
          }`}
        >
          {t("projects")}
        </a>
        <Link
          href="/blog"
          className="px-3.5 py-1.5 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
        >
          {t("blog")}
        </Link>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <LocaleSwitcher />
      </div>
    </nav>
  );
}
