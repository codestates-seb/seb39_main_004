import React from "react";
import styled from "styled-components";
import { IReviewProps } from "../../../types/interface";
import { Link } from "react-router-dom";
import emptyLogo from "../../../assets/images/myPage/emptyLogo.png";

const SContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr;
  align-items: center;
  column-gap: 20px;
  padding: 30px 0;
  border-bottom: 1px solid var(--pale-gray);
  @media ${({ theme }) => theme.device.mobile} {
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

const SReviewCont = styled.div`
  font-size: 1.1rem;
  p {
    font-size: 1rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    p {
      font-size: 0.9rem;
    }
  }
`;

const SReviewTitle = styled.div`
  display: flex;
  gap: 0.8rem;
  padding-bottom: 20px;
  span {
    color: var(--deep-gray);
    font-size: 0.9rem;
    padding-top: 2px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
    h2 {
      font-size: 1rem;
      padding-bottom: 5px;
    }
    span {
      font-size: 0.8rem;
    }
  }
`;

const SEmptyLogo = styled.img`
  width: 100px;
  padding-bottom: 5px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 70px;
  }
`;

const MyPageReview = ({ reviewData }: IReviewProps) => {
  return (
    <>
      {reviewData.length > 0 ? (
        reviewData.map((data) => (
          <Link to={`/post/${data.recipeId}`} key={data.id}>
            <SContainer key={data.id}>
              <SRecipeImg
                src={`${process.env.PUBLIC_URL}/assets/${data.recipeImgThumbNail}`}
              />
              <SReviewCont>
                <SReviewTitle>
                  <h2> {data.recipeTitle}</h2>
                  <span> {data.createDate.slice(0, 16)}</span>
                </SReviewTitle>
                <p> {data.body}</p>
              </SReviewCont>
            </SContainer>
          </Link>
        ))
      ) : (
        <SEmptyContainer>
          <SEmptyLogo src={emptyLogo} alt="logo" />
          <div>이웃이 없습니다.</div>
        </SEmptyContainer>
      )}
    </>
  );
};

export default MyPageReview;
