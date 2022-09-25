import styled from "styled-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineLogout, MdOutlineLogin } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";

const SLogo = styled.img`
  width: 100px;
`;

const SHeader = styled.header`
  height: 60px;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 0.8rem;
    font-weight: lighter;
    color: var(--gray);
  }
`;

const SNavLink = styled(NavLink)`
  color: var(--gray);
  padding: 0 1.3rem;
  &.active {
    color: var(--red);
  }
`;

const Header = () => {
  const [isLogin, setIsLogin] = useState(true); // redux 사용시 변경

  return (
    <SHeader>
      <SLogo src={`${process.env.PUBLIC_URL}/logo.png`} alt="MMZ logo" />
      <section>
        <SNavLink to="/" end>
          HOME
        </SNavLink>
        <span>|</span>
        <SNavLink to="/rank">RANKING</SNavLink>
        <span>|</span>
        <SNavLink to="/write">RECIPE</SNavLink>
        <span>|</span>
        <SNavLink to="/mypage">MYPAGE</SNavLink>
      </section>
      <section className="right">
        {!isLogin ? (
          <SNavLink to="/login">
            <MdOutlineLogin size={25} />
          </SNavLink>
        ) : (
          <SNavLink
            to="/"
            end
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            <MdOutlineLogout size={25} />
          </SNavLink>
        )}
        <SNavLink to="/search">
          <BiSearchAlt2 size={25} />
        </SNavLink>
      </section>
    </SHeader>
  );
};
export default Header;
