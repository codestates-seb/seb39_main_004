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
  text,
  imgUrl,
  directDatas,
  setDirectDatas,
  steps,
  setSteps,
}: IStepSetProps) => {
  const [textValue, setTextValue] = useState<string>(text ?? "");
  const [imgName, setImgName] = useState<string>("");

  const removeHandler = (idx: number) => {
    const newSteps = steps.filter((step) => {
      return step.idx !== idx;
    });
    setSteps(newSteps);
  };

  useEffect(() => {
    // console.log("턴", steps);
    // const currentIndex = steps.findIndex((step) => {
    //   return step.idx === idx;
    // });
    // // console.log(currentIndex);
    // const originData = directDatas.slice(); //[]
    // originData[currentIndex] = {
    //   index: currentIndex,
    //   imgDirectionUrl: imgName,
    //   body: textValue,
    // };
    // console.log("originData", originData);
    // setDirectDatas(originData);
  }, [textValue, imgName, steps]);

  return (
    <SStepsContainer>
      <textarea
        name="directionBody"
        cols={70}
        rows={5}
        placeholder="요리 과정을 입력해주세요."
        value={textValue}
        onChange={(event) => {
          setTextValue(event.target.value);
          const newStepsValue = steps.slice();
          const targetIdx = newStepsValue.findIndex((step) => {
            return step.idx === idx;
          });
          newStepsValue[targetIdx].body = event.target.value;
          setSteps(newStepsValue);
        }}
      ></textarea>
      <RemoveBtn removeHandler={removeHandler} idx={idx} />
      <ImgUploader
        idx={idx}
        // imgUrl={imgUrl}
        stepImgFiles={stepImgFiles}
        setStepImgFiles={setStepImgFiles}
        setImgName={setImgName}
      ></ImgUploader>
    </SStepsContainer>
  );
};
export default StepSet;
