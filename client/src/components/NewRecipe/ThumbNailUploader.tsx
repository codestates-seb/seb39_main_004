import { useState, useRef, useEffect } from "react";
import { SLable } from "./RecipeFormStyled";
import { IThumbNailProps } from "../../types/interface";
import styled from "styled-components";
import { RequireMark } from "./indexNewRecipe";
import defaultImg from "../../assets/images/Recipe/defaultIMG.svg";

const SImgInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SImg = styled.img`
  width: 430px;
  height: 252px;
  object-fit: cover; // 비율 조정
  border: 2.5px solid var(--gray);
`;

const SImgInput = styled.input`
  display: none;
`;

const ThumbNailUploader = ({
  resThumbNailImgUrl,
  setThumbNail,
}: IThumbNailProps) => {
  const [fileURL, setFileURL] = useState<string>("");
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log("파일이름", event.target.files[0]);
      setThumbNail(event.target.files[0]);
      const newFileURL = URL.createObjectURL(event.target.files[0]);
      setFileURL(newFileURL);
    }
  };

  useEffect(() => {
    if (resThumbNailImgUrl) {
      const imgThumbNailUrl = `${process.env.PUBLIC_URL}/${resThumbNailImgUrl}`;
      setFileURL(imgThumbNailUrl);
    }
  }, []);

  return (
    <SImgInputContainer>
      <SLable htmlFor="img">
        썸네일
        <RequireMark />
      </SLable>
      <SImg
        src={fileURL ? fileURL : resThumbNailImgUrl ?? defaultImg}
        alt={resThumbNailImgUrl}
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

export default ThumbNailUploader;
