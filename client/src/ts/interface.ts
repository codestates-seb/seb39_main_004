import { Dispatch, SetStateAction } from "react";
import { TypeOfFileList, TypeOfFormData } from "./type";
import { UseFormRegister } from "react-hook-form";

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

interface AddIngredientsProps {
  register: UseFormRegister<TypeOfFormData>;
}

export type { StepMakerProps, ResponseImgProps, AddIngredientsProps };
