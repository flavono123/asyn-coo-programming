"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLocale, t } from "@/lib/i18n";

type Props = {
  parentId?: string | null;
  onSubmitted: () => void;
  onCancel?: () => void;
};

export function CommentForm({ parentId = null, onSubmitted, onCancel }: Props) {
  const { locale } = useLocale();
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    const env =
      process.env.NEXT_PUBLIC_SUPABASE_ENV ?? "production";
    const { error } = await supabase.from("comments").insert({
      content: content.trim(),
      nickname: nickname.trim() || t(locale, "nickname_placeholder"),
      parent_id: parentId,
      env,
    });

    if (!error) {
      setContent("");
      onSubmitted();
    }
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder={t(locale, "nickname_placeholder")}
        maxLength={30}
        className="rounded border border-[#e0e0e0] bg-white px-2 py-1 text-xs text-[#000] outline-none placeholder:text-[#ccc] focus:border-[#ff6600] dark:border-[#444] dark:bg-[#222] dark:text-[#e0e0e0] dark:placeholder:text-[#555]"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t(locale, "comment_placeholder")}
        rows={3}
        maxLength={500}
        className="resize-none rounded border border-[#e0e0e0] bg-white px-2 py-1.5 text-xs text-[#000] outline-none placeholder:text-[#ccc] focus:border-[#ff6600] dark:border-[#444] dark:bg-[#222] dark:text-[#e0e0e0] dark:placeholder:text-[#555]"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="rounded bg-[#ff6600] px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-[#e55b00] disabled:opacity-40"
        >
          {submitting
            ? t(locale, "loading")
            : parentId
              ? t(locale, "reply")
              : t(locale, "submit")}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 text-xs text-[#828282] hover:text-[#000] dark:hover:text-[#e0e0e0]"
          >
            {t(locale, "cancel")}
          </button>
        )}
      </div>
    </form>
  );
}
