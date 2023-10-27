import { atom } from "recoil";

export const isReadState = atom({
  key: "isReadState",
  default: false,
});

// interface AuctionStatus {
//   [itemId: string]: boolean;
// }

// export const auctionStatusAtom = atom<AuctionStatus>({
//   key: "auctionStatus",
//   default: {},
// });
