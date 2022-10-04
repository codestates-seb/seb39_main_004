import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Tag } from "../../CommonUI";
import hot from "../../../assets/icons/hot.svg";
import bookmark_on from "../../../assets/icons/bookmark-on.svg";
import bookmark_off from "../../../assets/icons/bookmark-off.svg";
import { IItemProps } from "../../../types/interface";
import axios from "axios";
import useMessage from "../../../hooks/useMessage";

const SRecipeLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--pale-gray);
  border-radius: 5px;
`;

const SIemContainer = styled.div`
  width: 100%;
  height: 228px;
  overflow: hidden;
  @media ${({ theme }) => theme.device.mobile} {
    height: 200px;
  }
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
  padding: 25px 0;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 15px 0;
  }
`;

const SItemDetail = styled.div`
  margin: 0 1rem;
`;

const SItemTitle = styled.div`
  width: 85%;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  line-height: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
  }
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
  @media ${({ theme }) => theme.device.mobile} {
    width: 85px;
    top: -12px;
    left: -12px;
  }
`;

const SBookMark = styled.div`
  width: 33px;
  position: absolute;
  right: 20px;
  bottom: 48px;
  z-index: 1;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    bottom: 42px;
    width: 28px;
  }
`;

const RecipeItem = ({
  id,
  title,
  imgThumbNailUrl,
  stars,
  tags,
  bookmarked,
}: IItemProps) => {
  const message = useMessage(2000);
  const [bookCheck, setBookCheck] = useState(bookmarked);

  const doBookmark = async () => {
    try {
      await axios.post(`/api/v1/recipe/${id}/bookmark/`);
      setBookCheck(true);
    } catch (error) {
      message.fire({
        icon: "error",
        title: "북마크 추가에 실패했습니다. \n 로그인을 해주세요.",
      });
    }
  };

  const undoBookmark = async () => {
    try {
      await axios.post(`/api/v1/recipe/${id}/bookmark/undo/`);
      setBookCheck(false);
    } catch (error) {
      message.fire({
        icon: "error",
        title: "북마크 해제에 실패했습니다.",
      });
    }
  };

  useEffect(() => {
    // console.log("");
  }, [bookCheck]);

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
            {/* 평점 4 이상 레시피 스티커 표시 */}
            {Number(stars) >= 4 ? <HotIcon src={hot} /> : null}
          </SItemStar>
        </SItemWrapper>
      </SLink>
      <SBookMark>
        {bookCheck ? (
          <img
            src={bookmark_on}
            alt="bookmark_on"
            onClick={undoBookmark}
            onKeyUp={undoBookmark}
            role="presentation"
          />
        ) : (
          <img
            src={bookmark_off}
            alt="bookmark_off"
            onClick={doBookmark}
            onKeyUp={doBookmark}
            role="presentation"
          />
        )}
      </SBookMark>
    </SRecipeLayout>
  );
};

export default RecipeItem;
