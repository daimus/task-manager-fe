import {create} from "zustand";

export const useWatch = create((set) => ({
    watch: 0,
    updateWatcher: () => set((state) => ({watch: state.watch + 1}))
}));