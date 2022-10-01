import { Dispatch, SetStateAction } from "react";
import {
  TypeOfFileList,
  TypeOfFormData,
  TypeOfIngredients,
  TypeOfTags,
} from "./type";
import { UseFormRegister } from "react-hook-form";

interface IImgUploaderProps {
  id?: number;
  setThumbNail?: Dispatch<SetStateAction<TypeOfFileList>>;
  stepImgFiles?: TypeOfFileList[];
  setStepImgFiles?: Dispatch<SetStateAction<TypeOfFileList[]>>;
  setImgName?: Dispatch<SetStateAction<string>>;
}

interface IStepMakerProps extends IImgUploaderProps {
  directDatas: IDirections[];
  setDirectDatas: Dispatch<SetStateAction<IDirections[]>>;
  clickEvent?: (orderValue: string) => Promise<void> | void;
}

interface IStepValues {
  imgDirectionUrl: string;
  body: string;
  id: number;
}

interface IDirections extends IStepValues {
  index: number;
}

interface IStepSetProps {
  id: number;
  text: string;
  imgUrl: string;
  steps: IStepValues[];
  setSteps: Dispatch<SetStateAction<IStepValues[]>>;
  stepImgFiles?: TypeOfFileList[];
  setStepImgFiles?: Dispatch<SetStateAction<TypeOfFileList[]>>;
  directDatas: IDirections[];
  setDirectDatas: Dispatch<SetStateAction<IDirections[]>>;
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

interface IItemProps {
  id: number;
  title: string;
  imgThumbNailUrl: string;
  stars: string;
  tags: ITagProps[];
}

interface IRecipeDataProps {
  mainData?: IItemProps[];
  searchData?: IItemProps[];
  setSearchSortBy?: React.Dispatch<React.SetStateAction<string>>;
}

interface ITagProps {
  id?: number;
  name: string;
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

interface IImgRadioProps {
  setCheckedCateg: Dispatch<SetStateAction<string>>;
}

interface IRadioBtnProps extends IImgRadioProps {
  keyValue: string;
  srcValue: string;
}

interface ICategory {
  rice?: string;
  noddle?: string;
  dessert?: string;
  beverage?: string;
  etc?: string;
}

interface ICategoryProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

interface IIconProps {
  img: string;
  alt: string;
  text: string;
  link: string;
  clickEvent: (categoryValue: string) => void;
}

interface ITagWithBtnProps {
  tag: string;
  idx: number;
  tagRemover: (idx: number) => void;
}

interface IRemoveBtnProps {
  removeHandler: (idx: number) => void;
  id: number;
}

export type {
  IImgUploaderProps,
  IStepMakerProps,
  IResponseImgProps,
  IAddIngredientsProps,
  IIngredientSetProps,
  IStepSetProps,
  ITagsMakerProps,
  IItemProps,
  ITagProps,
  IRecipeDataProps,
  IRadioBtnProps,
  ICategory,
  IImgRadioProps,
  ICategoryProps,
  IIconProps,
  ITagWithBtnProps,
  IRemoveBtnProps,
  IStepValues,
  IDirections,
};
