import { createSlice } from "@reduxjs/toolkit";
import { TypeOfInputSectionsWithRemoveButton } from "../../types/type";
import { IRecipeData } from "../../types/interface";

const initialForm: IRecipeData = {
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

const filterByIndex = (state: any, action: any) => {
  const { keyValue, indexValue } = action.payload;
  state.inputTexts[keyValue] = state.inputTexts[keyValue].filter(
    (el: TypeOfInputSectionsWithRemoveButton) => el.index !== indexValue
  );
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState: initialForm,
  reducers: {
    setTitleOrBody: (state, action) => {
      state.inputTexts = { ...state.inputTexts, ...action.payload };
    },
    setCategory: (state, action) => {
      state.inputTexts.category = action.payload;
    },
    addIngredientInputSection: (state, action) => {
      state.inputTexts.ingredients.push(action.payload);
    },
    removeInputSection: filterByIndex,
  },
});

export default recipeSlice.reducer;
export const recipeActions = recipeSlice.actions;
