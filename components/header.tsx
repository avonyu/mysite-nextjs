"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useEffect, useState } from "react";

export default function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();

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
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={cn(
        // Position & layout
        "fixed top-5 left-1/2 -translate-x-1/2 z-20",
        "w-[92%] max-w-180 flex items-center justify-between",
        // Glassmorphism
        "bg-background/60 backdrop-blur-xl backdrop-saturate-150",
        "border rounded-2xl",
        // Padding
        "px-6 py-3",
        // Shadow
        "shadow-lg shadow-black/5 dark:shadow-black/20",
        // Hover
        "transition-all",
        "hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30",
      )}
    >
      <Link
        href="/"
        className="text-lg font-bold bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
      >
        {"Avon's Page"}
      </Link>

      <div className="flex items-center gap-0.5">
        <Link
          href="/blog"
          className={cn(
            "px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors",
            pathname.startsWith("/blog")
              ? "text-blue-500 bg-blue-500/10"
              : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
          )}
        >
          {t("blog")}
        </Link>
        <Link
          href="/gallery"
          className={cn(
            "px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors",
            pathname.startsWith("/gallery")
              ? "text-blue-500 bg-blue-500/10"
              : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
          )}
        >
          {t("gallery")}
        </Link>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <LocaleSwitcher />
      </div>
    </nav>
  );
}
