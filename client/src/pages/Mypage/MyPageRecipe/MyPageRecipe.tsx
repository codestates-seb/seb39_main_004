import React from "react";
import styled from "styled-components";
import { IMyRecipeData } from "../../../types/interface";
import { Link } from "react-router-dom";
import { SortButtons } from "../../../components/CommonUI";
import emptyLogo from "../../../assets/images/myPage/emptyLogo.png";
import star from "../../../assets/images/myPage/star.png";
import review from "../../../assets/images/myPage/review.png";

const SContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr;
  column-gap: 20px;
  padding: 30px 0;
  border-bottom: 1px solid var(--pale-gray);
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 100px auto;
    padding: 20px 0;
  }
`;

const SRecipeImg = styled.img`
  display: inline-block;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  background-color: var(--pale-gray);
  width: 130px;
  height: 130px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100px;
    height: 100px;
  }
`;

const SRecipeCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
    padding-top: 0.7rem;
  }
`;

const SRecipeTitle = styled.div`
  h2 {
    font-size: 1.1rem;
    padding-bottom: 15px;
  }
  p {
    color: var(--deep-gray);
    font-size: 0.9rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    h2 {
      font-size: 1rem;
      padding-bottom: 5px;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;

const SRecipeInfo = styled.div`
  color: var(--red);
  font-size: 0.9rem;
  span:last-child {
    color: var(--deep-green);
    padding-left: 10px;
  }
  img {
    width: 21px;
    vertical-align: -6px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.7rem;
    padding-top: 10px;
    img {
      width: 18px;
      vertical-align: -5px;
    }
  }
`;

const SEmptyContainer = styled.div`
  display: table;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5rem;
  text-align: center;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.7rem;
  }
`;

const SEmptyLogo = styled.img`
  width: 100px;
  padding-bottom: 5px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 70px;
  }
`;

const MyPageRecipe = ({ recipeData }: IMyRecipeData) => {
  const sortValues = ["최신순", "조회순", "평점순"];

  return (
    <>
      <SortButtons sortValues={sortValues} />
      {recipeData.length > 0 ? (
        recipeData.map((data) => (
          <Link to={`/post/${data.id}`} key={data.id}>
            <SContainer>
              <SRecipeImg
                src={`${process.env.PUBLIC_URL}/assets/${data.imgThumbNailUrl}`}
              />
              <SRecipeCont>
                <SRecipeTitle>
                  <h2> {data.title}</h2>
                  <p>{data.createDate.slice(0, 16)}</p>
                </SRecipeTitle>
                <SRecipeInfo>
                  <span>
                    <img src={star} alt="star" />
                    {data.stars}
                  </span>
                  <span>
                    <img src={review} alt="review" />
                    {data.reviewCount}
                  </span>
                </SRecipeInfo>
              </SRecipeCont>
            </SContainer>
          </Link>
        ))
      ) : (
        <SEmptyContainer>
          <SEmptyLogo src={emptyLogo} alt="logo" />
          <div>레시피를 직접 올려보세요!</div>
        </SEmptyContainer>
      )}
    </>
  );
};

export default MyPageRecipe;
