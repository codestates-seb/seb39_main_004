/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";
import { TypeOfFileList, TypeOfFormData, TypeOfIngredients } from "./type";
import { UseFormRegister } from "react-hook-form";

interface IThumbNailProps {
  isMypage?: boolean;
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
}

interface IStepMakerProps {
  // setEditResponse?: Dispatch<SetStateAction<IEditResponseData | undefined>>;
  // editResponse?: IEditResponseData | undefined;
  directDatas: IStepValues[];
  setDirectDatas: Dispatch<SetStateAction<IStepValues[]>>;
  stepImgFiles: TypeOfFileList[];
  setStepImgFiles: Dispatch<SetStateAction<TypeOfFileList[]>>;
  // clickEvent?: (orderValue: string) => Promise<void> | void;
}

interface IStepSetProps {
  idx: number;
  text: string;
  imgUrl: string;
  steps: IStepValues[];
  stepImgFiles: TypeOfFileList[];
  setStepImgFiles: Dispatch<SetStateAction<TypeOfFileList[]>>;
  directDatas: IStepValues[];
  setDirectDatas: Dispatch<SetStateAction<IStepValues[]>>;
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
  createDate: string;
  bookmarked: boolean;
  reviewCount: number;
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

interface IIngredientSetProps {
  idx: number;
  ingredient: TypeOfIngredients;
  ingredientsDatas: TypeOfIngredients[];
  setIngredientsDatas: Dispatch<SetStateAction<TypeOfIngredients[]>>;
}

interface ITagsData {
  id?: number;
  name: string;
}

interface ITagsMakerProps {
  tagsDatas: ITagsData[];
  setTagsDatas: Dispatch<SetStateAction<ITagsData[]>>;
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
  userId: number;
  name: string;
  imgProfileUrl?: null;
  followed: boolean;
}

interface IPostCategoryProps {
  category: string;
  stars: string;
  views: number;
  createDate: string;
  bookmarked: boolean;
  tags: ITagProps[];
}

interface IPostDirectionsProps {
  index?: number;
  imgDirectionUrl?: string;
  body: string;
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
  stars: number;
  recipeId: number;
  recipeTitle: string;
  recipeImgThumbNail: string;
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
  ownerNickName: string;
  imgThumbNailUrl: string;
  createDate: string;
  tags: ITagProps[];
}

interface IFollowProps {
  followData: IFollowData[];
}

interface IFollowData {
  id: number;
  name: string;
  imgProfileUrl: string;
  userId: number;
}

interface IFollowingProps {
  followingData: IFollowData[];
  setFollowingData: React.Dispatch<React.SetStateAction<any[]>>;
}

interface IStarProps {
  starClicked?: boolean[];
  setStarClicked?: React.Dispatch<React.SetStateAction<boolean[]>>;
}

// ----------------- Recipe 등록 수정 관련 interface -----------------
interface IRecipeData {
  inputTexts: IEditResponseData;
  thumbNail: TypeOfFileList;
  stepImgFiles: TypeOfFileList | [];
}

interface IEditResponseData {
  title: string;
  body: string;
  imgThumbNailUrl: string;
  category: string;
  ingredients: IPostInGredientProps[];
  directions: IStepValues[];
  tags: ITagProps[];
}

interface IStepValues {
  imgDirectionUrl: string;
  body: string;
  index: number;
  isUploaded: boolean;
}

interface IPostInGredientProps {
  index: number;
  name: string;
  amount: string;
  isEssential: boolean;
}

// 삭제예정
interface IRecipeTemp {
  body: string;
  title: string;
}

export type {
  IThumbNailProps,
  IImgUploaderProps,
  IStepMakerProps,
  IResponseImgProps,
  IAddIngredientsProps,
  IIngredientSetProps,
  IStepSetProps,
  ITagsData,
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
  IStarProps,
  IRecipeData,
  IRecipeTemp, // 삭제예정
};
