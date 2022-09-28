import {
  ImgUploader,
  TagsMaker,
  Guide,
  AddingIngredients,
  StepsMaker,
} from "../../components/NewRecipe/indexNewRecipe";
// import ImgRadio from "../../components/NewRecipe/ImgRadio";
import { TypeOfFileList, TypeOfFormData } from "../../ts/type";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
// import axios from "axios";

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
  // const formData = new FormData();
  // const [formValues, setFormValues] = useState(formData);
  // const [recipeData, setRecipeData] = useState({});
  const [thumbNail, setThumbNail] = useState<TypeOfFileList>();
  const [stepImgFiles, setStepImgFiles] = useState<TypeOfFileList[]>([]);
  const {
    register,
    watch,
    handleSubmit,
    // formState: { errors },
  } = useForm<TypeOfFormData>();

  console.log("watch", watch("title"));

  const submitHandler: SubmitHandler<TypeOfFormData> = async (data) => {
    console.log("onSubmitData", typeof data);

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
      <form action="" method="post" onSubmit={handleSubmit(submitHandler)}>
        <SRecipeInfo>
          <SRecipeTexts>
            <label htmlFor="title">레시피 제목</label>
            <input
              {...register("title", { required: true })}
              id="title"
              placeholder="레시피 제목을 적어주세요."
            />
            {/* {errors.recipeTitle && <p>{errors.recipeTitle.message}</p>} */}
            <label htmlFor="body">요리 소개</label>
            <textarea
              {...register("body", { required: true })}
              id="body"
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
          <button type="button" onClick={handleSubmit(submitHandler)}>
            제출
          </button>
          <button type="reset">초기화</button>
          {/* <button >임시저장</button> */}
        </section>
      </form>
    </>
  );
};
export default AddPost;
