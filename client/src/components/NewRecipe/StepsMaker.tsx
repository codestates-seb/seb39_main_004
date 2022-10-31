import { IStepMakerProps } from "../../types/interface";
import { StepSet, PlusBtn } from "./indexNewRecipe";

const StepsMaker = ({
  directDatas,
  setDirectDatas,
  stepImgFiles,
  setStepImgFiles,
}: IStepMakerProps) => {
  const addDirectionStepHandler = () => {
    const basicForm = {
      index: 1,
      imgDirectionUrl: "",
      body: "",
      isUploaded: false,
    };
    if (directDatas.length > 0) {
      const lastStep = directDatas.slice(-1)[0].index;
      basicForm.index = lastStep + 1;
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
      <PlusBtn addHandler={addDirectionStepHandler} />
    </>
  );
};
export default StepsMaker;
