import {
  IInputIngredientSection,
  IInputStepSection,
} from "../../../types/interface";
import { StepSet, PlusBtn } from "../indexNewRecipe";
import { useAppSelector, useAppDispatch } from "../../../hooks/dispatchHook";
import { recipeActions } from "../../../redux/slices/recipeSlice";

export const findLastIndex = (
  array: IInputStepSection[] | IInputIngredientSection[]
) => {
  const lastIndex = array.at(-1)?.index;
  return lastIndex ? lastIndex + 1 : 1;
};

const StepsMaker = () => {
  const dispatch = useAppDispatch();
  const directDatas = useAppSelector(
    (state) => state.recipe.inputTexts.directions
  );

  const addDirectionInputsHandler = () => {
    const basicForm = {
      index: findLastIndex(directDatas),
      imgDirectionUrl: "",
      body: "",
      isUploaded: false,
    };
    dispatch(
      recipeActions.addNewInputSection({
        keyValue: "directions",
        newValue: basicForm,
      })
    );
  };

  return (
    <>
      <div>
        {directDatas &&
          directDatas.map((stepData) => {
            return <StepSet key={stepData.index} stepData={stepData} />;
          })}
      </div>
      <PlusBtn addHandler={addDirectionInputsHandler} />
    </>
  );
};
export default StepsMaker;
