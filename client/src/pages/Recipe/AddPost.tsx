import {
  SubjectFillSection,
  IngredientsFillSection,
  StepFillSection,
  TagFillSection,
} from "../../components/NewRecipe/indexNewRecipe";
import { SFormBtn, SFormContainer, SButtonSection, SLogoRecipe } from "./style";
import recipeLogo from "../../assets/images/Recipe/recipeLogo.svg";

import { FormEvent, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useMessage from "../../hooks/useMessage";
import useRecipeJsonDataValidation from "../../hooks/useRecipeJsonDataValidation";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatchHook";
import {
  recipeActions,
  fetchRecipeEditData,
} from "../../redux/slices/recipeSlice";

const AddPost = () => {
  const recipeData = useAppSelector((state) => state.recipe);
  const dispatch = useAppDispatch();
  const message = useMessage(3000);
  const navigate = useNavigate();

  const { recipeId } = useParams();
  const requestUrl = recipeId
    ? `/api/v1/recipe/${recipeId}/edit`
    : "/api/v1/recipe/add";

  // console.log("recipeData", recipeData);

  // 빈 값 체크
  const isJsonDataEmpty = useRecipeJsonDataValidation(recipeData.inputTexts);

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
    // 이미지 배열의 길이와 이미지 파일의 길이 체크 필요
    // 이미지 용량제한, 파일형식 필요 : svg 허용x
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
    if (!recipeId && !recipeData.thumbNailFile) {
      message.fire({
        icon: "error",
        title: `등록하려면 \n썸네일이미지를 추가해주세요.`,
      });
      return;
    }

    /** 서버 요청 Form 데이터 구축 */
    dispatch(recipeActions.alignIndexNumber());
    const formData = new FormData();
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
      const response = await axios.post(requestUrl, formData, {
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

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipeEditData(recipeId));
    } else {
      dispatch(recipeActions.resetInputsValue());
    }
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
            취소
          </SFormBtn>
          <SFormBtn type="button" onClick={submitHandler}>
            등록
          </SFormBtn>
          {/* <button >임시저장</button> */}
        </SButtonSection>
      </form>
    </SFormContainer>
  );
};
export default AddPost;
