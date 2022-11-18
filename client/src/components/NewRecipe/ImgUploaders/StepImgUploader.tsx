import { useState, useRef, useEffect } from "react";
import { IImgUploaderProps } from "../../../types/interface";
import defaultImg from "../../../assets/images/Recipe/defaultIMG.svg";
import { SImgInputContainer, SImg, SImgInput } from "./style";

const StepImgUploader = ({
  currentIndex,
  imgUrl,
  setStepImgFiles,
  stepImgFiles,
  setImgName,
}: IImgUploaderProps) => {
  const [fileURL, setFileURL] = useState<string>("");
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (
        currentIndex !== undefined &&
        stepImgFiles &&
        setStepImgFiles &&
        setImgName
      ) {
        const newImgFile = stepImgFiles.slice();
        newImgFile[currentIndex] = event.target.files[0];
        setStepImgFiles(newImgFile);
        setImgName(event.target.files[0].name);
      }
      const newFileURL = URL.createObjectURL(event.target.files[0]);
      setFileURL(newFileURL);
    }
  };

  useEffect(() => {
    if (imgUrl) {
      const newFileURL = `${process.env.PUBLIC_URL}/assets/${imgUrl}`;
      setFileURL(newFileURL);
    }
  }, []);

  return (
    <SImgInputContainer>
      <SImg
        height={currentIndex === undefined ? "277px" : undefined}
        src={fileURL ? fileURL : defaultImg}
        alt={fileURL ? fileURL.slice(8) : "undefined"}
        onClick={() => {
          if (imgUploadInput.current) {
            imgUploadInput.current.click();
          }
        }}
      ></SImg>
      <SImgInput
        type="file"
        id="img"
        accept="image/*"
        required
        ref={imgUploadInput}
        onChange={onImageChange}
      ></SImgInput>
    </SImgInputContainer>
  );
};

export default StepImgUploader;
