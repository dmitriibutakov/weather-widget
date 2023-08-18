import { defineStore } from "pinia";

interface CommonState {
  isShowSettings: boolean;
  isLoading: boolean;
  error: string;
}

export const useCommonStore = defineStore({
  id: "common",
  state: (): CommonState => ({
    isLoading: false,
    isShowSettings: false,
    error: "",
  }),
  getters: {
    getIsLoading: (state: CommonState): boolean => state.isLoading,
    getIsShowSettings: (state: CommonState): boolean => state.isShowSettings,
    getError: (state: CommonState) => state.error,
  },
  actions: {
    setIsLoading(val: boolean) {
      this.isLoading = val;
    },
    toggleShowSettings() {
      this.isShowSettings = !this.isShowSettings;
    },
    setError(err: string) {
      this.error = err;
    },
  },
});
