import ImgUploader from "./ImgUploader";
import { useState, useEffect } from "react";

const StepsMaker = () => {
  const ititialSteps = new Array<number>(1).fill(0);
  const [steps, setSteps] = useState(ititialSteps);

  const addStepHandler = () => {
    setSteps([...steps, 0]);
  };
  useEffect(() => {
    console.log(steps);
  }, [steps]);
  return (
    <>
      <div>
        {steps.map((step, idx) => {
          return (
            <div key={idx}>
              <textarea name="" id="" cols={30} rows={10}></textarea>
              <ImgUploader></ImgUploader>
            </div>
          );
        })}
      </div>
      <button onClick={addStepHandler}>+</button>
    </>
  );
};
export default StepsMaker;
