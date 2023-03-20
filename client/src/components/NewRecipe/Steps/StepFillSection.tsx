import { Guide, StepsMaker, RequireMark } from "../../NewRecipe/indexNewRecipe";
import { SLable } from "../../NewRecipe/RecipeFormStyled";
import { SSection } from "../../../pages/Recipe/style";

const StepFillSection = () => {
  return (
    <SSection color={"var(--yellow)"}>
      <SLable>
        요리 순서
        <RequireMark />
        <Guide text="중요한 부분은 빠짐없이 적어주세요." />
      </SLable>
      <StepsMaker />
    </SSection>
  );
};
export default StepFillSection;
