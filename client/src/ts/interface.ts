import { Dispatch, SetStateAction } from "react";
import { TypeOfFileList, TypeOfFormData, TypeOfIngredients } from "./type";
import { UseFormRegister } from "react-hook-form";

interface IStepMakerProps {
  idx?: number;
  setThumbNail?: Dispatch<SetStateAction<TypeOfFileList>>;
  stepImgFiles?: TypeOfFileList[];
  setStepImgFiles?: Dispatch<SetStateAction<TypeOfFileList[]>>;
  clickEvent?: (orderValue: string) => Promise<void> | void;
}

interface IResponseImgProps {
  contentType?: string;
  createData?: string;
  fileName: string;
  fileSize?: number;
  id: number;
  modDate?: string;
  originFileName?: string;
}

interface IAddIngredientsProps {
  register?: UseFormRegister<TypeOfFormData>;
  ingredientsDatas: TypeOfIngredients[];
  setIngredientsDatas: Dispatch<SetStateAction<TypeOfIngredients[]>>;
}

interface IIngredientSetProps extends IAddIngredientsProps {
  idx: number;
}

export type {
  IStepMakerProps,
  IResponseImgProps,
  IAddIngredientsProps,
  IIngredientSetProps,
};
