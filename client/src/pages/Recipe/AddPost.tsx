import {
  SubjectFillSection,
  IngredientsFillSection,
  StepFillSection,
  TagFillSection,
} from "../../components/NewRecipe/indexNewRecipe";
import { SFormBtn, SFormContainer, SButtonSection, SLogoRecipe } from "./style";
import recipeLogo from "../../assets/images/Recipe/recipeLogo.svg";

import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useMessage from "../../hooks/useMessage";
import checkEmptyStepImage from "../../hooks/checkEmptyStepImage";
import useRecipeJsonDataValidation from "../../hooks/useRecipeJsonDataValidation";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatchHook";
import { recipeActions } from "../../redux/slices/recipeSlice";

const AddPost = () => {
  const recipeData = useAppSelector((state) => state.recipe);
  const dispatch = useAppDispatch();
  const message = useMessage(3000);
  const navigate = useNavigate();

  const isJsonDataEmpty = useRecipeJsonDataValidation(recipeData.inputTexts);
  // console.log("recipeData", recipeData);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    /** 이미지 누락 체크 */
    // TODO: 이미지 용량제한, 파일형식 필요 : svg 허용x
    if (!recipeData.thumbNailFile) {
      message.fire({
        icon: "error",
        title: `등록하려면 \n썸네일이미지를 추가해주세요.`,
      });
      return;
    }
    const { emptyStepImageSpot, isStepImageEmpty } =
      checkEmptyStepImage(recipeData);
    if (isStepImageEmpty) {
      message.fire({
        icon: "error",
        title: `요리 순서의 ${emptyStepImageSpot}번째 이미지를 \n추가해주세요`,
      });
      return;
    }

    /** 텍스트 누락 체크 */
    if (isJsonDataEmpty === true) {
      message.fire({
        icon: "error",
        title: "누락된 정보가 있는지 \n확인해주세요.",
      });
      return;
    }

    /** 서버 요청 Form 데이터 구축 */
    const formData = new FormData();

    // 인덱스 재정렬
    dispatch(recipeActions.alignIndexNumber());

    // 썸네일 수정 없을 때 임의의 파일 전송
    const sendingThumbNailFile = !recipeData.thumbNailFile
      ? new File(["foo"], "foo.txt", {
          type: "text/plain",
        })
      : recipeData.thumbNailFile;
    formData.append("imgThumbNail", sendingThumbNailFile);

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
      dispatch(recipeActions.resetInputsValue());
      const response = await axios.post("/api/v1/recipe/add", formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      const newId = response.data.data.id;
      navigate(`/post/${newId}/`);
    } catch (error) {
      message.fire({
        icon: "error",
        title: "레시피 등록에 실패했습니다.",
      });
    }
  };

  useEffect(() => {
    dispatch(recipeActions.resetInputsValue());
  }, []);

  return (
    <SFormContainer>
      <SLogoRecipe src={recipeLogo} alt="recipeLogo"></SLogoRecipe>
      <form action="" method="post" onSubmit={submitHandler}>
        <SubjectFillSection />
        <IngredientsFillSection />
        <StepFillSection />
        <TagFillSection />
        <SButtonSection>
          <SFormBtn color={"var(--deep-green)"} type="reset">
            {/* TODO: 초기화 버튼 동작관련 알럿창, slice 초기화*/}
            취소
          </SFormBtn>
          <SFormBtn type="button" onClick={submitHandler}>
            등록
          </SFormBtn>
          {/* TODO: <button >임시저장</button> */}
        </SButtonSection>
      </form>
    </SFormContainer>
  );
};
export default AddPost;
