import { Dispatch, SetStateAction } from "react";
import {
  TypeOfDirections,
  TypeOfFileList,
  TypeOfFormData,
  TypeOfIngredients,
  TypeOfTags,
} from "./type";
import { UseFormRegister } from "react-hook-form";

interface IImgUploaderProps {
  idx?: number;
  setThumbNail?: Dispatch<SetStateAction<TypeOfFileList>>;
  stepImgFiles?: TypeOfFileList[];
  setStepImgFiles?: Dispatch<SetStateAction<TypeOfFileList[]>>;
  setImgName?: Dispatch<SetStateAction<string | undefined>>;
}

interface IStepMakerProps extends IImgUploaderProps {
  stepsDatas: TypeOfDirections[];
  setStepsDatas: Dispatch<SetStateAction<TypeOfDirections[]>>;
  clickEvent?: (orderValue: string) => Promise<void> | void;
}

interface IStepSetProps {
  idx: number;
  stepImgFiles?: TypeOfFileList[];
  setStepImgFiles?: Dispatch<SetStateAction<TypeOfFileList[]>>;
  stepsDatas: TypeOfDirections[];
  setStepsDatas: Dispatch<SetStateAction<TypeOfDirections[]>>;
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

interface ITagsMakerProps {
  setTagsDatas: Dispatch<SetStateAction<TypeOfTags[]>>;
}

export type {
  IImgUploaderProps,
  IStepMakerProps,
  IResponseImgProps,
  IAddIngredientsProps,
  IIngredientSetProps,
  IStepSetProps,
  ITagsMakerProps,
};
