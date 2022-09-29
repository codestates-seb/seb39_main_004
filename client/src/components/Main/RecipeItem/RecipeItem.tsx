import styled from "styled-components";
import { Link } from "react-router-dom";
import { Tag } from "../../CommonUI";
import { AiFillStar } from "react-icons/ai";
import { IItemProps } from "../../../types/interface";

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

const RecipeItem = ({
  id,
  title,
  imgThumbNailUrl,
  stars,
  tags,
}: IItemProps) => {
  return (
    <SRecipeLayout>
      <SLink to={`/item/${id}`}>
        <SItemImage
          src={`${process.env.PUBLIC_URL}/assets/${imgThumbNailUrl}`}
          alt={title}
        />
        <SItemWrapper>
          <SItemDetail>
            <SItemTitle>{title}</SItemTitle>
            <div>
              {tags.map((i, idx) => (
                <Tag key={idx} name={i.name} />
              ))}
            </div>
          </SItemDetail>
          <SItemStar>
            {/* 평점 4 이상 레시피 별표시 */}
            {Number(stars) >= 4 ? (
              <AiFillStar size="40px" color="#ff5936" />
            ) : null}
          </SItemStar>
        </SItemWrapper>
      </SLink>
    </SRecipeLayout>
  );
};

export default RecipeItem;
