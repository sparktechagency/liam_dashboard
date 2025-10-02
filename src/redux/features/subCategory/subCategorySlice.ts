import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SubCategoryCreateError: "",
  SubCategoryUpdateError: "",
  categoryOptions: []
};

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    SetSubCategoryCreateError: (state, action) => {
      state.SubCategoryCreateError = action.payload;
    },
    SetSubCategoryUpdateError: (state, action) => {
      state.SubCategoryUpdateError = action.payload;
    },
    SetSubCategoryOptions: (state, action) => {
      state.categoryOptions = action.payload;
    }
  },
});

export const {
  SetSubCategoryCreateError,
  SetSubCategoryUpdateError,
  SetSubCategoryOptions
} = subCategorySlice.actions;

const subCategorySliceReducer = subCategorySlice.reducer;
export default subCategorySliceReducer;
