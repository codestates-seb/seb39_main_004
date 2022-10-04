import React from "react";
import styled from "styled-components";
import { IFollowingProps } from "../../../types/interface";

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

const UserImg = styled.img`
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

const MyPageFollwing = ({ followingData }: IFollowingProps) => {
  return (
    <>
      {followingData.length > 0 ? (
        followingData.map((data) => (
          <SContainer key={data.id}>
            <FollowingInfo>
              <UserImg
                src={`${process.env.PUBLIC_URL}/assets/${data.imgProfileUrl}`}
              />
              <h2> {data.name}</h2>
            </FollowingInfo>
            <SDeleteBtn>Delete</SDeleteBtn>
          </SContainer>
        ))
      ) : (
        <SEmptyContainer>
          <div>팔로잉이 없습니다.</div>
        </SEmptyContainer>
      )}
    </>
  );
};

export default MyPageFollwing;
