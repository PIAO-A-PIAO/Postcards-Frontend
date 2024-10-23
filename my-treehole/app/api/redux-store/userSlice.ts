import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

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
    resetUser: () => initialState,
    setUserState: (state, action: PayloadAction<Partial<UserState>>) => {
      // Merge the existing state with the payload, updating only the fields that are present in the payload
      Object.assign(state, action.payload);
      // Alternatively, you can use:
      // return { ...state, ...action.payload };
    },
  },
});
export const selectUser = (state: RootState) => state.user;

export const { setUserState, resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
