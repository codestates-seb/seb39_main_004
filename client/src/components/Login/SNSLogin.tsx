import styled from "styled-components";
import Kakao from "../../assets/images/snsLogin/kakao.png";
import Naver from "../../assets/images/snsLogin/naver.png";
import Google from "../../assets/images/snsLogin/google.png";
import { StyledLink } from "../CommonUI";
import { userSession } from "../../redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatchHook";
import React, { useEffect } from "react";

const SSNSLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
`;

const SH3 = styled.h3``;

const NaverImg = styled.img.attrs({
  src: Naver,
})`
  height: 50px;
  width: 50px;
  cursor: pointer;
`;

const KakaoImg = styled.img.attrs({
  src: Kakao,
})`
  height: 50px;
  width: 50px;
  border-radius: 100%;
  cursor: pointer;
`;

const GoogleImg = styled.img.attrs({
  src: Google,
})`
  height: 50px;
  width: 50px;
  border: 0.1px solid lightgray;
  border-radius: 100%;
  cursor: pointer;
`;

const SButton = styled.button``;

const SLogoContainer = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 5%;
`;

const JoinContainer = styled.ul`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 15px;
`;

const SNSLogin = () => {
  const dispatch = useAppDispatch();
  const { sessionStatus } = useAppSelector((state) => state.user);

  const onGoogleLoginHandler = () => {
    window.location.href = "https://www.mmz.today/oauth2/authorization/google";
    dispatch(userSession());
    console.log("구글 로그인 세션 상태: ", sessionStatus);
  };

  const onKakaoLoginHandler = () => {
    window.location.href = "https://www.mmz.today/oauth2/authorization/kakao";
    dispatch(userSession());
    console.log("카카오 로그인 세션 상태: ", sessionStatus);
  };

  return (
    <SSNSLoginContainer>
      <SH3>SNS로 간편 시작</SH3>
      <SLogoContainer>
        <SButton>
          <NaverImg />
        </SButton>
        <SButton onClick={onKakaoLoginHandler}>
          <KakaoImg />
        </SButton>
        <SButton onClick={onGoogleLoginHandler}>
          <GoogleImg />
        </SButton>
      </SLogoContainer>
      <JoinContainer>
        <StyledLink to="/findpw">비밀번호 찾기</StyledLink>
        <StyledLink to="/signup">회원가입</StyledLink>
      </JoinContainer>
    </SSNSLoginContainer>
  );
};

export default SNSLogin;
