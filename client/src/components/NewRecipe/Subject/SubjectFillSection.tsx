import {
  SFieldset,
  SRecipeInfo,
  SRecipeTexts,
  SSection,
} from "../../../pages/Recipe/style";
import { SLable, SInput, STextarea } from "../RecipeFormStyled";
import { ThumbNailUploader, ImgRadio, RequireMark } from "../indexNewRecipe";
import { useAppSelector, useAppDispatch } from "../../../hooks/dispatchHook";
import { recipeActions } from "../../../redux/slices/recipeSlice";

const SubjectFillSection = () => {
  const dispatch = useAppDispatch();
  const recipeData = useAppSelector((state) => state.recipe.inputTexts);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    dispatch(recipeActions.setTitleOrBody({ [target.name]: target.value }));
  };

  return (
    <SSection>
      <SRecipeInfo>
        <SRecipeTexts>
          <SLable htmlFor="title">
            레시피 제목
            <RequireMark />
          </SLable>
          <SInput
            name="title"
            value={recipeData.title}
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
            value={recipeData.body}
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
  );
};
export default SubjectFillSection;
