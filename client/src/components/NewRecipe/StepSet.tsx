import { ImgUploader, RemoveBtn } from "./indexNewRecipe";
import { IStepSetProps } from "../../types/interface";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SStepsContainer = styled.div`
  display: flex;
`;

const StepSet = ({
  id,
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

  const removeHandler = (id: number) => {
    const newSteps = steps.filter((step) => {
      return step.id !== id;
    });
    setSteps(newSteps);
  };

  useEffect(() => {
    // console.log("directDatas", directDatas);
    // console.log("턴", steps);
    // const originData = directDatas.slice();
    // originData[idx] = {
    //   index: idx,
    //   imgDirectionUrl: imgName,
    //   body: textValue,
    // };
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
            return step.id === id;
          });
          newStepsValue[targetIdx].body = event.target.value;
          setSteps(newStepsValue);
        }}
      ></textarea>
      <RemoveBtn removeHandler={removeHandler} id={id} />
      <ImgUploader
        id={id}
        stepImgFiles={stepImgFiles}
        setStepImgFiles={setStepImgFiles}
        setImgName={setImgName}
      ></ImgUploader>
    </SStepsContainer>
  );
};
export default StepSet;
