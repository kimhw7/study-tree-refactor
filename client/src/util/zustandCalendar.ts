import create from "zustand";
import axios from "axios";
// require("dotenv").config();

interface calendarState {
  calendarPost: (id: string, data: object) => void;
  calendarDelete: (id: string) => void;
  calendarPatch: (id: string, data: object) => void;
}
export const calendarStore = create<calendarState>((set) => ({
  calendarPost: (id, data) => {
    try {
      axios
        .post(process.env.REACT_APP_API_URL + "/calendar?studyId=" + id, data)
        .then((res) => console.log(res));
      alert("스터디가 생성되었습니다");
    } catch (error) {
      console.log("err", error);
      alert("에러");
    }
  },
  calendarDelete: (id) => {
    try {
      axios.delete(process.env.REACT_APP_API_URL + "/calendar/" + id);
      alert("삭제되었습니다");
    } catch (error) {
      console.log("err", error);
      alert("에러");
    }
  },
  calendarPatch: (id, data) => {
    try {
      axios
        .patch(process.env.REACT_APP_API_URL + "/calendar/" + id, data)
        .then((res) => console.log(res));
      alert("스터디가 수정되었습니다");
    } catch (error) {
      console.log("err", error);
      alert("에러");
    }
  },
}));
