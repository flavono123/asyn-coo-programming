"use client";

import { useState } from "react";
import Image from "next/image";
import { LocaleContext, type Locale, t } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Comments } from "@/components/Comments";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("ko");

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <LanguageToggle />
      <div className="flex min-h-screen justify-center bg-[#f6f6ef] text-[#828282] dark:bg-[#1a1a1a] dark:text-[#828282]">
        <main className="w-full max-w-3xl px-4 py-8 sm:px-8">
          {/* Hero image */}
          <div className="flex justify-center">
            <Image
              src="/a-wait-pigeon.jpeg"
              alt={locale === "ko" ? "기둘기" : "a-wait-pigeon"}
              width={280}
              height={280}
              priority
              className="rounded"
            />
          </div>

          {/* Quote */}
          <blockquote className="mt-6 border-l-2 border-[#ff6600] pl-3 font-mono text-sm text-[#666] dark:text-[#999]">
            {t(locale, "quote")}
          </blockquote>

          {/* Byline + Title */}
          <p className="mt-8 text-xs lowercase tracking-wide text-[#ff6600]">
            {t(locale, "header_byline_prefix")}
            <a
              href="https://github.com/flavono123"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {t(locale, "header_byline_name")}
            </a>
            {t(locale, "header_byline_suffix")}
          </p>
          <h1 className="mt-1 text-xl font-bold text-[#000] dark:text-[#e0e0e0]">
            {t(locale, "title")}
          </h1>
          <p className="text-xs text-[#828282]">{t(locale, "subtitle")}</p>

          {/* Definition */}
          <Section title={t(locale, "definition_title")}>
            <p>{t(locale, "definition")}</p>
          </Section>

          {/* Principles */}
          <Section title={t(locale, "principles_title")}>
            <Principle title={t(locale, "principle1_title")}>
              {t(locale, "principle1")}
            </Principle>
            <Principle title={t(locale, "principle2_title")}>
              {t(locale, "principle2")}
            </Principle>
            <Principle title={t(locale, "principle3_title")}>
              {t(locale, "principle3")}
            </Principle>
            <Principle title={t(locale, "principle4_title")}>
              <code className="rounded bg-[#f0f0f0] px-1.5 py-0.5 font-mono text-xs text-[#000] dark:bg-[#2a2a2a] dark:text-[#e0e0e0]">
                {t(locale, "principle4_pre")}
              </code>
              {t(locale, "principle4_post")}
            </Principle>
          </Section>

          {/* Lifecycle */}
          <Section title={t(locale, "lifecycle_title")}>
            <pre className="overflow-x-auto rounded bg-[#f0f0f0] px-3 py-2 font-mono text-xs text-[#000] dark:bg-[#2a2a2a] dark:text-[#e0e0e0]">
              {t(locale, "lifecycle")}
            </pre>
          </Section>

          {/* FAQ */}
          <Section title={t(locale, "faq_title")}>
            <FAQ q={t(locale, "faq1_q")} a={t(locale, "faq1_a")} />
            <FAQ q={t(locale, "faq2_q")} a={t(locale, "faq2_a")} />
            <FAQ q={t(locale, "faq3_q")} a={t(locale, "faq3_a")} />
            <FAQ q={t(locale, "faq4_q")} a={t(locale, "faq4_a")} />
          </Section>

          {/* Version */}
          <p className="mt-8 font-mono text-[10px] text-[#aaa]">
            {t(locale, "version_label")}: {t(locale, "version")}
          </p>

          {/* Comments */}
          <Comments />

          {/* Footer */}
          <footer className="mt-8 flex items-center justify-center gap-3 border-t border-[#e0e0e0] pt-4 text-[10px] text-[#aaa] dark:border-[#333]">
            <span>{t(locale, "footer")}</span>
            <a
              href="https://github.com/flavono123/asyn-coo-programming"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#828282] transition-colors hover:text-[#ff6600]"
              aria-label="GitHub"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          </footer>
        </main>
      </div>
    </LocaleContext.Provider>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-bold text-[#000] dark:text-[#e0e0e0]">
        {title}
      </h2>
      <div className="mt-2 space-y-3 text-[13px] leading-relaxed text-[#666] dark:text-[#999]">
        {children}
      </div>
    </section>
  );
}

function Principle({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[13px] font-bold text-[#000] dark:text-[#e0e0e0]">
        {title}
      </h3>
      <p className="mt-0.5">{children}</p>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <p className="font-bold text-[#000] dark:text-[#e0e0e0]">{q}</p>
      <p className="mt-0.5">{a}</p>
    </div>
  );
}
