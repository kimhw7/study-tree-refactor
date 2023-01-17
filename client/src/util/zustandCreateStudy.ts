import create from "zustand";
import axios from "axios";
interface createStudyState {
  studyId: number | null;
  isLoading: boolean;
  fetchCreateStudy: (url: string, form: object) => void;
}
export const createStudyStore = create<createStudyState>((set) => ({
  studyId: null,
  isLoading: false,
  fetchCreateStudy: async (url, form) => {
    set({ isLoading: true });
    try {
      const response: any = await axios.post(url + "/study", form, {
        headers: {
          "access-Token": "abc",
        },
      });
      set({ studyId: await response.data.data.studyId });
    } catch (error) {
      console.log(error);
    }
    set({ isLoading: false });
  },
}));