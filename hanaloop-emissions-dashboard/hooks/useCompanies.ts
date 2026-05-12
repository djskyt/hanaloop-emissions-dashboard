import { useEffect, useState } from "react";
import { fetchCompanies } from "@/lib/api";
import type { Company } from "@/lib/seed/types";

type State = {
  data: Company[];
  loading: boolean;
  error: string | null;
};

export function useCompanies() {
  const [state, setState] = useState<State>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchCompanies()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch(() =>
        setState({ data: [], loading: false, error: "회사 데이터를 불러오지 못했습니다." })
      );
  }, []);

  return state;
}