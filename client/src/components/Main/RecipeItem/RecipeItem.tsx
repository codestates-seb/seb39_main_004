import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Tag } from "../../CommonUI";
import hot from "../../../assets/icons/hot.svg";
import bookmark_on from "../../../assets/icons/bookmark-on.svg";
import bookmark_off from "../../../assets/icons/bookmark-off.svg";
import { IItemProps } from "../../../types/interface";

const SRecipeLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;
  border: 1px solid var(--pale-gray);
  border-radius: 5px;
`;

const SIemContainer = styled.div`
  width: 100%;
  height: 228px;
  overflow: hidden;
`;

const SItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.5s;
  }
`;

const SItemWrapper = styled.div`
  padding: 30px 0;
`;

const SItemDetail = styled.div`
  margin: 0 1rem;
`;

const SItemTitle = styled.div`
  width: 85%;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SItemStar = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 0 20px;
`;

const SLink = styled(Link)`
  color: black;
`;

const HotIcon = styled.img`
  position: absolute;
  width: 105px;
  top: -15px;
  left: -20px;
  transform: rotate(-15deg);
`;

const SBookMark = styled.div`
  width: 33px;
  position: absolute;
  right: 20px;
  bottom: 55px;
  z-index: 1;
  cursor: pointer;
`;

const RecipeItem = ({
  id,
  title,
  imgThumbNailUrl,
  stars,
  tags,
}: IItemProps) => {
  const [bookMark, setbookMark] = useState(false);

  return (
    <SRecipeLayout>
      <SLink to={`/post/${id}`}>
        <SIemContainer>
          <SItemImage
            src={`${process.env.PUBLIC_URL}/assets/${imgThumbNailUrl}`}
            alt={title}
          />
        </SIemContainer>
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
            {Number(stars) >= 4 ? <HotIcon src={hot} /> : null}
          </SItemStar>
        </SItemWrapper>
      </SLink>
      <SBookMark onClick={() => setbookMark(!bookMark)}>
        {bookMark === true ? (
          <img src={bookmark_on} alt="bookmark_on" />
        ) : (
          <img src={bookmark_off} alt="bookmark_off" />
        )}
      </SBookMark>
    </SRecipeLayout>
  );
};

export default RecipeItem;
