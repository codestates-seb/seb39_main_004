import ImgUploader from "./ImgUploader";
import { IStepMakerProps } from "../../ts/interface";
import { useState, useEffect } from "react";
import styled from "styled-components";

const SStepsContainer = styled.div`
  display: flex;
`;

const StepsMaker = ({ stepImgFiles, setStepImgFiles }: IStepMakerProps) => {
  const ititialSteps = new Array<number>(1).fill(0);
  const [steps, setSteps] = useState(ititialSteps);

  const addStepHandler = () => {
    setSteps([...steps, 0]);
  };

  useEffect(() => {
    // console.log(steps);
  }, [steps]);

  return (
    <>
      <div>
        {steps.map((step, idx) => {
          return (
            <SStepsContainer key={idx}>
              <textarea
                name=""
                id=""
                cols={70}
                rows={5}
                placeholder="요리 과정을 입력해주세요."
              ></textarea>
              <ImgUploader
                idx={idx}
                stepImgFiles={stepImgFiles}
                setStepImgFiles={setStepImgFiles}
              ></ImgUploader>
            </SStepsContainer>
          );
        })}
      </div>
      <button type="button" onClick={addStepHandler}>
        +
      </button>
    </>
  );
};
export default StepsMaker;
