import { SLable } from "../RecipeFormStyled";
import {
  Guide,
  AddingIngredients,
  RequireMark,
} from "../../NewRecipe/indexNewRecipe";
import { SSection } from "../../../pages/Recipe/style";

const IngredientsFillSection = () => {
  return (
    <SSection color={"var(--green-bean)"}>
      <SLable htmlFor="ingredients">
        요리 재료
        <RequireMark />
        <Guide text="필수 재료는 체크표시를 해주세요." />
      </SLable>
      <AddingIngredients />
    </SSection>
  );
};
export default IngredientsFillSection;
