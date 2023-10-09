import { atom } from "recoil";

export const categoryList = atom({
  key: "category",
  default: ["럭셔리", "취미", "Tech", "패션", "펫", "유아", "리빙", "잡화"],
});
