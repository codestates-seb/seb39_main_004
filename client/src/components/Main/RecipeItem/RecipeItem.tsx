import styled from "styled-components";
import { Link } from "react-router-dom";

const SRecipeLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding-bottom: 100px;

  &:first-child {
    padding-bottom: 30px;
  }
`;

const SItemImage = styled.img`
  width: 500px;
  height: 100%;
  object-fit: contain;
`;

const SItemTitle = styled.div`
  font-size: 1.5rem;
`;

interface ItemProps {
  id: number;
  recipeTitle: string;
  tag: string[];
  recipeImg: string;
}

const RecipeItem = ({ id, recipeTitle, recipeImg }: ItemProps) => {
  return (
    <SRecipeLayout>
      <Link to={`/item/${id}`}>
        <SItemImage src={recipeImg} alt={recipeTitle} />
        <SItemTitle>{recipeTitle}</SItemTitle>
      </Link>
    </SRecipeLayout>
  );
};

export default RecipeItem;
