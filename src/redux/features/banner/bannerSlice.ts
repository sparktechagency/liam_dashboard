import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  BannerCreateError: "",
  BannerUpdateError: "",
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    SetBannerCreateError: (state, action) => {
      state.BannerCreateError = action.payload;
    },
    SetBannerUpdateError: (state, action) => {
      state.BannerUpdateError = action.payload;
    },
  },
});

export const {
  SetBannerCreateError,
  SetBannerUpdateError,
} = bannerSlice.actions;

const bannerSliceReducer = bannerSlice.reducer;
export default bannerSliceReducer;
