import React from "react";
import styled from "styled-components";

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
  return (
    <SContainer>
      <SUserImg />
      <STextInfo>
        <h2>닉네임</h2>
        <p>자기소개가 들어가는 자리입니다.</p>
        <span>팔로우 0</span>
        <span>팔로잉 0</span>
        <SButton>회원정보수정</SButton>
      </STextInfo>
    </SContainer>
  );
};

export default MyPageUser;
