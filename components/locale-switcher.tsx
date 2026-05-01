"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = () => {
    const nextLocale = locale === "zh" ? "en" : "zh";
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="inline-flex items-center justify-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors w-9 h-9 rounded-full hover:bg-foreground/5 disabled:opacity-50"
      title={locale === "zh" ? "Switch to English" : "切换到中文"}
    >
      {locale === "zh" ? "EN" : "中文"}
    </button>
  );
}
