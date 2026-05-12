import { useEffect, useState } from "react";
import { fetchCountries } from "@/lib/api";
import type { Country } from "@/lib/seed/types";

type State = {
  data: Country[];
  loading: boolean;
  error: string | null;
};

export function useCountries() {
  const [state, setState] = useState<State>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchCountries()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch(() =>
        setState({ data: [], loading: false, error: "국가 데이터를 불러오지 못했습니다." })
      );
  }, []);

  return state;
}