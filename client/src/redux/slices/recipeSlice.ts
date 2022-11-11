import { createSlice } from "@reduxjs/toolkit";

const initialForm = {
  inputTexts: {
    title: "",
    body: "",
    imgThumbNailUrl: "",
    category: "",
    ingredients: [],
    directions: [],
    tags: [],
  },
  thumbNail: null,
  stepImgFiles: [],
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState: initialForm,
  reducers: {
    setTitleOrBody: (state, action) => {
      state.inputTexts = { ...state.inputTexts, ...action.payload };
    },
    setCategory: (state, action) => {
      // state.inputTexts.category = action.payload;
    },
  },
});

export default recipeSlice.reducer;
export const recipeActions = recipeSlice.actions;
