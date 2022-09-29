type TypeOfFileList = FileList[0] | null | undefined;

type TypeOfIngredients = {
  index: number;
  name: string;
  amount: string;
  isEssential: boolean;
};

type TypeOfDirections = {
  index: number;
  fileName?: string;
  body: string;
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
  directions: TypeOfDirections[];
  tags: TypeOfTags[];
};

export type {
  TypeOfFileList,
  TypeOfFormData,
  TypeOfIngredients,
  TypeOfDirections,
  TypeOfTags,
};
