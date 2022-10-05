import styled from "styled-components";
import { useEffect, useState } from "react";
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
  position: absolute;
  right: 10px;
  top: 18px;
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
  setIngredientsDatas,
  idx,
  ingredientsDatas,
}: IIngredientSetProps) => {
  const [nameValue, setNameValue] = useState("");
  const [isEssential, setIsEssential] = useState(false);
  const [amount, setAmonut] = useState("");

  const removeHandler = () => {
    console.log("IngredientsSet제거 idx", idx);
  };

  useEffect(() => {
    const originData = ingredientsDatas;
    originData[idx] = {
      index: idx,
      name: nameValue,
      amount,
      isEssential,
    };
    setIngredientsDatas(originData);
  }, [nameValue, isEssential, amount]);

  return (
    <SIngredientContainer>
      <SIngredientName>
        <SInput
          placeholder="재료를 입력해주세요."
          name="ingredientName"
          required
          value={nameValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNameValue(event.target.value);
          }}
        />
        <RemoveBtn removeHandler={removeHandler} idx={idx} />
      </SIngredientName>
      <SIngredientAmout>
        <SInput
          placeholder="양을 입력해주세요"
          name="ingredientAmount"
          required
          value={amount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAmonut(event.target.value);
          }}
        />
        <SCheckInput
          type="checkbox"
          // checked={isEssential}
          name="isEssential"
          onChange={() => {
            setIsEssential(!isEssential);
          }}
        />
      </SIngredientAmout>
    </SIngredientContainer>
  );
};
export default IngredientsSet;
