import { IStepMakerProps, IStepValues } from "../../types/interface";
import { useState } from "react";
import { StepSet, PlusBtn } from "./indexNewRecipe";

const StepsMaker = ({
  directDatas,
  setDirectDatas,
  stepImgFiles,
  setStepImgFiles,
}: IStepMakerProps) => {
  const initialValue = {
    idx: 0,
    imgDirectionUrl: "",
    body: "",
  };

  const [steps, setSteps] = useState<IStepValues[]>([initialValue]);

  return (
    <>
      <div>
        {steps.map((step) => {
          return (
            <StepSet
              key={step.idx}
              idx={step.idx}
              text={step.body}
              imgUrl={step.imgDirectionUrl}
              steps={steps}
              setSteps={setSteps}
              stepImgFiles={stepImgFiles}
              setStepImgFiles={setStepImgFiles}
              directDatas={directDatas}
              setDirectDatas={setDirectDatas}
            />
          );
        })}
      </div>
      <PlusBtn
        addHandler={() => {
          const lastStep = steps.slice(-1)[0];
          if (lastStep) {
            initialValue.idx = lastStep.idx + 1;
          }
          setSteps([...steps, initialValue]);
        }}
      />
    </>
  );
};
export default StepsMaker;
