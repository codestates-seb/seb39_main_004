import {
  IStepMakerProps,
  IStepValues,
  IEditResponseData,
} from "../../types/interface";
import { useEffect, useState } from "react";
import { StepSet, PlusBtn } from "./indexNewRecipe";

const StepsMaker = ({
  directDatas,
  setDirectDatas,
  stepImgFiles,
  setStepImgFiles,
  booleanArr,
  setBooleanArr,
}: IStepMakerProps) => {
  const basicForm = {
    index: 0,
    imgDirectionUrl: "",
    body: "",
  };

  let initialValue;
  directDatas === undefined
    ? (initialValue = [basicForm])
    : (initialValue = directDatas);
  const [steps, setSteps] = useState<IStepValues[]>(initialValue);

  // const addDirectionsHander = () => {
  //   if (setEditResponse && editResponse) {
  //     const newRes = { ...editResponse };
  //     console.log("핸들러", newRes);
  //     if (newRes.directions) {
  //       const lastStepId = newRes.directions.slice(-1)[0].index;
  //       newRes.directions.push({
  //         index: lastStepId + 1,
  //         imgDirectionUrl: "",
  //         body: "",
  //       });
  //     }
  //     console.log("newRes", newRes);
  //     setEditResponse({ ...newRes });
  //   }
  // };

  //   const lastStep = steps.slice(-1)[0];
  //   if (lastStep) {
  //     basicForm.index = lastStep.index + 1;
  //   }
  //   setSteps([...steps, basicForm]);
  //   setBooleanArr([...booleanArr, false]);

  // const initialValue = resDirecttions ? resDirecttions : [basicForm];
  // console.log("directDatas", directDatas);
  // console.log("steps", steps);
  // if (editResponse && editResponse.directions) {
  //   // editResponse.directions((el) => {
  //   console.log("요소", editResponse.directions);
  //   // });
  // }

  useEffect(() => {
    // console.log("resDirecttions", editResponse);
    // if (resDirecttions) {
    //   setSteps(resDirecttions);
    // }
  }, [directDatas]);

  return (
    <>
      <div>
        {directDatas &&
          directDatas.map((step) => {
            return (
              <StepSet
                key={step.index}
                idx={step.index}
                text={step.body}
                imgUrl={step.imgDirectionUrl}
                steps={directDatas}
                setSteps={setSteps}
                stepImgFiles={stepImgFiles}
                setStepImgFiles={setStepImgFiles}
                directDatas={directDatas}
                setDirectDatas={setDirectDatas}
                booleanArr={booleanArr}
                setBooleanArr={setBooleanArr}
              />
            );
          })}
      </div>
      <PlusBtn
        addHandler={() => {
          const lastStep = directDatas.slice(-1)[0];
          if (lastStep) {
            basicForm.index = lastStep.index + 1;
          }
          setDirectDatas([...directDatas, basicForm]);
          setBooleanArr([...booleanArr, false]);
        }}
        // addHandler={addDirectionsHander}
      />
    </>
  );
};
export default StepsMaker;
