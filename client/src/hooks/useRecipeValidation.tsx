import { useState, useEffect } from "react";
import {
  IStepValues,
  ITagProps,
  IPostInGredientProps,
} from "../types/interface";
import { TypeOfIngredients, TypeOfTags } from "../types/type";

const useRecipeValidation = (
  data: { body: string; title: string },
  ingredientsDatas: TypeOfIngredients[],
  directDatas: IStepValues[],
  tagsDatas: TypeOfTags[]
): boolean => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  // console.log("유즈 isEmpty", isEmpty);
  // console.log("유즈 data", data);
  // console.log("유즈 재료", ingredientsDatas);
  // console.log("유즈 순서", directDatas);
  // console.log("유즈 태그", tagsDatas);

  useEffect(() => {
    setIsEmpty(false);

    if (!data.body || !data.title) {
      // console.log(data.body, data.title);
      setIsEmpty(true);
    }

    ingredientsDatas.forEach((ingredient: IPostInGredientProps) => {
      if (!ingredient.amount || !ingredient.name) {
        // console.log(ingredient.amount, ingredient.name);
        setIsEmpty(true);
      }
    });

    directDatas.forEach((directInfo: IStepValues) => {
      if (!directInfo.body) {
        // console.log(directInfo.body);
        setIsEmpty(true);
      }
    });

    tagsDatas.forEach((tag: ITagProps) => {
      if (!tag.name) {
        // console.log(tag.name);
        setIsEmpty(true);
      }
    });
  }, [data, ingredientsDatas, directDatas, tagsDatas]);

  return isEmpty;
};

export default useRecipeValidation;
