import { Dispatch, SetStateAction } from "react";
import { TypeOfFileList } from "./type";

interface StepMakerProps {
  idx?: number;
  setStepImgFiles: Dispatch<SetStateAction<TypeOfFileList[]>>;
  stepImgFiles: TypeOfFileList[];
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

export type { StepMakerProps, ResponseImgProps };
