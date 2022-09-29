import React from "react";
import styled from "styled-components";
import { AiOutlineShareAlt, AiOutlineEye, AiOutlineStar } from "react-icons/ai";
import { BsBookmarkCheck } from "react-icons/bs";
import IngredientItem from "./IngredientItem";
import { detailData } from "../../pages/Recipe/data";

const SContainer = styled.div`
  display: flex;
  margin: 30px auto 0;
  padding-bottom: 40px;
`;

const SMainContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  column-gap: 20px;
  flex-grow: 1;
`;

const SIconContainer = styled.div`
  margin: 15px 0 20px;
`;

const SCtagoryContainer = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #eee;
  h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 10px;
  }
  svg {
    margin-right: 10px;
    vertical-align: -8px;
  }
`;

const IngredientContainer = styled.div`
  width: 100%;
  padding: 10px;
  h4 {
    padding: 10px;
    font-size: 1.2rem;
    border: 1px solid var(--pale-gray);
  }
`;

const PostInfo = () => {
  const data = detailData;

  return (
    <>
      <SContainer>
        <SMainContainer>
          <SCtagoryContainer>
            <SIconContainer>
              <span className="share-btn">
                <AiOutlineShareAlt size="28" />
              </span>
              <span className="bookmark-btn">
                <BsBookmarkCheck size="27" />
              </span>
            </SIconContainer>
            <h4>카테고리</h4>
            <p>
              <AiOutlineEye size="27" />
              {data.views}
            </p>
            <p>
              <AiOutlineStar size="25" />
              {data.likes}
            </p>
            <p>{data.postDate}</p>
          </SCtagoryContainer>
          <IngredientContainer>
            <h4>꼭 필요한 재료!</h4>
            {data.ingredients.map((i) => (
              <IngredientItem
                key={i.id}
                id={i.id}
                name={i.name}
                amount={i.amount}
                isEssential={i.isEssential}
              />
            ))}
          </IngredientContainer>
        </SMainContainer>
      </SContainer>
    </>
  );
};

export default PostInfo;
