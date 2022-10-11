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

  useEffect(() => {
    setIsEmpty(false);

    if (!data.body || !data.title) {
      setIsEmpty(true);
    }

    ingredientsDatas.forEach((ingredient: IPostInGredientProps) => {
      if (!ingredient.amount || !ingredient.name) {
        setIsEmpty(true);
      }
    });

    directDatas.forEach((directInfo: IStepValues) => {
      if (!directInfo.body) {
        setIsEmpty(true);
      }
    });

    tagsDatas.forEach((tag: ITagProps) => {
      if (!tag.name) {
        setIsEmpty(true);
      }
    });

    if (ingredientsDatas.length === 0 || directDatas.length === 0) {
      setIsEmpty(true);
    }
  }, [data, ingredientsDatas, directDatas, tagsDatas]);

  return isEmpty;
};

export default useRecipeValidation;
