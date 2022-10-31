import { IAddIngredientsProps } from "../../types/interface";
import { IngredientsSet, PlusBtn } from "./indexNewRecipe";
import styled from "styled-components";

const SIngredientsGroups = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddIngredients = ({
  ingredientsDatas,
  setIngredientsDatas,
}: IAddIngredientsProps) => {
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
    setIngredientsDatas([...ingredientsDatas, basicForm]);
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
                ingredientsDatas={ingredientsDatas}
                setIngredientsDatas={setIngredientsDatas}
              ></IngredientsSet>
            );
          })}
      </SIngredientsGroups>
      <PlusBtn addHandler={addIngredientInputsHandler} />
    </>
  );
};
export default AddIngredients;
