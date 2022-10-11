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

const SUserImg = styled.img`
  display: inline-block;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  background-color: var(--pale-gray);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100px;
    height: 100px;
  }
`;

const SImg = styled.img`
  width: 430px;
  height: 275px;
  object-fit: cover; // 비율 조정
  border: 2.5px solid var(--gray);
  @media ${({ theme }) => theme.device.desktop} {
    height: 260px;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

const SImgInput = styled.input`
  display: none;
`;

const ThumbNailUploader = ({
  isMypage,
  resThumbNailImgUrl,
  setThumbNail,
}: IThumbNailProps) => {
  const [fileURL, setFileURL] = useState<string | undefined>(
    `${process.env.PUBLIC_URL}/assets/${resThumbNailImgUrl}`
  );
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setThumbNail(event.target.files[0]);
      const newFileURL = URL.createObjectURL(event.target.files[0]);
      setFileURL(newFileURL);
    }
  };

  return (
    <SImgInputContainer>
      {isMypage ? (
        <SUserImg
          src={
            fileURL !== `${process.env.PUBLIC_URL}/assets/${undefined}`
              ? fileURL
              : `${process.env.PUBLIC_URL}/assets/${resThumbNailImgUrl}`
          }
          onClick={() => {
            if (imgUploadInput.current) {
              imgUploadInput.current.click();
            }
          }}
        ></SUserImg>
      ) : (
        <>
          <SLable htmlFor="img">
            썸네일
            <RequireMark />
          </SLable>
          <SImg
            src={
              fileURL !== `${process.env.PUBLIC_URL}/assets/${undefined}`
                ? fileURL
                : defaultImg
            }
            alt={fileURL ? fileURL.slice(8) : "undefined"}
            onClick={() => {
              if (imgUploadInput.current) {
                imgUploadInput.current.click();
              }
            }}
          ></SImg>
        </>
      )}

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
