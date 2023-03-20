/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypeOfInputSectionsWithRemoveButton } from "../../types/type";
import { IRecipeData, ITagProps } from "../../types/interface";
import useMessage from "../../hooks/useMessage";

const initialForm: IRecipeData = {
  inputTexts: {
    title: "",
    body: "",
    category: "",
    ingredients: [
      {
        index: 1,
        name: "",
        amount: "",
        isEssential: false,
      },
    ],
    directions: [
      {
        index: 1,
        imgDirectionUrl: "",
        body: "",
        isUploaded: false,
      },
    ],
    tags: [],
  },
  imgThumbNailUrl: "",
  thumbNailFile: null,
  stepImgFiles: [],
};

export const makeImageURL = (file: FileList[0]) => {
  const newFileURL = URL.createObjectURL(file);
  return newFileURL;
};

export const fetchRecipeEditData = createAsyncThunk(
  "recipeSlice/fetchEditDataById",
  async (id: string) => {
    const response = await axios.get(`/api/v1/recipe/${id}/edit/`);
    return response.data.data;
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState: initialForm,
  reducers: {
    resetInputsValue: () => {
      return initialForm;
    },
    setTitleOrBody: (state, action) => {
      state.inputTexts = { ...state.inputTexts, ...action.payload };
    },
    setThumbNailFile: (state, action) => {
      state.thumbNailFile = action.payload;
      // state.imgThumbNailUrl = makeImageURL(action.payload);
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
    changeIngredientSectionValues: (state, action) => {
      const { currentIndex, changedSectionValues } = action.payload;
      state.inputTexts.ingredients[currentIndex] = changedSectionValues;
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
    alignIndexNumber: (state: any) => {
      const keys = ["ingredients", "directions"];
      keys.forEach((key) => {
        state.inputTexts[key] = state.inputTexts[key].map(
          (el: TypeOfInputSectionsWithRemoveButton, idx: number) => ({
            ...el,
            index: idx + 1,
          })
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipeEditData.fulfilled, (state, action) => {
        const {
          title,
          body,
          category,
          ingredients,
          directions,
          tags,
          imgThumbNailUrl,
        } = action.payload;

        const tagsWithNameKey = tags.map((el: ITagProps) => ({
          name: el.name,
        }));

        state.inputTexts = {
          ...state,
          title,
          body,
          category,
          ingredients,
          directions,
          tags: tagsWithNameKey,
        };
        state.imgThumbNailUrl = imgThumbNailUrl;
      })
      .addCase(fetchRecipeEditData.rejected, (state, action) => {
        // TODO: useMessage 일반 함수 이름 변경
        const errorType: { [key: string]: string } = { 4: "요청", 5: "서버" };
        const FirstErrorNumber = action.error.message?.at(-3); // Request failed with status code 404
        const cause =
          FirstErrorNumber === "4" || FirstErrorNumber === "5"
            ? errorType[FirstErrorNumber]
            : "";

        const message = useMessage(3000);
        message.fire({
          icon: "error",
          title: `데이터를 가져오는데\n ${cause} 문제가 생겼습니다.`,
        });
      });
  },
});

export default recipeSlice.reducer;
export const recipeActions = recipeSlice.actions;
