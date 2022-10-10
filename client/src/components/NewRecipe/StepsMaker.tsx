import { IStepMakerProps } from "../../types/interface";
import { useEffect } from "react";
import { StepSet, PlusBtn } from "./indexNewRecipe";

const StepsMaker = ({
  directDatas,
  setDirectDatas,
  stepImgFiles,
  setStepImgFiles,
}: IStepMakerProps) => {
  const basicForm = {
    index: 1,
    imgDirectionUrl: "",
    body: "",
    isUpdated: false,
  };

  // let initialValue;
  // directDatas === undefined
  //   ? (initialValue = [basicForm])
  //   : (initialValue = directDatas);
  // const [steps, setSteps] = useState<IStepValues[]>(initialValue);

  // console.log(steps);

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

  // const initialValue = resDirecttions ? resDirecttions : [basicForm];
  // console.log("directDatas", directDatas);
  // console.log("steps", steps);
  // if (editResponse && editResponse.directions) {
  //   // editResponse.directions((el) => {
  //   console.log("요소", editResponse.directions);
  //   // });
  // }
  const addDirectionsHander = () => {
    const lastStep = directDatas.slice(-1)[0];
    if (lastStep) {
      basicForm.index = lastStep.index + 1;
    }
    setDirectDatas([...directDatas, basicForm]);
  };

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
                stepImgFiles={stepImgFiles}
                setStepImgFiles={setStepImgFiles}
                directDatas={directDatas}
                setDirectDatas={setDirectDatas}
              />
            );
          })}
      </div>
      <PlusBtn addHandler={addDirectionsHander} />
    </>
  );
};
export default StepsMaker;
