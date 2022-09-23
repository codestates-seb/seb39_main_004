import { StyledLink } from "../CommonUI";
import styled from "styled-components";
// import { useState } from "react";

const SHeader = styled.header`
  background-color: aliceblue;
  height: 60px;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & section {
    display: flex;
    gap: 0.8rem;
  }
`;

const Header = () => {
  const isLogin = true; // build에러로 잠시 변수화 작업했습니다.
  // const [isLogin, setIsLogin] = useState(false);

  return (
    <SHeader>
      <section className="left-section">
        <div>MMZ</div>
        <StyledLink to="/">Recipe</StyledLink>
        <StyledLink to="">Ranking</StyledLink>
      </section>
      <section className="right-section">
        {!isLogin ? (
          <>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/signup">Sign up</StyledLink>
            <StyledLink to="/login">등록</StyledLink>
          </>
        ) : (
          <>
            <StyledLink to="/">Logout</StyledLink>
            <StyledLink to="/mypage">Mypage</StyledLink>
            <StyledLink to="/write">등록</StyledLink>
          </>
        )}
        <StyledLink to="/search">검색</StyledLink>
      </section>
    </SHeader>
  );
};
export default Header;
