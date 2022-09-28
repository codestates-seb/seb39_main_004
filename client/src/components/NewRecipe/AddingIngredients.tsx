import styled from "styled-components";
import { useState, useEffect } from "react";

const SCheckInput = styled.input`
  background-color: beige;
  border: none;
`;

const AddIngredients = () => {
  const initialArray = new Array<number>(2).fill(0);
  const [ingredients, sentIngredients] = useState<number[]>(initialArray);

  const insertHandler = () => {
    sentIngredients([...ingredients, 0]);
  };

  useEffect(() => {
    // console.log(ingredients);
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
        <button type="button" onClick={insertHandler}>
          +
        </button>
      </div>
    </>
  );
};
export default AddIngredients;
