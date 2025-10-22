import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  QuestionCreateError: "",
  QuestionUpdateError: "",
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    SetQuestionCreateError: (state, action) => {
      state.QuestionCreateError = action.payload;
    },
    SetQuestionUpdateError: (state, action) => {
      state.QuestionUpdateError = action.payload;
    },
  },
});

export const {
  SetQuestionCreateError,
  SetQuestionUpdateError,
} = questionSlice.actions;

const questionSliceReducer = questionSlice.reducer;
export default questionSliceReducer;
