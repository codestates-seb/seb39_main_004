import { Dispatch, SetStateAction } from "react";
import {
  TypeOfFileList,
  TypeOfFormData,
  TypeOfIngredients,
  TypeOfTags,
} from "./type";
import { UseFormRegister } from "react-hook-form";

interface IThumbNailProps {
  resThumbNailImgUrl?: string;
  setThumbNail: Dispatch<SetStateAction<TypeOfFileList>>;
}

interface IImgUploaderProps {
  steps?: IStepValues[];
  imgName: string;
  currentIndex?: number;
  imgUrl: string;
  stepImgFiles?: TypeOfFileList[];
  setStepImgFiles?: Dispatch<SetStateAction<TypeOfFileList[]>>;
  setImgName?: Dispatch<SetStateAction<string>>;
  booleanArr: boolean[];
  setBooleanArr: Dispatch<SetStateAction<boolean[]>>;
}

interface IStepMakerProps {
  // setEditResponse?: Dispatch<SetStateAction<IEditResponseData | undefined>>;
  // editResponse?: IEditResponseData | undefined;
  directDatas: IStepValues[];
  setDirectDatas: Dispatch<SetStateAction<IStepValues[]>>;
  stepImgFiles: TypeOfFileList[];
  setStepImgFiles: Dispatch<SetStateAction<TypeOfFileList[]>>;
  setBooleanArr: Dispatch<SetStateAction<boolean[]>>;
  booleanArr: boolean[];
  // clickEvent?: (orderValue: string) => Promise<void> | void;
}

interface IStepValues {
  imgDirectionUrl: string;
  body: string;
  index: number;
}

interface IStepSetProps {
  idx: number;
  text: string;
  imgUrl: string;
  steps: IStepValues[];
  setSteps: Dispatch<SetStateAction<IStepValues[]>>;
  stepImgFiles: TypeOfFileList[];
  setStepImgFiles: Dispatch<SetStateAction<TypeOfFileList[]>>;
  directDatas: IStepValues[];
  setDirectDatas: Dispatch<SetStateAction<IStepValues[]>>;
  setBooleanArr: Dispatch<SetStateAction<boolean[]>>;
  booleanArr: boolean[];
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
  createDate?: string;
  bookmarked: boolean;
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
  resTags?: TypeOfTags[] | undefined;
  setTagsDatas: Dispatch<SetStateAction<TypeOfTags[]>>;
}

interface IImgRadioProps {
  checkedCateg: string;
  setCheckedCateg: Dispatch<SetStateAction<string>>;
}

interface IRadioBtnProps extends Omit<IImgRadioProps, "checkedCateg"> {
  name: string;
  data: string;
  icon: string;
  checked: boolean;
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
  id: number;
  tagRemover: (idx: number) => void;
}

interface IRemoveBtnProps {
  removeHandler: (idx: number) => void;
  idx: number;
}

interface IPostResponceProps {
  id: number;
  title: string;
  bookmarked: boolean;
  body: string;
  imgThumbNailUrl?: string;
  category: string;
  stars: string;
  views: number;
  createDate: string;
  modifyDate: string;
  tags: ITagProps[];
  owner: IPostUserProps;
  directions: IPostDirectionsProps[];
  ingredients: IPostInGredientProps[];
}

interface IPostUserProps {
  id?: number;
  name: string;
  imgProfileUrl?: null;
}

interface IPostCategoryProps {
  category: string;
  stars: string;
  views: number;
  createDate: string;
  bookmarked: boolean;
  tags: ITagProps[];
}

interface IPostInGredientProps {
  index: number;
  name: string;
  amount: string;
  essential: boolean;
}

interface IPostDirectionsProps {
  index?: number;
  imgDirectionUrl?: string;
  body: string;
}

interface IEditResponseData {
  title: string;
  body: string;
  category: string;
  directions: IStepValues[];
  imgThumbNailUrl: string;
  ingredients: IStepValues[];
  tags: ITagProps[];
}

interface IUser {
  id: number;
  name: string;
  bio: string;
  email: string;
  imgProfileUrl: string;
}

interface IUserData {
  user: IUser;
  followerCount: number;
  followingCount: number;
  imgProfileUrl: string;
}

interface IMyRecipeData {
  recipeData: IItemProps[];
}

interface IReviewData {
  body: string;
  createDate: string;
  id: number;
}

interface IReviewProps {
  reviewData: IReviewData[];
}

interface IBookMarkProps {
  bookMarkData: IBookMarkData[];
}

interface IBookMarkData {
  id: number;
  title: string;
  imgThumbNailUrl: string;
  createDate: string;
}

interface IFollowProps {
  followData: IFollowData[];
}

interface IFollowData {
  id: number;
  name: string;
  imgProfileUrl: string;
}

interface IFollowingProps {
  followingData: IFollowData[];
}

export type {
  IThumbNailProps,
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
  IPostResponceProps,
  IPostInGredientProps,
  IPostDirectionsProps,
  IPostUserProps,
  IPostCategoryProps,
  IEditResponseData,
  IUserData,
  IMyRecipeData,
  IReviewProps,
  IBookMarkProps,
  IFollowProps,
  IFollowingProps,
};
