import { ImgUploader, RemoveBtn } from "./indexNewRecipe";
import { STextarea } from "./RecipeFormStyled";
import { IStepSetProps } from "../../types/interface";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SStepsContainer = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-bottom: 20px;
`;

const SStepBox = styled.div`
  position: relative;
  flex: 1;
`;

const StepSet = ({
  idx,
  stepImgFiles,
  setStepImgFiles,
  text,
  imgUrl,
  directDatas,
  setDirectDatas,
  steps,
  setSteps,
  booleanArr,
  setBooleanArr,
}: IStepSetProps) => {
  const [textValue, setTextValue] = useState<string>(text ?? "");
  const [imgName, setImgName] = useState<string>("");
  const currentIndex = steps.findIndex((step) => {
    return step.index === idx;
  });

  const textHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    currentIndex: number
  ) => {
    setTextValue(event.target.value);
    const newStepsValue = steps.slice();
    newStepsValue[currentIndex].body = event.target.value;
    setSteps(newStepsValue);
  };

  const removeHandler = (currentIndex: number) => {
    const newSteps = steps.slice();
    newSteps.splice(currentIndex, 1);
    setSteps(newSteps);
    // 이미지파일 제거
    const newStepImgFiles = stepImgFiles.slice();
    newStepImgFiles.splice(currentIndex, 1);
    setStepImgFiles(newStepImgFiles);
  };
  console.log(stepImgFiles);

  useEffect(() => {
    const originData = steps.slice();
    // console.log("originData", originData);
    if (originData[currentIndex].imgDirectionUrl !== undefined) {
      originData[currentIndex].imgDirectionUrl = imgName;
      setSteps(originData);
    }
  }, [textValue, imgName]);

  // console.log("directDatas", directDatas); // 빌드에러용 임시 추가
  // console.log("setDirectDatas", setDirectDatas); // 빌드에러용 임시 추가

  return (
    <SStepsContainer>
      <SStepBox>
        <STextarea
          name="directionBody"
          // cols={70}
          rows={8}
          placeholder="요리 과정을 입력해주세요."
          value={textValue}
          onChange={(e) => {
            textHandler(e, currentIndex);
          }}
        ></STextarea>
        <RemoveBtn
          removeHandler={() => removeHandler(currentIndex)}
          idx={idx}
        />
      </SStepBox>
      <ImgUploader
        steps={steps}
        imgName={imgName}
        currentIndex={currentIndex}
        imgUrl={imgUrl}
        stepImgFiles={stepImgFiles}
        setStepImgFiles={setStepImgFiles}
        setImgName={setImgName}
        booleanArr={booleanArr}
        setBooleanArr={setBooleanArr}
      ></ImgUploader>
    </SStepsContainer>
  );
};
export default StepSet;
