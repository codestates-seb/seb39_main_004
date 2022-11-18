import { StepImgUploader, RemoveBtn } from "./indexNewRecipe";
import { STextarea } from "./RecipeFormStyled";
import { IStepSetProps } from "../../types/interface";
import { useEffect, useState, ChangeEvent } from "react";
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

const StepSet = ({
  idx,
  step,
  stepImgFiles,
  setStepImgFiles,
}: IStepSetProps) => {
  const dispatch = useAppDispatch();
  const directDatas = useAppSelector(
    (state) => state.recipe.inputTexts.directions
  );

  const [imgName, setImgName] = useState<string>(""); // 삭제 예정. imgDirectionUrl로 대체
  const [inputsForm, setInputsForm] = useState({
    imgDirectionUrl: step.imgDirectionUrl,
    body: step.body,
    index: step.index,
    isUploaded: step.isUploaded,
  });
  const payload = {
    keyValue: "directions",
    indexValue: idx,
  };
  const currentIndex = directDatas.findIndex((step) => {
    return step.index === idx;
  });

  const changeTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputsForm((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const removeHandler = () => {
    dispatch(recipeActions.removeInputSection(payload));
    // 이미지파일 제거
    // const newStepImgFiles = stepImgFiles.slice();
    // newStepImgFiles.splice(currentIndex, 1);
    // setStepImgFiles(newStepImgFiles);
  };
  console.log("inputsForm", inputsForm);

  useEffect(() => {
    dispatch(
      recipeActions.changeInputsSectionValues({
        ...payload,
        newInputsValues: inputsForm,
      })
    );
    // const originData = directDatas.slice();
    // if (originData[currentIndex].imgDirectionUrl !== undefined) {
    //   originData[currentIndex].imgDirectionUrl = imgName;
    //   originData[currentIndex].isUploaded = true;
    //   // setDirectDatas(originData);
    // }
    // // 수정 없을 때
    // if (!originData[currentIndex].imgDirectionUrl) {
    //   originData[currentIndex].imgDirectionUrl = imgUrl;
    //   originData[currentIndex].isUploaded = false;
    //   // setDirectDatas(originData);
    // }
  }, [inputsForm, imgName]);

  return (
    <SStepsContainer>
      <SStepBox>
        <STextarea
          name="body"
          rows={11}
          value={inputsForm.body}
          placeholder="요리 과정을 입력해주세요."
          onChange={changeTextHandler}
        ></STextarea>
        <RemoveBtn removeHandler={removeHandler} idx={idx} />
      </SStepBox>
      <StepImgUploader
        imgName={imgName}
        currentIndex={currentIndex}
        imgUrl={inputsForm.imgDirectionUrl}
        stepImgFiles={stepImgFiles}
        setStepImgFiles={setStepImgFiles}
        setImgName={setImgName}
      ></StepImgUploader>
    </SStepsContainer>
  );
};

export default StepSet;
