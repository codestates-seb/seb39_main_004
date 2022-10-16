/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import axios from "axios";
import styled from "styled-components";
import { IFollowingProps } from "../../../types/interface";
import useMessage from "../../../hooks/useMessage";
import emptyLogo from "../../../assets/images/myPage/emptyLogo.png";
import deleteicon from "../../../assets/images/myPage/deleteicon.png";

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

const SFollowingInfo = styled.div`
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

const SDeleteBtn = styled.img`
  width: 27px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 20px;
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

const MyPageFollwing = ({
  followingData,
  setFollowingData,
}: IFollowingProps) => {
  const message = useMessage(2000);

  const undoFollow = async (userId: number) => {
    try {
      await axios.post(`/api/v1/follow/undo/${userId}`);
      const List = followingData.filter((data) => data.userId !== userId);
      setFollowingData(List);
    } catch (error) {
      message.fire({
        icon: "error",
        title: "팔로우 삭제에 실패했습니다.",
      });
    }
  };

  return (
    <>
      {followingData.length > 0 ? (
        followingData.map((data) => (
          <SContainer key={data.userId}>
            <SFollowingInfo>
              <SUserImg
                src={`${process.env.PUBLIC_URL}/assets/${data.imgProfileUrl}`}
              />
              <h2> {data.name}</h2>
            </SFollowingInfo>
            <SDeleteBtn
              src={deleteicon}
              onClick={() => undoFollow(data.userId)}
              alt="deleleicon"
            ></SDeleteBtn>
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

export default MyPageFollwing;
