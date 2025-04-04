import {create} from "zustand";

interface WatchState {
    watch: number;
    updateWatcher: () => void;
}

export const useWatch = create<WatchState>((set) => ({
    watch: 0,
    updateWatcher: () => set((state) => ({ watch: state.watch + 1 })),
}));