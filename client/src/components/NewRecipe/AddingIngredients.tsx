import { useState } from "react";
import { IAddIngredientsProps } from "../../ts/interface";
import { IngredientsSet } from "./indexNewRecipe";
import styled from "styled-components";

const SIngredientsGroups = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddIngredients = ({
  setIngredientsDatas,
  ingredientsDatas,
}: IAddIngredientsProps) => {
  const initialArray = new Array<number>(2).fill(0);
  const [ingrediStage, setIngrediStage] = useState<number[]>(initialArray);

  return (
    <>
      <SIngredientsGroups>
        {ingrediStage.map((ingredient, idx) => {
          return (
            <IngredientsSet
              key={idx}
              idx={idx}
              ingredientsDatas={ingredientsDatas}
              setIngredientsDatas={setIngredientsDatas}
            ></IngredientsSet>
          );
        })}
      </SIngredientsGroups>
      <div>
        <button
          type="button"
          onClick={() => {
            setIngrediStage([...ingrediStage, 0]);
          }}
        >
          +
        </button>
      </div>
    </>
  );
};
export default AddIngredients;
