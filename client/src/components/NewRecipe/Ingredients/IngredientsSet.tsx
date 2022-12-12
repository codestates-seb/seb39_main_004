import styled from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import {
  IIngredientSetProps,
  IInputIngredientSection,
} from "../../../types/interface";
import { RemoveBtn } from "../indexNewRecipe";
import { SInput } from "../RecipeFormStyled";
import { useAppDispatch, useAppSelector } from "../../../hooks/dispatchHook";
import { recipeActions } from "../../../redux/slices/recipeSlice";

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
  top: 18px;
  background-color: beige;
  border: none;
  @media ${({ theme }) => theme.device.tablet} {
    transform: scale(1.3);
    right: 15px;
  }
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

const IngredientsSet = ({ idx, ingredient }: IIngredientSetProps) => {
  const dispatch = useAppDispatch();
  const ingredientsDatas = useAppSelector(
    (state) => state.recipe.inputTexts.ingredients
  );
  const [inputsForm, setInputsForm] = useState({
    index: 1,
    name: "",
    amount: "",
    isEssential: false,
  });

  const currentIndex = ingredientsDatas.findIndex(
    (el: IInputIngredientSection) => el.index === idx
  );

  const removeIngredientInputsHandler = () => {
    const payload = {
      keyValue: "ingredients",
      currentIndex,
    };
    dispatch(recipeActions.removeInputSection(payload));
  };

  const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const changedValue = {
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    setInputsForm((prevState) => {
      return {
        ...prevState,
        ...changedValue,
      };
    });
  };

  const blurInputValueHanler = () => {
    dispatch(
      recipeActions.changeIngredientSectionValues({
        currentIndex,
        changedSectionValues: inputsForm,
      })
    );
  };

  useEffect(() => {
    setInputsForm({
      index: ingredient.index,
      name: ingredient.name,
      amount: ingredient.amount,
      isEssential: ingredient.isEssential,
    });
  }, [ingredient]);

  return (
    <SIngredientContainer>
      <SIngredientName>
        <SInput
          placeholder="재료를 입력해주세요."
          name="name"
          required
          value={inputsForm.name}
          onChange={changeInputValueHandler}
          onBlur={blurInputValueHanler}
        />
        <RemoveBtn removeHandler={removeIngredientInputsHandler} idx={idx} />
      </SIngredientName>
      <SIngredientAmout>
        <SInput
          placeholder="양을 입력해주세요"
          name="amount"
          required
          value={inputsForm.amount}
          onChange={changeInputValueHandler}
          onBlur={blurInputValueHanler}
        />
        <SCheckInput
          type="checkbox"
          name="isEssential"
          checked={inputsForm.isEssential}
          onChange={changeInputValueHandler}
          onBlur={blurInputValueHanler}
        />
      </SIngredientAmout>
    </SIngredientContainer>
  );
};
export default IngredientsSet;
