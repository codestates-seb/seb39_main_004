import React from "react";
import styled from "styled-components";
import { IFollowProps } from "../../../types/interface";
import emptyLogo from "../../../assets/images/myPage/emptyLogo.png";

const SContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid var(--pale-gray);
  @media ${({ theme }) => theme.device.mobile} {
    padding: 10px 0;
  }
`;

const SFollowInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 1rem;
    line-height: 1.5rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    h2 {
      font-size: 0.9rem;
    }
  }
`;

const SUserImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid var(--pale-gray);
  margin-right: 10px;
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

// const SDeleteBtn = styled.div`
//   text-align: center;
//   padding: 7px;
//   background-color: var(--pale-gray);
//   margin-top: 15px;
//   color: black;
//   font-size: 0.7rem;
// `;

const MyPageFollow = ({ followData }: IFollowProps) => {
  return (
    <>
      {followData.length > 0 ? (
        followData.map((data) => (
          <SContainer key={data.id}>
            <SFollowInfo>
              <SUserImg
                src={`${process.env.PUBLIC_URL}/assets/${data.imgProfileUrl}`}
              />
              <h2> {data.name}</h2>
            </SFollowInfo>
            {/* <SDeleteBtn>Delete</SDeleteBtn> */}
          </SContainer>
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

export default MyPageFollow;
