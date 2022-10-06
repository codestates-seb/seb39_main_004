import styled from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import { IIngredientSetProps } from "../../types/interface";
import { RemoveBtn } from "./indexNewRecipe";
import { SInput } from "./RecipeFormStyled";

const SIngredientContainer = styled.li`
  display: grid;
  grid-template-columns: 3.3fr 2fr;
  column-gap: 2.5rem;
  margin-bottom: 20px;
  @media ${({ theme }) => theme.device.tablet} {
    display: block;
  }
`;
const SCheckInput = styled.input`
  transform: scale(1.8);
  position: absolute;
  right: 25px;
  top: 25px;
  background-color: beige;
  border: none;
`;

const SIngredientName = styled.div`
  position: relative;
  @media ${({ theme }) => theme.device.tablet} {
    margin-bottom: 5px;
  }
`;

const SIngredientAmout = styled.div`
  position: relative;
`;

const IngredientsSet = ({
  idx,
  ingredient,
  ingredientsDatas,
  setIngredientsDatas,
}: IIngredientSetProps) => {
  const currentIndex = ingredientsDatas.findIndex((el) => el.index === idx);
  const [inputs, setInputs] = useState({
    index: ingredient.index,
    name: ingredient.name,
    essential: ingredient.essential,
    amount: ingredient.amount,
  });

  const removeHandler = () => {
    setIngredientsDatas(ingredientsDatas.filter((el) => el.index !== idx));
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      setInputs({ ...inputs, essential: e.target.checked });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    const originData = ingredientsDatas.slice();
    originData[currentIndex] = inputs;
    setIngredientsDatas(originData);
  }, [inputs]);

  return (
    <SIngredientContainer>
      <SIngredientName>
        <SInput
          placeholder="재료를 입력해주세요."
          name="name"
          required
          value={inputs.name}
          onChange={(e) => {
            inputHandler(e);
          }}
        />
        <RemoveBtn removeHandler={removeHandler} idx={idx} />
      </SIngredientName>
      <SIngredientAmout>
        <SInput
          placeholder="양을 입력해주세요"
          name="amount"
          required
          value={inputs.amount}
          onChange={(e) => {
            inputHandler(e);
          }}
        />
        <SCheckInput
          type="checkbox"
          name="essential"
          defaultChecked={inputs.essential}
          onChange={(e) => {
            inputHandler(e);
          }}
        />
      </SIngredientAmout>
    </SIngredientContainer>
  );
};
export default IngredientsSet;
