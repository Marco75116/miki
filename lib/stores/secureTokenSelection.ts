import { create } from "zustand";

interface useSecureTokenSelectionStore {
  tokensSelectionFrom: string;
  setTokensSelectionFrom: (tokens: string) => void;
  tokensSelectionTo: string;
  setTokensSelectionTo: (tokens: string) => void;
}

export const useSecureTokenSelection = create<useSecureTokenSelectionStore>(
  (set) => ({
    tokensSelectionFrom: "",
    setTokensSelectionFrom: (tokens: string | undefined) =>
      set({ tokensSelectionFrom: tokens }),
    tokensSelectionTo: "",
    setTokensSelectionTo: (tokens: string | undefined) =>
      set({ tokensSelectionTo: tokens }),
  })
);
