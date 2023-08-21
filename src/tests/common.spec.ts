import { useCommonStore } from "@/store/common";
import { createPinia } from "pinia";

const pinia = createPinia();
describe("CommonStore Actions", () => {
  it("should set isLoading correctly", () => {
    const commonStore = useCommonStore(pinia);
    commonStore.setIsLoading(true);
    expect(commonStore.getIsLoading).toBe(true);
  });

  it("should toggle isShowSettings and reset error", () => {
    const commonStore = useCommonStore(pinia);
    commonStore.setError("Some error message");
    commonStore.toggleShowSettings();

    expect(commonStore.getIsShowSettings).toBe(true);
    expect(commonStore.getError).toBe("");
  });

  it("should set error correctly", () => {
    const commonStore = useCommonStore(pinia);
    const errorMessage = "This is an error";
    commonStore.setError(errorMessage);

    expect(commonStore.getError).toBe(errorMessage);
  });
});
