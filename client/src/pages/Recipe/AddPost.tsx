import {
  ImgUploader,
  TagsMaker,
  Guide,
  AddingIngredients,
  StepsMaker,
} from "../../components/NewRecipe/indexNewRecipe";
// import ImgRadio from "../../components/NewRecipe/ImgRadio";
import {
  TypeOfFileList,
  TypeOfFormData,
  TypeOfDirections,
  TypeOfIngredients,
  TypeOfTags,
} from "../../types/type";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
  const [thumbNail, setThumbNail] = useState<TypeOfFileList>();
  const [stepImgFiles, setStepImgFiles] = useState<TypeOfFileList[]>([]);
  const [stepsDatas, setStepsDatas] = useState<TypeOfDirections[]>([]);
  const [ingredientsDatas, setIngredientsDatas] = useState<TypeOfIngredients[]>(
    []
  );
  const [tagsDatas, setTagsDatas] = useState<TypeOfTags[]>([]);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<TypeOfFormData>();

  // console.log("watch", watch("title"));

  const submitHandler: SubmitHandler<TypeOfFormData> = async (data) => {
    // console.log("onSubmitData", data);
    // console.log("재료", ingredientsDatas);
    // console.log("d이미지 순서", stepImgFiles);
    // console.log("순서", stepsDatas);
    // console.log("태그", tagsDatas);

    /** 이미지 누락 체크 */
    const emptyIndex = stepImgFiles.findIndex((el) => el === undefined);
    if (emptyIndex >= 0) {
      alert(`요리 순서의 ${emptyIndex + 1} 번째 이미지를 추가해주세요`);
      return;
    }
    if (!thumbNail || stepImgFiles.length === 0) {
      alert("등록하려면 사진을 추가해주세요.");
      return;
    }

    /** 서버 요청 데이터 구축 */
    const formData = new FormData();
    formData.append("imgThumbNail", thumbNail);
    stepImgFiles.forEach((file) => {
      if (file) {
        formData.append("imgDirection", file);
      }
    });
    const recipeDatas = {
      ...data,
      category: "기타",
      ingredients: ingredientsDatas,
      directions: stepsDatas,
      tags: tagsDatas,
    };
    formData.append(
      "recipe",
      new Blob([JSON.stringify(recipeDatas)], { type: "application/json" })
    );

    /** 서버 요청 */
    try {
      const response = await axios.post("/api/v1/recipe/add", formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      console.log(response);
      // 등록된 페이지로 이동
    } catch (error) {
      console.log(error);
      console.log("이미지업로드 에러 발생");
    }
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
          <ImgUploader setThumbNail={setThumbNail} />
        </SRecipeInfo>
        <label htmlFor="category">카테고리</label>
        {/* 카테고리 영역 */}
        {/* <ImgRadio></ImgRadio> */}
        <SFieldset>
          <legend>요리재료</legend>
          <Guide text="필수 재료는 체크표시를 해주세요." />
          <AddingIngredients
            // register={register}
            setIngredientsDatas={setIngredientsDatas}
            ingredientsDatas={ingredientsDatas}
          />
        </SFieldset>
        <SFieldset>
          <legend>요리순서</legend>
          <Guide text="중요한 부분은 빠짐없이 적어주세요." />
          <StepsMaker
            stepsDatas={stepsDatas}
            setStepsDatas={setStepsDatas}
            stepImgFiles={stepImgFiles}
            setStepImgFiles={setStepImgFiles}
          />
        </SFieldset>
        <SFieldset>
          <legend>태그</legend>
          <TagsMaker setTagsDatas={setTagsDatas} />
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
