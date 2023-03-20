import { useState, useRef, ChangeEvent, useEffect } from "react";
import { IStepImgUploaderProps } from "../../../types/interface";
import defaultImg from "../../../assets/images/Recipe/defaultIMG.svg";
import { SImgInputContainer, SImg, SImgInput } from "./style";
import { useAppDispatch } from "../../../hooks/dispatchHook";
import { recipeActions, makeImageURL } from "../../../redux/slices/recipeSlice";

const StepImgUploader = ({ currentIndex, imgUrl }: IStepImgUploaderProps) => {
  const dispatch = useAppDispatch();
  const [fileURL, setFileURL] = useState<string>("");
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const changeImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // URL.revokeObjectURL(fileURL);

    if (event.target.files) {
      const payload = {
        currentIndex,
        file: event.target.files[0],
      };
      dispatch(recipeActions.changeStepImageFile(payload));
      setFileURL(makeImageURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    if (!fileURL.includes(`blob:`)) {
      setFileURL(`${process.env.PUBLIC_URL}/assets/${imgUrl}`);
    }
  }, [imgUrl]);

  return (
    <SImgInputContainer>
      <SImg
        height={currentIndex === undefined ? "277px" : undefined}
        src={
          fileURL !== `${process.env.PUBLIC_URL}/assets/` ? fileURL : defaultImg
        }
        alt={fileURL?.slice(8)}
        onClick={() => {
          imgUploadInput.current?.click();
        }}
      ></SImg>
      <SImgInput
        type="file"
        id="img"
        accept="image/*"
        required
        ref={imgUploadInput}
        onChange={changeImageHandler}
      ></SImgInput>
    </SImgInputContainer>
  );
};

export default StepImgUploader;
