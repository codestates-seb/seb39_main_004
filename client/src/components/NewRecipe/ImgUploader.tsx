import { useState, useRef, useEffect } from "react";
import { SLable } from "./RecipeFormStyled";
import { IImgUploaderProps } from "../../types/interface";
import styled from "styled-components";
import { RequireMark } from "./indexNewRecipe";
import defaultImg from "../../assets/images/Recipe/defaultIMG.svg";

const SImgInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SImg = styled.img`
  width: 430px;
  height: ${(props) => props.height ?? "252px"};
  object-fit: cover; // 비율 조정
  border: 2.5px solid var(--gray);
`;

const SImgInput = styled.input`
  display: none;
`;

const ImgUploader = ({
  currentIndex,
  imgUrl,
  setThumbNail,
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
        const newImgFile = stepImgFiles;
        newImgFile[currentIndex] = event.target.files[0];
        // console.log("값 전체", newImgFile);
        // console.log("파일이름", event.target.files[0]);
        setStepImgFiles(newImgFile);
        setImgName(event.target.files[0].name);
      }
      if (setThumbNail) {
        setThumbNail(event.target.files[0]);
      }

      const newFileURL = URL.createObjectURL(event.target.files[0]);
      setFileURL(newFileURL);
      // console.log("event.target.files", event.target.files);
      // console.log("file", file);
    }
  };

  useEffect(() => {
    if (imgUrl) {
      const imgThumbNailUrl = `${process.env.PUBLIC_URL}/${imgUrl}`;
      setFileURL(imgThumbNailUrl);
    }
  }, []);

  return (
    <SImgInputContainer>
      {currentIndex === undefined && (
        <SLable htmlFor="img">
          썸네일
          <RequireMark />
        </SLable>
      )}
      <SImg
        height={currentIndex === undefined ? "323px" : undefined}
        src={fileURL ? fileURL : defaultImg}
        alt=""
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

export default ImgUploader;
