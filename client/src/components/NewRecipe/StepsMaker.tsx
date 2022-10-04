import { IStepMakerProps, IStepValues } from "../../types/interface";
import { useEffect, useState } from "react";
import { StepSet, PlusBtn } from "./indexNewRecipe";

const StepsMaker = ({
  resDirecttions,
  directDatas,
  setDirectDatas,
  stepImgFiles,
  setStepImgFiles,
}: IStepMakerProps) => {
  const basicForm = {
    index: 0,
    imgDirectionUrl: "",
    body: "",
  };
  const initialValue = resDirecttions ? resDirecttions : [basicForm];
  const [steps, setSteps] = useState<IStepValues[]>(initialValue);
  // console.log("directDatas", directDatas);
  // console.log("steps", steps);
  useEffect(() => {
    const newSteps = steps.slice();
    newSteps.forEach((steps, idx) => {
      steps.index = idx + 1;
    });
    setDirectDatas(newSteps);
  }, [steps]);

  return (
    <>
      <div>
        {steps.map((step) => {
          return (
            <StepSet
              key={step.index}
              idx={step.index}
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
            basicForm.index = lastStep.index + 1;
          }
          setSteps([...steps, basicForm]);
        }}
      />
    </>
  );
};
export default StepsMaker;
