import styled from "styled-components";
import { useState, useEffect } from "react";

const SCheckInput = styled.input`
  background-color: beige;
  border: none;
`;

interface IngredientProp {
  ingredientName: string;
  isEssential: boolean;
  ingredientAmount: string;
}

const emptyValues = {
  ingredientName: "",
  isEssential: false,
  ingredientAmount: "",
};

const AddIngredients = () => {
  const [ingredients, sentIngredients] = useState<IngredientProp[]>([
    emptyValues,
    emptyValues,
  ]);

  const insertHandler = () => {
    sentIngredients([...ingredients, emptyValues]);
  };

  useEffect(() => {
    console.log("들어옴");
  }, [ingredients]);

  return (
    <>
      <div>
        {ingredients.map((ingredient, idx) => {
          return (
            <div key={idx}>
              <input
                type="text"
                placeholder="재료를 입력해주세요."
                name="ingredientName"
              />
              <SCheckInput type="checkbox" name="isEssential" />
              <input
                type="text"
                placeholder="양을 입력해주세요"
                name="ingredientAmount"
              />
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={insertHandler}>+</button>
      </div>
    </>
  );
};
export default AddIngredients;
