import { IRecipeData } from "../types/interface";

const checkEmptyStepImage = (searchInfo: IRecipeData) => {
  const emptyStepImageIndex = searchInfo.inputTexts.directions.findIndex(
    (el) => el.imgDirectionUrl === ""
  );

  return {
    emptyStepImageSpot: emptyStepImageIndex + 1,
    isStepImageEmpty: emptyStepImageIndex >= 0 ? true : false,
  };
};
export default checkEmptyStepImage;
