"use client";

import { useState } from "react";
import type { Post } from "@/lib/seed/types";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { PostForm } from "./PostForm";

type Props = {
  companyId: string;
  latestMonth: string;
  posts: Post[];
  loading: boolean;
  error: string | null;
  onSave: (post: Omit<Post, "id"> & { id?: string }) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
};

export function PostList({
  companyId, latestMonth, posts, loading, error, onSave, onDelete,
}: Props) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  function openNew() {
    setEditingPost(null);
    setFormOpen(true);
  }

  function openEdit(post: Post) {
    setEditingPost(post);
    setFormOpen(true);
  }

  async function handleDelete(id: string) {
    setDeleteError(null);
    const ok = await onDelete(id);
    if (!ok) setDeleteError("삭제에 실패했습니다. 다시 시도해주세요.");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">포스트</h2>
        <Button variant="primary" onClick={openNew}>+ 새 포스트</Button>
      </div>

      {deleteError && <ErrorMessage message={deleteError} />}
      {error && <ErrorMessage message={error} />}

      {formOpen && (
        <PostForm
          companyId={companyId}
          latestMonth={latestMonth}
          editingPost={editingPost}
          onSave={onSave}
          onClose={() => setFormOpen(false)}
        />
      )}

      {loading ? (
        Array.from({ length: 2 }).map((_, i) => <CardSkeleton key={i} />)
      ) : posts.length === 0 ? (
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 text-center">
          <p className="text-[var(--text-muted)] text-sm">등록된 포스트가 없습니다.</p>
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 space-y-2"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-[var(--text-primary)]">{post.title}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{post.dateTime}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="secondary" onClick={() => openEdit(post)}>수정</Button>
                <Button variant="danger" onClick={() => handleDelete(post.id)}>삭제</Button>
              </div>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}