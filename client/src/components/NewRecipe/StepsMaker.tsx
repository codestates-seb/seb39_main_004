import { IStepMakerProps } from "../../ts/interface";
import { useState } from "react";
import { StepSet } from "./indexNewRecipe";

const StepsMaker = ({
  stepsDatas,
  setStepsDatas,
  stepImgFiles,
  setStepImgFiles,
}: IStepMakerProps) => {
  const ititialSteps = new Array<number>(1).fill(0);
  const [steps, setSteps] = useState(ititialSteps);

  const addStepHandler = () => {
    setSteps([...steps, 0]);
  };

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
      <button type="button" onClick={addStepHandler}>
        +
      </button>
    </>
  );
};
export default StepsMaker;
