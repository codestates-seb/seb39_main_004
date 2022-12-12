import { IngredientsSet, PlusBtn } from "../indexNewRecipe";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../../hooks/dispatchHook";
import { recipeActions } from "../../../redux/slices/recipeSlice";
import { findLastIndex } from "../Steps/StepsMaker";

const SIngredientsGroups = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddIngredients = () => {
  const ingredientsDatas = useAppSelector(
    (state) => state.recipe.inputTexts.ingredients
  );
  const dispatch = useAppDispatch();

  const addIngredientInputsHandler = () => {
    const basicForm = {
      index: findLastIndex(ingredientsDatas),
      name: "",
      amount: "",
      isEssential: false,
    };

    dispatch(
      recipeActions.addNewInputSection({
        keyValue: "ingredients",
        newValue: basicForm,
      })
    );
  };

  return (
    <>
      <SIngredientsGroups>
        {ingredientsDatas &&
          ingredientsDatas.map((ingredient) => {
            return (
              <IngredientsSet
                key={ingredient.index}
                idx={ingredient.index}
                ingredient={ingredient}
              ></IngredientsSet>
            );
          })}
      </SIngredientsGroups>
      <PlusBtn addHandler={addIngredientInputsHandler} />
    </>
  );
};
export default AddIngredients;
