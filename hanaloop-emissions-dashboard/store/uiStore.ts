import { create } from "zustand";

type UiStore = {
  // Navigation
  isDrawerOpen: boolean;
  toggleDrawer: () => void;

  // Filters
  selectedCountry: string | null;
  selectedYearMonth: string | null;
  selectedCompanyId: string | null;
  setSelectedCountry: (country: string | null) => void;
  setSelectedYearMonth: (yearMonth: string | null) => void;
  setSelectedCompanyId: (id: string | null) => void;

  // Post Form Modal
  isPostFormOpen: boolean;
  editingPostId: string | null;
  openPostForm: (postId?: string) => void;
  closePostForm: () => void;
};

export const useUiStore = create<UiStore>((set) => ({
  isDrawerOpen: true,
  toggleDrawer: () =>
    set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

  selectedCountry: null,
  selectedYearMonth: null,
  selectedCompanyId: null,
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setSelectedYearMonth: (yearMonth) => set({ selectedYearMonth: yearMonth }),
  setSelectedCompanyId: (id) => set({ selectedCompanyId: id }),

  isPostFormOpen: false,
  editingPostId: null,
  openPostForm: (postId) =>
    set({ isPostFormOpen: true, editingPostId: postId ?? null }),
  closePostForm: () =>
    set({ isPostFormOpen: false, editingPostId: null }),
}));