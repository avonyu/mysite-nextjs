import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GalleryState {
  square: boolean;
  setSquare: (square: boolean) => void;
}

export const useGalleryStore = create<GalleryState>()(
  persist(
    (set) => ({
      square: true,
      setSquare: (square) => set({ square }),
    }),
    { name: "gallery-grid" },
  ),
);
