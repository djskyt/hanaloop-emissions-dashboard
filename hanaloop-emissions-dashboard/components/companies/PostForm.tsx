"use client";

import { useState } from "react";
import type { Post } from "@/lib/seed/types";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

type Props = {
  companyId: string;
  latestMonth: string;
  editingPost: Post | null;
  onSave: (post: Omit<Post, "id"> & { id?: string }) => Promise<boolean>;
  onClose: () => void;
};

export function PostForm({ companyId, latestMonth, editingPost, onSave, onClose }: Props) {
  const [title, setTitle] = useState(editingPost?.title ?? "");
  const [content, setContent] = useState(editingPost?.content ?? "");
  const [month, setMonth] = useState(editingPost?.dateTime ?? latestMonth);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 입력해주세요.");
      return;
    }
    setSaving(true);
    setError(null);
    const ok = await onSave({
      id: editingPost?.id,
      title,
      content,
      resourceUid: companyId,
      dateTime: month,
    });
    setSaving(false);
    if (ok) {
      onClose();
    } else {
      setError("저장에 실패했습니다. 다시 시도해주세요.");
    }
  }

  return (
    <div className="rounded-xl border border-[var(--accent-dim)] bg-[var(--bg-elevated)] p-5 space-y-4">
      <p className="text-sm font-semibold text-[var(--accent)]">
        {editingPost ? "포스트 수정" : "새 포스트 작성"}
      </p>

      <div className="space-y-3">
        <input
          className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          placeholder="월 (예: 2024-03)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <textarea
          className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
          placeholder="내용"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="flex gap-2 justify-end">
        <Button variant="ghost" onClick={onClose}>취소</Button>
        <Button variant="primary" loading={saving} onClick={handleSave}>
          저장
        </Button>
      </div>
    </div>
  );
}