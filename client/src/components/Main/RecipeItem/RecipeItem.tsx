import styled from "styled-components";
import { Link } from "react-router-dom";
import { Tag } from "../../CommonUI";
import { AiFillStar } from "react-icons/ai";

const SRecipeLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 338px;
  margin: 0 1rem;
  border: 1px solid var(--pale-gray);
  border-radius: 5px;

  &:hover {
    color: var(--red);
    transition: 0.4s;
  }

  &:first-child {
    padding-bottom: 30px;
  }
`;

const SItemImage = styled.img`
  width: 100%;
  height: 228px;
  margin-bottom: 1rem;
  object-fit: cover;
  object-position: center;
`;

const SItemDetail = styled.div`
  margin: 0 1rem;
  display: flex;
  justify-content: space-between;
`;

const SItemTitle = styled.div`
  margin: 0 1rem;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const SLink = styled(Link)`
  color: black;
`;

interface ItemProps {
  id: number;
  recipeTitle: string;
  tag: string[];
  recipeImg: string;
  rating: number;
}

const RecipeItem = ({ id, recipeTitle, recipeImg, tag, rating }: ItemProps) => {
  return (
    <SRecipeLayout>
      <SLink to={`/item/${id}`}>
        <SItemImage src={recipeImg} alt={recipeTitle} />
        <SItemTitle>{recipeTitle}</SItemTitle>
        <SItemDetail>
          <div>
            {tag.map((i) => (
              <Tag key={i} tagItem={i} />
            ))}
          </div>
          <div>
            {rating > 4 ? <AiFillStar size="40px" color="#ff5936" /> : null}
          </div>
        </SItemDetail>
      </SLink>
    </SRecipeLayout>
  );
};

export default RecipeItem;
