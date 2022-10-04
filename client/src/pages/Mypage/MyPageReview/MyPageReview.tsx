import React from "react";
import styled from "styled-components";
import SimpleRating from "../../../components/RecipeDetail/SimpleRating";
import { IReviewProps } from "../../../types/interface";

const SContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid var(--pale-gray);
`;

const ReviewInfo = styled.div`
  width: 80%;
  h2 {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const SEmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;
`;

const MyPageReview = ({ reviewData }: IReviewProps) => {
  return (
    <>
      {reviewData.length > 0 ? (
        reviewData.map((data) => (
          <SContainer key={data.id}>
            <ReviewInfo>
              <h2> {data.body}</h2>
            </ReviewInfo>
            <SimpleRating stars={data.stars} />
          </SContainer>
        ))
      ) : (
        <SEmptyContainer>
          <div>요리 후기가 없습니다.</div>
        </SEmptyContainer>
      )}
    </>
  );
};

export default MyPageReview;
