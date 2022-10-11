import { IStepMakerProps } from "../../types/interface";
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
    isUploaded: false,
  };

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
