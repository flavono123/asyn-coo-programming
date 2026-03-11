"use client";

import { useState } from "react";
import type { Comment } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import { getFingerprint } from "@/lib/fingerprint";
import { useLocale, t } from "@/lib/i18n";
import { CommentForm } from "./CommentForm";

type Props = {
  comment: Comment;
  onRefresh: () => void;
  depth?: number;
};

export function CommentItem({ comment, onRefresh, depth = 0 }: Props) {
  const { locale } = useLocale();
  const [showReply, setShowReply] = useState(false);
  const [liking, setLiking] = useState(false);

  async function handleLike() {
    setLiking(true);
    const fingerprint = getFingerprint();

    const { data: existing } = await supabase
      .from("comment_likes")
      .select("id")
      .eq("comment_id", comment.id)
      .eq("fingerprint", fingerprint)
      .maybeSingle();

    if (existing) {
      await supabase.from("comment_likes").delete().eq("id", existing.id);
      await supabase
        .from("comments")
        .update({ likes_count: Math.max(0, comment.likes_count - 1) })
        .eq("id", comment.id);
    } else {
      await supabase
        .from("comment_likes")
        .insert({ comment_id: comment.id, fingerprint });
      await supabase
        .from("comments")
        .update({ likes_count: comment.likes_count + 1 })
        .eq("id", comment.id);
    }

    onRefresh();
    setLiking(false);
  }

  const timeAgo = getTimeAgo(comment.created_at, locale);

  return (
    <div
      className={
        depth > 0
          ? "ml-4 border-l border-[#e0e0e0] pl-3 dark:border-[#444]"
          : ""
      }
    >
      <div className="py-2">
        <div className="flex items-center gap-1.5 text-[10px] text-[#828282]">
          <span className="font-bold">{comment.nickname}</span>
          <span>{timeAgo}</span>
        </div>
        <p className="mt-0.5 text-xs whitespace-pre-wrap text-[#000] dark:text-[#e0e0e0]">
          {comment.content}
        </p>
        <div className="mt-1 flex items-center gap-2 text-[10px] text-[#828282]">
          <button
            onClick={handleLike}
            disabled={liking}
            className="hover:text-[#ff6600]"
          >
            {t(locale, "like")}
            {comment.likes_count > 0 ? ` (${comment.likes_count})` : ""}
          </button>
          {depth < 2 && (
            <>
              <span>|</span>
              <button
                onClick={() => setShowReply(!showReply)}
                className="hover:text-[#ff6600]"
              >
                {t(locale, "reply")}
              </button>
            </>
          )}
        </div>
        {showReply && (
          <div className="mt-2">
            <CommentForm
              parentId={comment.id}
              onSubmitted={() => {
                setShowReply(false);
                onRefresh();
              }}
              onCancel={() => setShowReply(false)}
            />
          </div>
        )}
      </div>
      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          onRefresh={onRefresh}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

function getTimeAgo(dateStr: string, locale: "ko" | "en"): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (locale === "ko") {
    if (mins < 1) return "방금";
    if (mins < 60) return `${mins}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  }
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}
