import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userId: String;
  userName: String;
  region: String;
  virtualAddress: String;
  zipCode: String;
  stamps: [String];
  paperStyles: [String];
  contacts: [String];
  badges: [String];
  languages: [String];
  onboarded: Boolean | null;
}
const initialState: UserState = {
  userId: "",
  userName: "",
  region: "",
  virtualAddress: "",
  zipCode: "",
  stamps: [""],
  paperStyles: [""],
  contacts: [""],
  badges: [""],
  languages: [""],
  onboarded: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
  },
});

export const { setUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;
