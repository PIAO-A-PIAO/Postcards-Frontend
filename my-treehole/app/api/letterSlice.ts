import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LetterState {
  senderId: String;
  recipientId: String;
  contents: [String];
  attachments: [String];
  stampUsed: String;
  paperStyle: String;
  fromAddress: String;
  fromRegion: String;
  toAddress: String;
  toRegion: String;
  language: String;
  isDraft: Boolean | null;
  isSent: Boolean | null;
  isRead: Boolean | null;
}

const initialState: LetterState = {
  senderId: "",
  recipientId: "",
  contents: [""],
  attachments: [""],
  stampUsed: "",
  paperStyle: "",
  fromAddress: "",
  fromRegion: "",
  toAddress: "",
  toRegion: "",
  language: "",
  isDraft: null,
  isSent: null,
  isRead: null,
};

export const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    setLetterState: (state, action: PayloadAction<LetterState>) => {
      state = action.payload;
    },
  },
});

export const { setLetterState } = letterSlice.actions;
export const letterReducer = letterSlice.reducer;
