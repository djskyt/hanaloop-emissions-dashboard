"use client";

import { useCompanies } from "@/hooks/useCompanies";
import { usePosts } from "@/hooks/usePosts";
import { useUiStore } from "@/store/uiStore";
import { useRouter } from "next/navigation";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PostForm } from "@/components/companies/PostForm";
import { useState } from "react";
import type { Post } from "@/lib/seed/types";

export default function PostsPage() {
  const router = useRouter();
  const { data: companies } = useCompanies();
  const { data: posts, loading, error, savePost, removePost } = usePosts();
  const { selectedCompanyId, setSelectedCompanyId } = useUiStore();

  const [formOpen, setFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const filtered = selectedCompanyId
    ? posts.filter((p) => p.resourceUid === selectedCompanyId)
    : posts;

  const getCompanyName = (id: string) =>
    companies.find((c) => c.id === id)?.name ?? id;

  const latestMonth = "2024-06";

  function openNew() {
    setEditingPost(null);
    setFormOpen(true);
  }

  function openEdit(post: Post) {
    setEditingPost(post);
    setSelectedCompanyId(post.resourceUid);
    setFormOpen(true);
  }

  async function handleDelete(id: string) {
    setDeleteError(null);
    const ok = await removePost(id);
    if (!ok) setDeleteError("삭제에 실패했습니다. 다시 시도해주세요.");
  }

  if (error) {
    return (
      <div className="p-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">포스트</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            전체 {filtered.length}개 포스트
          </p>
        </div>
        <Button variant="primary" onClick={openNew}>
          + 새 포스트
        </Button>
      </div>

      {/* 회사 필터 */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCompanyId(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
            selectedCompanyId === null
              ? "bg-[var(--accent-glow)] text-[var(--accent)] border-[var(--accent-dim)]"
              : "text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text-primary)]"
          }`}
        >
          전체
        </button>
        {companies.map((company) => (
          <button
            key={company.id}
            onClick={() => setSelectedCompanyId(company.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              selectedCompanyId === company.id
                ? "bg-[var(--accent-glow)] text-[var(--accent)] border-[var(--accent-dim)]"
                : "text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text-primary)]"
            }`}
          >
            {company.name}
          </button>
        ))}
      </div>

      {/* 포스트 폼 */}
      {formOpen && (
        <div className="space-y-3">
          {/* 회사 선택 */}
          {!editingPost && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[var(--text-muted)]">회사 선택:</span>
              {companies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => setSelectedCompanyId(company.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    selectedCompanyId === company.id
                      ? "bg-[var(--accent-glow)] text-[var(--accent)] border-[var(--accent-dim)]"
                      : "text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {company.name}
                </button>
              ))}
            </div>
          )}
          <PostForm
            companyId={selectedCompanyId ?? companies[0]?.id ?? ""}
            latestMonth={latestMonth}
            editingPost={editingPost}
            onSave={savePost}
            onClose={() => setFormOpen(false)}
          />
        </div>
      )}

      {deleteError && <ErrorMessage message={deleteError} />}

      {/* 포스트 목록 */}
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-12 text-center">
            <p className="text-[var(--text-muted)] text-sm">등록된 포스트가 없습니다.</p>
          </div>
        ) : (
          filtered.map((post) => (
            <div
              key={post.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-medium text-[var(--text-primary)]">{post.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">{post.dateTime}</Badge>
                    <button
                      onClick={() => router.push(`/companies/${post.resourceUid}`)}
                      className="text-xs text-[var(--accent)] hover:opacity-80 transition-opacity"
                    >
                      {getCompanyName(post.resourceUid)} →
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="secondary" onClick={() => openEdit(post)}>
                    수정
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(post.id)}>
                    삭제
                  </Button>
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}