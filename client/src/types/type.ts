import { IInputStepSection, IInputIngredientSection } from "./interface";

type TypeOfFileList = FileList[0] | null | undefined;

type TypeOfInputSectionsWithRemoveButton =
  | IInputIngredientSection
  | IInputStepSection;

type TypeOfTags = {
  name: string;
};

export type { TypeOfFileList, TypeOfTags, TypeOfInputSectionsWithRemoveButton };
