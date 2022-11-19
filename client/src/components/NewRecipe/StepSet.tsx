import { StepImgUploader, RemoveBtn } from "./indexNewRecipe";
import { STextarea } from "./RecipeFormStyled";
import { IStepSetProps } from "../../types/interface";
import { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatchHook";
import { recipeActions } from "../../redux/slices/recipeSlice";

const SStepsContainer = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-bottom: 20px;
  @media ${({ theme }) => theme.device.tablet} {
    display: block;
  }
`;

const SStepBox = styled.div`
  position: relative;
  flex: 1;
`;

const StepSet = ({ stepData }: IStepSetProps) => {
  const dispatch = useAppDispatch();
  const directionsData = useAppSelector(
    (state) => state.recipe.inputTexts.directions
  );

  const [inputText, setInputText] = useState("");
  const currentIndex = directionsData.findIndex(
    (direction) => direction.index === stepData.index
  );
  const payload = {
    keyValue: "directions",
    currentIndex,
  };

  const changeTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
    dispatch(
      recipeActions.changeStepTextInputValue({ inputText, currentIndex })
    );
  };

  const removeHandler = () => {
    dispatch(recipeActions.removeInputSection(payload));
  };

  return (
    <SStepsContainer>
      <SStepBox>
        <STextarea
          name="body"
          rows={11}
          value={inputText}
          placeholder="요리 과정을 입력해주세요."
          onChange={changeTextHandler}
        ></STextarea>
        <RemoveBtn removeHandler={removeHandler} idx={stepData.index} />
      </SStepBox>
      <StepImgUploader
        currentIndex={currentIndex}
        imgUrl={stepData.imgDirectionUrl}
      ></StepImgUploader>
    </SStepsContainer>
  );
};

export default StepSet;
