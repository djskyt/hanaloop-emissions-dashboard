import { useEffect, useState, useCallback } from "react";
import { fetchPosts, createOrUpdatePost, deletePost } from "@/lib/api";
import type { Post } from "@/lib/seed/types";

type State = {
  data: Post[];
  loading: boolean;
  error: string | null;
};

export function usePosts() {
  const [state, setState] = useState<State>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchPosts()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch(() =>
        setState({ data: [], loading: false, error: "포스트 데이터를 불러오지 못했습니다." })
      );
  }, []);

  // Optimistic update + 실패 시 롤백
  const savePost = useCallback(
    async (post: Omit<Post, "id"> & { id?: string }): Promise<boolean> => {
      const prev = state.data;

      // Optimistic update
      if (post.id) {
        setState((s) => ({
          ...s,
          data: s.data.map((p) => (p.id === post.id ? (post as Post) : p)),
        }));
      } else {
        const temp: Post = { ...post, id: "__temp__" };
        setState((s) => ({ ...s, data: [...s.data, temp] }));
      }

      try {
        const saved = await createOrUpdatePost(post);
        setState((s) => ({
          ...s,
          data: s.data.map((p) =>
            p.id === "__temp__" || p.id === saved.id ? saved : p
          ),
        }));
        return true;
      } catch {
        // 롤백
        setState((s) => ({ ...s, data: prev }));
        return false;
      }
    },
    [state.data]
  );

  const removePost = useCallback(
    async (id: string): Promise<boolean> => {
      const prev = state.data;

      // Optimistic update
      setState((s) => ({ ...s, data: s.data.filter((p) => p.id !== id) }));

      try {
        await deletePost(id);
        return true;
      } catch {
        // 롤백
        setState((s) => ({ ...s, data: prev }));
        return false;
      }
    },
    [state.data]
  );

  return { ...state, savePost, removePost };
}