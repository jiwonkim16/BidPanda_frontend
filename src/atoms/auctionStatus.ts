import { atom } from "recoil";

export const auctionStatus = atom({
  key: "auctionStatus",
  default: true,
});

export const favoriteItems = atom({
  key: "favoriteItems",
  default: false,
});
