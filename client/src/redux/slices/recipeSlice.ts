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
    setThumbNailFile: (state, action) => {
      state.thumbNail = action.payload;
    },
    setCategory: (state, action) => {
      state.inputTexts.category = action.payload;
    },
    addNewInputSection: (state: any, action) => {
      const { keyValue, newValue } = action.payload;
      state.inputTexts[keyValue].push(newValue);
    },
    removeInputSection: (state: any, action) => {
      const { keyValue, currentIndex } = action.payload;
      state.inputTexts[keyValue] = state.inputTexts[keyValue].filter(
        (el: TypeOfInputSectionsWithRemoveButton, index: number) =>
          index !== currentIndex
      );
      // 레시피 순서의 이미지 파일 요소 제거
      if (keyValue === "directions" && state.stepImgFiles[currentIndex]) {
        state.stepImgFiles = state.stepImgFiles.filter(
          (el: TypeOfInputSectionsWithRemoveButton, index: number) =>
            index !== currentIndex
        );
      }
    },
    changeInputsSectionValues: (state: any, action) => {
      const { keyValue, currentIndex, newInputsValues } = action.payload;
      state.inputTexts[keyValue][currentIndex] = newInputsValues;
    },
    changeStepTextInputValue: (state, action) => {
      const { inputText, currentIndex } = action.payload;
      state.inputTexts.directions[currentIndex].body = inputText;
    },
    changeStepImageFile: (state, action) => {
      const { currentIndex, file } = action.payload;
      const fileName = file.name;
      state.stepImgFiles[currentIndex] = file;
      state.inputTexts.directions[currentIndex].imgDirectionUrl = fileName;
      state.inputTexts.directions[currentIndex].isUploaded = true;
    },
    addTag: (state, action) => {
      state.inputTexts.tags.push(action.payload);
    },
    removeTag: (state, action) => {
      const targetIdx = action.payload;
      state.inputTexts.tags.splice(targetIdx, 1);
    },
  },
});

export default recipeSlice.reducer;
export const recipeActions = recipeSlice.actions;
