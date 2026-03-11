"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase, type Comment } from "@/lib/supabase";
import { useLocale, t } from "@/lib/i18n";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";

function nestComments(flat: Comment[]): Comment[] {
  const map = new Map<string, Comment>();
  const roots: Comment[] = [];

  for (const c of flat) {
    map.set(c.id, { ...c, replies: [] });
  }
  for (const c of flat) {
    const node = map.get(c.id)!;
    if (c.parent_id && map.has(c.parent_id)) {
      map.get(c.parent_id)!.replies!.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

export function Comments() {
  const { locale } = useLocale();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const env =
    process.env.NEXT_PUBLIC_SUPABASE_ENV ?? "production";

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("env", env)
      .order("created_at", { ascending: true });
    if (data) setComments(nestComments(data));
    setLoading(false);
  }, [env]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <section className="mt-10 border-t border-[#e0e0e0] pt-6 dark:border-[#444]">
      <h2 className="text-sm font-bold text-[#000] dark:text-[#e0e0e0]">
        {t(locale, "comments_title")}
      </h2>

      <div className="mt-3">
        <CommentForm onSubmitted={fetchComments} />
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="py-4 text-center text-xs text-[#828282]">
            {t(locale, "loading")}
          </p>
        ) : comments.length === 0 ? (
          <p className="py-4 text-center text-xs text-[#828282]">
            {t(locale, "no_comments")}
          </p>
        ) : (
          comments.map((c) => (
            <CommentItem key={c.id} comment={c} onRefresh={fetchComments} />
          ))
        )}
      </div>
    </section>
  );
}
