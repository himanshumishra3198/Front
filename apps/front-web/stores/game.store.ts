import { create } from "zustand";

type MatchState = "IDLE" | "SEARCHING" | "MATCH_FOUND";

export const useMatchStore = create((set) => ({
  state: "IDLE",

  startSearching: () => set({ state: "SEARCHING" }),
  matchFound: () => set({ state: "MATCH_FOUND" }),
  reset: () => set({ state: "IDLE" }),
}));
