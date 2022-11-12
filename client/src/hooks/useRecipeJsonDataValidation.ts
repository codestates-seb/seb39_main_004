import { useState, useEffect } from "react";
import {
  IStepValues,
  ITagProps,
  IPostInGredientProps,
  IEditResponseData,
} from "../types/interface";

const useRecipeJsonDataValidation = (
  inputDatas: IEditResponseData
): boolean => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    setIsEmpty(false);

    if (!inputDatas.body || !inputDatas.title) {
      setIsEmpty(true);
    }

    inputDatas.ingredients.forEach((ingredient: IPostInGredientProps) => {
      if (!ingredient.amount || !ingredient.name) {
        setIsEmpty(true);
      }
    });

    inputDatas.directions.forEach((directInfo: IStepValues) => {
      if (!directInfo.body) {
        setIsEmpty(true);
      }
    });

    inputDatas.tags.forEach((tag: ITagProps) => {
      if (!tag.name) {
        setIsEmpty(true);
      }
    });

    if (
      inputDatas.ingredients.length === 0 ||
      inputDatas.directions.length === 0
    ) {
      setIsEmpty(true);
    }
  }, [inputDatas]);

  return isEmpty;
};

export default useRecipeJsonDataValidation;
