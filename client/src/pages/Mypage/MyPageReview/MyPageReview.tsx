import React from "react";
import styled from "styled-components";
import Rating from "../../../components/RecipeDetail/Rating";

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

const MyPageReview = () => {
  const dummyData = [
    {
      id: 1,
      title: "내 후기가 들어가는 자리입니다.",
    },
    {
      id: 2,
      title: "내 후기가 들어가는 자리입니다.",
    },
  ];
  return (
    <>
      {dummyData.length > 0 ? (
        dummyData.map((data) => (
          <SContainer key={data.id}>
            <ReviewInfo>
              <h2> {data.title}</h2>
            </ReviewInfo>
            <Rating />
          </SContainer>
        ))
      ) : (
        <SEmptyContainer>
          <div>요리후기가 없습니다.</div>
        </SEmptyContainer>
      )}
    </>
  );
};

export default MyPageReview;
