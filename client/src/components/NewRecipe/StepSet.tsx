import { ImgUploader } from "./indexNewRecipe";
import { IStepSetProps } from "../../types/interface";
// import { TypeOfFormData } from "../../ts/type";
import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
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
}: IStepSetProps) => {
  const [imgName, setImgName] = useState<string | undefined>();
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    const originData = stepsDatas;
    originData[idx] = {
      index: idx,
      imgDirectionUrl: imgName,
      body: textValue,
    };
    setStepsDatas(originData);
  }, [textValue, imgName]);

  return (
    <SStepsContainer>
      <textarea
        name="directionBody"
        cols={70}
        rows={5}
        placeholder="요리 과정을 입력해주세요."
        // value={textValue}
        onChange={(event) => {
          // console.log("순서텍스트", event.target.value);
          setTextValue(event?.target.value);
        }}
      ></textarea>
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
