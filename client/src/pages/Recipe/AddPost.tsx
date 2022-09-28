import ImgUploader from "../../components/NewRecipe/ImgUploader";
import TagsMaker from "../../components/NewRecipe/TagsMaker";
import Guide from "../../components/NewRecipe/Guide";
import AddingIngredients from "../../components/NewRecipe/AddingIngredients";
import StepsMaker from "../../components/NewRecipe/StepsMaker";
// import ImgRadio from "../../components/NewRecipe/ImgRadio";
import { TypeOfFileList } from "../../ts/type";
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const SFieldset = styled.fieldset`
  border: 1px solid blue;
  padding: 20px;
`;

const SRecipeInfo = styled.div`
  display: flex;
`;

const SRecipeTexts = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddPost = () => {
  const formData = new FormData();
  const [formValues, setFormValues] = useState(formData);
  const [thumbNail, setThumbNail] = useState<TypeOfFileList>();
  const [stepImgFiles, setStepImgFiles] = useState<TypeOfFileList[]>([]);

  // const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setStepImgFiles(event.target.files);

  //     const newFileURL = URL.createObjectURL(event.target.files[0]);
  //     // setStepImgFilesURL(newFileURL);
  //     // console.log("event.target.files", event.target.files);
  //     // console.log("file", file);
  //   }
  // };

  const submitHandler = async (event: React.MouseEvent) => {
    event.preventDefault();

    console.log(thumbNail);
    console.log(stepImgFiles.length);
    console.log("파일", stepImgFiles);

    const emptyIndex = stepImgFiles.findIndex((el) => el === undefined);
    if (emptyIndex >= 0) {
      alert(`요리 순서의 ${emptyIndex + 1} 번째 이미지를 추가해주세요`);
      return;
    }
    if (!thumbNail || stepImgFiles.length === 0) {
      alert("등록하려면 사진을 추가해주세요.");
      return;
    }

    /** 서버통신 */
    // const formData = new FormData();

    // if (file) {
    //   formData.append("file", file[0]);
    //   console.log(...formData); // 데이터 확인용

    //   try {
    //     const response = await axios.post("/api/upload", formData, {
    //       headers: { "content-type": "multipart/form-data" },
    //     });
    //     console.log(response);
    //     // 상위 컴포넌트 마크업 작업 후 처리하겠습니다.(이미지 )
    //   } catch (error) {
    //     console.log("이미지업로드 에러 발생");
    //   }
    // } else {
    //   alert("업로드할 이미지가 없습니다");
    // }
  };

  return (
    <>
      <form action="" method="post">
        <SRecipeInfo>
          <SRecipeTexts>
            <label htmlFor="title">레시피 제목</label>
            <input
              name="recipeTitle"
              id="title"
              placeholder="레시피 제목을 적어주세요."
              required
            />
            <label htmlFor="recipeInfo">요리 소개</label>
            <textarea
              name="recipeInfo"
              id="recipeInfo"
              cols={50}
              rows={7}
            ></textarea>
          </SRecipeTexts>
          <ImgUploader setThumbNail={setThumbNail}></ImgUploader>
        </SRecipeInfo>
        <label htmlFor="category">카테고리</label>
        {/* 카테고리 영역 */}
        {/* <ImgRadio></ImgRadio> */}
        <SFieldset>
          <legend>요리재료</legend>
          <Guide text="필수 재료는 체크표시를 해주세요." />
          <AddingIngredients />
        </SFieldset>
        <SFieldset>
          <legend>요리순서</legend>
          <Guide text="중요한 부분은 빠짐없이 적어주세요." />
          <StepsMaker
            stepImgFiles={stepImgFiles}
            setStepImgFiles={setStepImgFiles}
          />
        </SFieldset>
        <SFieldset>
          <legend>태그</legend>
          <TagsMaker></TagsMaker>
        </SFieldset>
        <section className="btnContainer">
          <input type="submit" onClick={submitHandler}></input>
          <input type="reset"></input>
          {/* <button >임시저장</button> */}
        </section>
      </form>
    </>
  );
};
export default AddPost;
