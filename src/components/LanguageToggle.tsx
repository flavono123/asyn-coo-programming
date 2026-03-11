"use client";

import { useLocale } from "@/lib/i18n";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <button
      onClick={() => setLocale(locale === "ko" ? "en" : "ko")}
      className="fixed top-3 right-3 z-50 rounded border border-[#e0e0e0] bg-[#f6f6ef] px-2 py-1 font-mono text-xs text-[#828282] transition-colors hover:text-[#ff6600] dark:border-[#444] dark:bg-[#1a1a1a]"
    >
      {locale === "ko" ? "EN" : "한국어"}
    </button>
  );
}
