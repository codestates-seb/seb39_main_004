import { createSlice } from "@reduxjs/toolkit";
import { TypeOfInputSectionsWithRemoveButton } from "../../types/type";
import { IRecipeData } from "../../types/interface";

const initialForm: IRecipeData = {
  inputTexts: {
    title: "",
    body: "",
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
      state.inputTexts.category = action.payload;
    },
    addIngredientInputSection: (state, action) => {
      state.inputTexts.ingredients.push(action.payload);
    },
    removeInputSection: (state: any, action: any) => {
      const { keyValue, indexValue } = action.payload;
      state.inputTexts[keyValue] = state.inputTexts[keyValue].filter(
        (el: TypeOfInputSectionsWithRemoveButton) => el.index !== indexValue
      );
    },
    changeInputsSectionValues: (state: any, action: any) => {
      const { keyValue, indexValue, newInputsValues } = action.payload;
      const currentIndex = state.inputTexts[keyValue].findIndex(
        (el: TypeOfInputSectionsWithRemoveButton) => el.index === indexValue
      );
      state.inputTexts[keyValue][currentIndex] = newInputsValues;
    },
    addTag: (state, action) => {
      state.inputTexts.tags.push(action.payload);
    },
    removeTag: (state, action) => {
      const targetIdx = action.payload;
      state.inputTexts.tags.splice(targetIdx, 1);
    },
    setThumbNailFile: (state, action) => {
      state.thumbNail = action.payload;
    },
  },
});

export default recipeSlice.reducer;
export const recipeActions = recipeSlice.actions;