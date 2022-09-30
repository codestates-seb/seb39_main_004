import styled from "styled-components";
import { useEffect, useState } from "react";
import { IIngredientSetProps } from "../../types/interface";
import RemoveBtn from "./buttons/RemoveBtn";

const SIngredientContainer = styled.li`
  display: flex;
`;
const SCheckInput = styled.input`
  background-color: beige;
  border: none;
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
      <input
        placeholder="재료를 입력해주세요."
        name="ingredientName"
        required
        value={nameValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setNameValue(event.target.value);
        }}
      />
      <RemoveBtn removeHandler={removeHandler} />
      <input
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
    </SIngredientContainer>
  );
};
export default IngredientsSet;
