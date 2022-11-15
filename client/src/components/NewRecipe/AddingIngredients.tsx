import { IngredientsSet, PlusBtn } from "./indexNewRecipe";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatchHook";
import { recipeActions } from "../../redux/slices/recipeSlice";

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
      index: 1,
      name: "",
      amount: "",
      isEssential: false,
    };

    if (ingredientsDatas.length > 0) {
      const lastInputsIndex = ingredientsDatas.slice(-1)[0].index;
      basicForm.index = lastInputsIndex + 1;
    }
    dispatch(recipeActions.addIngredientInputSection(basicForm));
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
