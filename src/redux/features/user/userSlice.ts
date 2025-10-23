import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../../types/user.type";


type TInitialState = {
  profileError: string;
  user: IUser | null;
}

const initialState: TInitialState = {
  profileError: "",
  user: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    SetProfileError: (state, action: PayloadAction<string>) => {
      state.profileError = action.payload;
    },
  },
});

export const {
  SetUser,
  SetProfileError
} = userSlice.actions;

const userSliceReducer = userSlice.reducer;
export default userSliceReducer;
