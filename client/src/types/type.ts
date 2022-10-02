import { IStepValues } from "./interface";

type TypeOfFileList = FileList[0] | null | undefined;

type TypeOfIngredients = {
  index: number;
  name: string;
  amount: string;
  isEssential: boolean;
};

type TypeOfTags = {
  name: string;
};

type TypeOfFormData = {
  title: string;
  body: string;
  category: string;
  level: string;
  ingredients: TypeOfIngredients[];
  directions: IStepValues[];
  tags: TypeOfTags[];
};

export type { TypeOfFileList, TypeOfFormData, TypeOfIngredients, TypeOfTags };
