import { ImgUploader, RemoveBtn } from "./indexNewRecipe";
import { IStepSetProps } from "../../types/interface";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SStepsContainer = styled.div`
  display: flex;
`;

const StepSet = ({
  idx,
  stepImgFiles,
  setStepImgFiles,
  stepsDatas,
  setStepsDatas,
  steps,
  setSteps,
}: IStepSetProps) => {
  const [imgName, setImgName] = useState<string | undefined>();
  const [textValue, setTextValue] = useState("");

  const removeHandler = (idx: number) => {
    // 데이터 제거 필요
    const newSteps = steps.slice();
    newSteps.splice(idx, 1);
    setSteps(newSteps);
  };
  // console.log("step 갱신", steps);

  useEffect(() => {
    const originData = stepsDatas.slice();
    originData[idx] = {
      index: idx,
      imgDirectionUrl: imgName,
      body: textValue,
    };
    setStepsDatas(originData);
  }, [textValue, imgName, steps]);

  return (
    <SStepsContainer>
      <textarea
        name="directionBody"
        cols={70}
        rows={5}
        placeholder="요리 과정을 입력해주세요."
        // value={textValue}
        onChange={(event) => {
          setTextValue(event?.target.value);
        }}
        value={textValue}
      ></textarea>
      <RemoveBtn removeHandler={removeHandler} idx={idx} />
      <ImgUploader
        idx={idx}
        stepImgFiles={stepImgFiles}
        setStepImgFiles={setStepImgFiles}
        setImgName={setImgName}
      ></ImgUploader>
    </SStepsContainer>
  );
};
export default StepSet;
