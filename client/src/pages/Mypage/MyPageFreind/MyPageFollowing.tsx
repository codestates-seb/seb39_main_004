import React from "react";
import styled from "styled-components";

const SContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid var(--pale-gray);
`;

const FollowingInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const UserImg = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid var(--pale-gray);
  margin-right: 10px;
`;

const SEmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;
`;

const SDeleteBtn = styled.div`
  text-align: center;
  padding: 7px;
  background-color: var(--pale-gray);
  margin-top: 15px;
  color: black;
  font-size: 0.7rem;
`;

const MyPageFollwing = () => {
  const dummyData = [
    {
      id: 1,
      userId: "유저아이디1",
    },
    {
      id: 2,
      userId: "유저아이디2",
    },
  ];
  return (
    <>
      {dummyData.length > 0 ? (
        dummyData.map((data) => (
          <SContainer key={data.id}>
            <FollowingInfo>
              <UserImg />
              <h2> {data.userId}</h2>
            </FollowingInfo>
            <SDeleteBtn>Delete</SDeleteBtn>
          </SContainer>
        ))
      ) : (
        <SEmptyContainer>
          <div>이웃이 없습니다.</div>
        </SEmptyContainer>
      )}
    </>
  );
};

export default MyPageFollwing;
