import styled from "styled-components";
import Kakao from "../../assets/images/snsLogin/kakao.png";
import Naver from "../../assets/images/snsLogin/naver.png";
import Google from "../../assets/images/snsLogin/google.png";
import { StyledLink } from "../CommonUI";

const SSNSLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const SH3 = styled.h3``;

const JoinContainer = styled.ul`
  display: flex;
  width: 60%;
  justify-content: space-between;
`;

const NaverImg = styled.img.attrs({
  src: Naver,
})`
  height: 40px;
  width: 40px;
  cursor: pointer;
`;

const KakaoImg = styled.img.attrs({
  src: Kakao,
})`
  height: 40px;
  width: 40px;
  border-radius: 100%;
  cursor: pointer;
`;

const GoogleImg = styled.img.attrs({
  src: Google,
})`
  height: 40px;
  width: 40px;
  border: 0.1px solid lightgray;
  border-radius: 100%;
  cursor: pointer;
`;

const SLogoContainer = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
  gap: 10%;
`;

const SNSLogin = () => {
  return (
    <SSNSLoginContainer>
      <SH3>SNS 계정으로 로그인</SH3>
      <SLogoContainer>
        <NaverImg />
        <KakaoImg />
        <GoogleImg />
      </SLogoContainer>
      <JoinContainer>
        <StyledLink to="findpw">비밀번호 찾기</StyledLink>
        <StyledLink to="signup">회원가입</StyledLink>
      </JoinContainer>
    </SSNSLoginContainer>
  );
};

export default SNSLogin;
