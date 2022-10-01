import React from "react";
import styled from "styled-components";

const SContainer = styled.div`
  display: grid;
  grid-template-columns: 130px auto;
  -webkit-column-gap: 20px;
  column-gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid var(--pale-gray);
`;
const RecipeImg = styled.div`
  display: inline-block;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  background-color: var(--pale-gray);
  width: 130px;
  height: 130px;
`;

const BookMarkInfo = styled.div`
  position: relative;
  padding-top: 30px;
  h2 {
    font-size: 1.1rem;
    padding-bottom: 15px;
  }
  p {
    color: var(--deep-gray);
    font-size: 0.9rem;
  }
  span {
    position: absolute;
    top: 30px;
    right: 0;
  }
`;

const SEmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;
`;

const MyPageBookMark = () => {
  const dummyData = [
    {
      id: 1,
      userId: "아이디1",
      title: "타이틀이 들어가는 자리입니다.",
      createdDate: "2022-03-28",
    },
    {
      id: 2,
      userId: "아이디2",
      title: "타이틀이 들어가는 자리입니다.",
      createdDate: "2022-03-28",
    },
  ];
  return (
    <>
      {dummyData.length > 0 ? (
        dummyData.map((data) => (
          <SContainer key={data.id}>
            <RecipeImg />
            <BookMarkInfo>
              <h2> {data.title}</h2>
              <p>{data.createdDate}</p>
              <span>{data.userId}</span>
            </BookMarkInfo>
          </SContainer>
        ))
      ) : (
        <SEmptyContainer>
          <div>북마크가 없습니다.</div>
        </SEmptyContainer>
      )}
    </>
  );
};

export default MyPageBookMark;
