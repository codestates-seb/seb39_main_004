import { useState, useRef } from "react";
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
  height: 258px;
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

const ThumbNailUploader = ({
  resThumbNailImgUrl,
  setThumbNail,
}: IThumbNailProps) => {
  const [fileURL, setFileURL] = useState<string>("");
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // console.log("파일이름", event.target.files[0]);
      setThumbNail(event.target.files[0]);
      const newFileURL = URL.createObjectURL(event.target.files[0]);
      setFileURL(newFileURL);
    }
  };

  console.log("fileURL", fileURL);
  // useEffect(() => {
  //   if (resThumbNailImgUrl) {
  //     const imgThumbNailUrl = `${process.env.PUBLIC_URL}/assets/${resThumbNailImgUrl}`;
  //     setFileURL(imgThumbNailUrl);
  //   }
  // }, []);

  return (
    <SImgInputContainer>
      <SLable htmlFor="img">
        썸네일
        <RequireMark />
      </SLable>
      <SImg
        src={
          resThumbNailImgUrl
            ? `${process.env.PUBLIC_URL}/assets/${resThumbNailImgUrl}`
            : defaultImg
        }
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
