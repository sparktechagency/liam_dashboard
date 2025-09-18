import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CategoryCreateError: "",
  CategoryUpdateError: "",
  categoryOptions: []
};

const materialsSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    SetCategoryCreateError: (state, action) => {
      state.CategoryCreateError = action.payload;
    },
    SetCategoryUpdateError: (state, action) => {
      state.CategoryUpdateError = action.payload;
    },
    SetCategoryOptions: (state, action) => {
      state.categoryOptions = action.payload;
    }
  },
});

export const {
  SetCategoryCreateError,
  SetCategoryUpdateError,
  SetCategoryOptions
} = materialsSlice.actions;

const materialsSliceReducer = materialsSlice.reducer;
export default materialsSliceReducer;
