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
import { useAppDispatch, useAppSelector } from "../../../hooks/dispatchHook";

export const makeImageURL = (file: FileList[0]) => {
  const newFileURL = URL.createObjectURL(file);
  return newFileURL;
};

const ThumbNailUploader = ({
  isMypage,
  setProfileImageFile,
  resThumbNailImgUrl,
}: IThumbNailProps) => {
  const dispatch = useAppDispatch();
  if (!isMypage) {
    resThumbNailImgUrl = useAppSelector(
      (state) => state.recipe.imgThumbNailUrl
    );
  }
  const [fileURL, setFileURL] = useState<string>(
    `${process.env.PUBLIC_URL}/assets/${resThumbNailImgUrl}`
  );
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const changeToInputElement = () => {
    imgUploadInput.current?.click();
  };

  const changeImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileObject = event.target.files[0];
      isMypage && setProfileImageFile
        ? setProfileImageFile(fileObject)
        : dispatch(recipeActions.setThumbNailFile(fileObject));
      setFileURL(makeImageURL(fileObject));
    }
  };

  return (
    <SImgInputContainer>
      {isMypage ? (
        <SUserImg
          src={
            fileURL !== `${process.env.PUBLIC_URL}/assets/${""}`
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
            alt={fileURL?.slice(8)}
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
