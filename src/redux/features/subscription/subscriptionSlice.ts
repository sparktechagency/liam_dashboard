import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SubscriptionCreateError: "",
  SubscriptionUpdateError: "",
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    SetSubscriptioneCreateError: (state, action) => {
      state.SubscriptionCreateError = action.payload;
    },
    SetSubscriptionUpdateError: (state, action) => {
      state.SubscriptionUpdateError = action.payload;
    },
  },
});

export const {
  SetSubscriptioneCreateError,
  SetSubscriptionUpdateError,
} = subscriptionSlice.actions;

const subscriptionSliceReducer = subscriptionSlice.reducer;
export default subscriptionSliceReducer;
