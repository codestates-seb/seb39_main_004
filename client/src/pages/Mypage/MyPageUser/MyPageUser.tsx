/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { userSession } from "../../../redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../../hooks/dispatchHook";

const SContainer = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 20px;
  margin-bottom: 30px;
  h2 {
    font-size: 1.5rem;
  }
`;

const SUserImg = styled.div`
  display: inline-block;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  background-color: var(--pale-gray);
  width: 150px;
  height: 150px;
`;

const STextInfo = styled.div`
  position: relative;
  h2 {
    padding-bottom: 30px;
  }
  p {
    padding-bottom: 40px;
  }
  span {
    color: var(--deep-gray);
    font-size: 0.9rem;
    display: inline-grid;
    place-items: center;
    grid-template-columns: auto auto;
    column-gap: 20px;
  }
`;

const SButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const MyPageUser = () => {
  const [userData, setUserData] = useState<any>({});
  const dispatch = useAppDispatch();
  const { sessionStatus, userInfo } = useAppSelector((state) => state.user);

  const axiosUserData = async (userNum: string) => {
    const { data } = await axios.get(`/api/v1/user/${userNum}`);
    console.log("마이페이지 데이터: ", data);
    setUserData(data);
  };

  useEffect(() => {
    if (sessionStatus) dispatch(userSession());
    console.log("마이페이지 세션 체크: ", sessionStatus);
    axiosUserData(userInfo.id);
  }, []);

  return (
    <SContainer>
      <SUserImg />
      <STextInfo>
        <h2>{userData && userData.user.name}</h2>
        <p>
          {userData.user.bio ? userData.user.bio : "작성된 소개가 없습니다."}
        </p>
        <span>팔로우 {userData.followerCount}</span>
        <span>팔로잉 {userData.followingCount}</span>
        <SButton>회원정보수정</SButton>
      </STextInfo>
    </SContainer>
  );
};

export default MyPageUser;
