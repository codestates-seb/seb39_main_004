import { useState, useRef, useEffect } from "react";
// import { SLable } from "./RecipeFormStyled";
import { IImgUploaderProps } from "../../types/interface";
import styled from "styled-components";
// import { RequireMark } from "./indexNewRecipe";
import defaultImg from "../../assets/images/Recipe/defaultIMG.svg";

const SImgInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SImg = styled.img`
  width: 430px;
  height: ${(props) => props.height ?? "257px"};
  object-fit: cover; // 비율 조정
  border: 2.5px solid var(--gray);
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    height: 257px;
    margin-top: 10px;
  }
`;

const SImgInput = styled.input`
  display: none;
`;

const ImgUploader = ({
  currentIndex,
  imgUrl,
  setStepImgFiles,
  stepImgFiles,
  setImgName,
  setBooleanArr,
  booleanArr,
}: IImgUploaderProps) => {
  const [fileURL, setFileURL] = useState<string>("");
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (
        currentIndex !== undefined &&
        stepImgFiles &&
        setStepImgFiles &&
        setImgName &&
        setBooleanArr &&
        booleanArr !== undefined
      ) {
        const newImgFile = stepImgFiles.slice();
        const newBooleanList = booleanArr.slice();
        newImgFile[currentIndex] = event.target.files[0];
        newBooleanList[currentIndex] = true;

        console.log("값 전체", newImgFile);
        // console.log("파일이름", event.target.files[0]);
        setStepImgFiles(newImgFile);
        setImgName(event.target.files[0].name);
        setBooleanArr(newBooleanList);
      }
      const newFileURL = URL.createObjectURL(event.target.files[0]);
      setFileURL(newFileURL);
      // console.log("event.target.files", event.target.files);
      // console.log("file", file);
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

export default ImgUploader;
