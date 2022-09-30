import { IStepMakerProps } from "../../types/interface";
import { useState } from "react";
import { StepSet, PlusBtn } from "./indexNewRecipe";

const StepsMaker = ({
  stepsDatas,
  setStepsDatas,
  stepImgFiles,
  setStepImgFiles,
}: IStepMakerProps) => {
  const ititialSteps = new Array<number>(1).fill(0);
  const [steps, setSteps] = useState(ititialSteps);

  return (
    <>
      <div>
        {steps.map((step, idx) => {
          return (
            <StepSet
              key={idx}
              idx={idx}
              stepImgFiles={stepImgFiles}
              setStepImgFiles={setStepImgFiles}
              stepsDatas={stepsDatas}
              setStepsDatas={setStepsDatas}
            />
          );
        })}
      </div>
      <PlusBtn
        addHandler={() => {
          setSteps([...steps, 0]);
        }}
      />
    </>
  );
};
export default StepsMaker;
