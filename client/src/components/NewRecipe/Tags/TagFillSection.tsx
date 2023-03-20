import { TagsMaker } from "../../NewRecipe/indexNewRecipe";
import { SLable } from "../../NewRecipe/RecipeFormStyled";
import { SSection } from "../../../pages/Recipe/style";

const TagFillSection = () => {
  return (
    <SSection color={"var(--sky-blue)"}>
      <SLable>태그</SLable>
      <TagsMaker />
    </SSection>
  );
};
export default TagFillSection;
