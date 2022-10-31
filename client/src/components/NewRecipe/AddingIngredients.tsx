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
  const addHandler = () => {
    const basicForm = {
      index: 1,
      name: "",
      amount: "",
      isEssential: false,
    };
    const lastInputs = ingredientsDatas.slice(-1)[0];
    if (lastInputs) {
      basicForm.index = lastInputs.index + 1;
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
      <PlusBtn addHandler={addHandler} />
    </>
  );
};
export default AddIngredients;
