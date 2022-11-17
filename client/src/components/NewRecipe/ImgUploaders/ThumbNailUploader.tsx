import { useState, useRef, ChangeEvent } from "react";
import { IThumbNailProps } from "../../../types/interface";
import defaultImg from "../../../assets/images/Recipe/defaultIMG.svg";
import { RequireMark } from "../indexNewRecipe";
import { SLable } from "../RecipeFormStyled";
import {
  SImgInputContainer,
  SImgInput,
  SUserImg,
  SThumbNailImg,
} from "./style";
import { recipeActions } from "../../../redux/slices/recipeSlice";
import { useAppDispatch } from "../../../hooks/dispatchHook";

const ThumbNailUploader = ({
  isMypage,
  setProfileImageFile,
  resThumbNailImgUrl,
}: IThumbNailProps) => {
  const dispatch = useAppDispatch();

  const [fileURL, setFileURL] = useState<string | undefined>(
    `${process.env.PUBLIC_URL}/assets/${resThumbNailImgUrl}`
  );
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const changeToInputElement = () => {
    if (imgUploadInput.current) {
      imgUploadInput.current.click();
    }
  };

  const makeImagePreView = (file: FileList[0]) => {
    const newFileURL = URL.createObjectURL(file);
    setFileURL(newFileURL);
  };

  const changeImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileObject = event.target.files[0];
      isMypage && setProfileImageFile
        ? setProfileImageFile(fileObject)
        : dispatch(recipeActions.setThumbNailFile(fileObject));
      makeImagePreView(fileObject);
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
          onClick={changeToInputElement}
        ></SUserImg>
      ) : (
        <>
          <SLable htmlFor="img">
            썸네일
            <RequireMark />
          </SLable>
          <SThumbNailImg
            src={
              fileURL !== `${process.env.PUBLIC_URL}/assets/${undefined}`
                ? fileURL
                : defaultImg
            }
            alt={fileURL ? fileURL.slice(8) : "undefined"}
            onClick={changeToInputElement}
          ></SThumbNailImg>
        </>
      )}

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

export default ThumbNailUploader;
