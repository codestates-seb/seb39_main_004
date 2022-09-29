import { Dispatch, SetStateAction } from "react";
import { TypeOfFileList } from "./type";

interface StepMakerProps {
  idx?: number;
  setThumbNail?: Dispatch<SetStateAction<TypeOfFileList>>;
  stepImgFiles?: TypeOfFileList[];
  setStepImgFiles?: Dispatch<SetStateAction<TypeOfFileList[]>>;
  clickEvent?: (orderValue: string) => Promise<void> | void;
}

interface ResponseImgProps {
  contentType?: string;
  createData?: string;
  fileName: string;
  fileSize?: number;
  id: number;
  modDate?: string;
  originFileName?: string;
}

interface ItemProps {
  id: number;
  title: string;
  imgThumbNailUrl: string;
  stars: string;
  tags: TagProps[];
}

interface SearchDataProps {
  searchData?: ItemProps[];
  setSearchSortBy?: React.Dispatch<React.SetStateAction<string>>;
}

interface TagProps {
  id?: number;
  name: string;
}

export type {
  StepMakerProps,
  ResponseImgProps,
  ItemProps,
  TagProps,
  SearchDataProps,
};
