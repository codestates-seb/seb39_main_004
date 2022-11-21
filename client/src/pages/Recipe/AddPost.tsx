import {
  SLable,
  SLogoRecipe,
  SInput,
  STextarea,
} from "../../components/NewRecipe/RecipeFormStyled";
import {
  ThumbNailUploader,
  TagsMaker,
  Guide,
  AddingIngredients,
  StepsMaker,
  ImgRadio,
  RequireMark,
} from "../../components/NewRecipe/indexNewRecipe";
import { FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import recipeLogo from "../../assets/images/Recipe/recipeLogo.svg";
import useMessage from "../../hooks/useMessage";
import useRecipeJsonDataValidation from "../../hooks/useRecipeJsonDataValidation";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatchHook";
import { recipeActions } from "../../redux/slices/recipeSlice";
import {
  SFormBtn,
  SFormContainer,
  SSection,
  SSectionBtn,
  SFieldset,
  SRecipeInfo,
  SRecipeTexts,
} from "./style";

const AddPost = () => {
  const recipeData = useAppSelector((state) => state.recipe);
  const dispatch = useAppDispatch();
  const message = useMessage(3000);
  const navigate = useNavigate();

  // console.log("recipeData", recipeData.inputTexts);
  // 빈 값 체크
  const isJsonDataEmpty = useRecipeJsonDataValidation(recipeData.inputTexts);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    dispatch(recipeActions.setTitleOrBody({ [target.name]: target.value }));
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    /** 텍스트 누락 체크 */
    if (isJsonDataEmpty === true) {
      message.fire({
        icon: "error",
        title:
          "레시피 등록에 실패했습니다.\n 누락된 정보가 있는지 \n확인해주세요.",
      });
      return;
    }

    /** 이미지 누락 체크 */
    const emptyImageIndex = recipeData.stepImgFiles.findIndex(
      (el) => el === undefined
    );
    if (emptyImageIndex >= 0) {
      message.fire({
        icon: "error",
        title: `요리 순서의 ${emptyImageIndex + 1}번째 이미지를 \n추가해주세요`,
      });
      return;
    }
    if (!recipeData.thumbNail || recipeData.stepImgFiles.length === 0) {
      message.fire({
        icon: "error",
        title: `등록하려면 \n이미지를 추가해주세요.`,
      });
      return;
    }

    /** 서버 요청 데이터 구축 */
    dispatch(recipeActions.alignIndexNumber());
    const formData = new FormData();
    formData.append("imgThumbNail", recipeData.thumbNail);
    recipeData.stepImgFiles.forEach((file) => {
      if (file) {
        formData.append("imgDirection", file);
      }
    });
    formData.append(
      "recipe",
      new Blob([JSON.stringify(recipeData.inputTexts)], {
        type: "application/json",
      })
    );

    /** 서버 요청 */
    try {
      const response = await axios.post("/api/v1/recipe/add", formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      dispatch(recipeActions.resetInputsValue());
      const newId = response.data.data.id;
      navigate(`/post/${newId}/`);
    } catch (error) {
      message.fire({
        icon: "error",
        title:
          "레시피 등록에 실패했습니다.\n 누락된 정보가 있는지 \n확인해주세요.",
      });
    }
  };

  return (
    <SFormContainer>
      <SLogoRecipe src={recipeLogo} alt="recipeLogo"></SLogoRecipe>
      <form action="" method="post" onSubmit={submitHandler}>
        <SSection>
          <SRecipeInfo>
            <SRecipeTexts>
              <SLable htmlFor="title">
                레시피 제목
                <RequireMark />
              </SLable>
              <SInput
                name="title"
                value={recipeData.inputTexts.title}
                onChange={inputHandler}
                id="title"
                placeholder="레시피 제목을 적어주세요."
              />
              <SLable htmlFor="body">
                요리 소개
                <RequireMark />
              </SLable>
              <STextarea
                name="body"
                id="body"
                value={recipeData.inputTexts.body}
                onChange={inputHandler}
                rows={5}
                placeholder="레시피를 소개해주세요."
              ></STextarea>
            </SRecipeTexts>
            <ThumbNailUploader />
          </SRecipeInfo>
          <SFieldset>
            <SLable htmlFor="category">
              요리 카테고리
              <RequireMark />
            </SLable>
            <ImgRadio />
          </SFieldset>
        </SSection>
        <SSection color={"var(--green-bean)"}>
          <SLable htmlFor="ingredients">
            요리 재료
            <RequireMark />
            <Guide text="필수 재료는 체크표시를 해주세요." />
          </SLable>
          <AddingIngredients />
        </SSection>
        <SSection color={"var(--yellow)"}>
          <SLable>
            요리 순서
            <RequireMark />
            <Guide text="중요한 부분은 빠짐없이 적어주세요." />
          </SLable>
          <StepsMaker />
        </SSection>
        <SSection color={"var(--sky-blue)"}>
          <SLable>태그</SLable>
          <TagsMaker />
        </SSection>
        <SSectionBtn>
          <SFormBtn color={"var(--deep-green)"} type="reset">
            취소
          </SFormBtn>
          <SFormBtn type="button" onClick={submitHandler}>
            등록
          </SFormBtn>
          {/* <button >임시저장</button> */}
        </SSectionBtn>
      </form>
    </SFormContainer>
  );
};
export default AddPost;
