import styled from "styled-components";
import { Link } from "react-router-dom";
import { Tag } from "../../CommonUI";
import { AiFillStar } from "react-icons/ai";

const SRecipeLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 338px;
  border: 1px solid var(--pale-gray);
  border-radius: 5px;

  &:hover {
    padding: 10px;
    transition: 0.4s;
  }
`;

const SItemImage = styled.img`
  width: 100%;
  height: 228px;
  margin-bottom: 1rem;
  object-fit: cover;
  object-position: center;
`;

const SItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SItemDetail = styled.div`
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SItemTitle = styled.div`
  /* margin: 0 1rem; */
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const SItemStar = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 0 20px;
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
        <SItemWrapper>
          <SItemDetail>
            <SItemTitle>{recipeTitle}</SItemTitle>
            <div>
              {tag.map((i) => (
                <Tag key={i} tagItem={i} />
              ))}
            </div>
          </SItemDetail>
          <SItemStar>
            {/* 평점 4 이상 레시피 별표시 */}
            {rating > 4 ? <AiFillStar size="40px" color="#ff5936" /> : null}
          </SItemStar>
        </SItemWrapper>
      </SLink>
    </SRecipeLayout>
  );
};

export default RecipeItem;
