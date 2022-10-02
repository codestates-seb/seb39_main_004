import styled from "styled-components";
import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { MdOutlineLogin, MdOutlineNoteAlt } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { userLogout, userSession } from "../../redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatchHook";
import { CgProfile } from "react-icons/cg";
import logo from "../../assets/logos/logo.svg";

const SLogo = styled.img`
  width: 190px;
  margin-right: 1.6rem;
`;

const SHeader = styled.header`
  max-width: 1280px;
  height: 95px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 1.2rem;
    font-weight: lighter;
    color: var(--gray);
  }
`;

const SSection = styled.section`
  display: flex;
  align-items: center;
`;

const SDash = styled.span`
  padding: 0.5rem;
`;

const SNavLink = styled(NavLink)`
  color: var(--gray);
  font-size: 1.5rem;
  padding: 0 1.2rem;
  &.active {
    color: var(--red);
  }
`;

const SDropContainer = styled.div`
  background-color: var(--deep-green);
  width: 220px;
  color: white;
  position: absolute;
  transform: translate(-89px, 24px);
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const SLink = styled(Link)`
  font-size: 1.5rem;
  color: white;
  width: 100%;
  padding: 1.4rem;
  text-align: center;
  outline: none;

  &:hover {
    color: var(--yellow);
  }
`;

const SProfile = styled.div`
  color: var(--gray);
  padding: 1.2rem;
  .actived {
    color: var(--red);
  }
`;

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sessionStatus } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (sessionStatus) dispatch(userSession); // TODO: 로그인 상태면 유저 정보 가져옴 (나중에 마이페이지에서 필요)
  }, [sessionStatus]);

  const logoutHandler = () => {
    dispatch(userLogout());
    navigate("/");
  };

  return (
    <SHeader>
      <SSection>
        <Link to="/">
          <SLogo src={logo} alt="MMZ logo" />
        </Link>
        <SNavLink to="/" end>
          HOME
        </SNavLink>
        <SDash>|</SDash>
        <SNavLink to="/rank">RANKING</SNavLink>
      </SSection>
      <SSection>
        <SNavLink to="/write">
          <MdOutlineNoteAlt size={47} />
        </SNavLink>
        <section>
          {!sessionStatus ? (
            <SNavLink to="/login">
              <MdOutlineLogin size={45} />
            </SNavLink>
          ) : (
            <SProfile
              onClick={() => {
                setIsClicked(!isClicked);
              }}
            >
              <CgProfile
                size={43}
                className={isClicked ? "actived" : undefined}
              />
              {isClicked && (
                <SDropContainer>
                  <SLink to="/mypage">
                    <div>MyPage</div>
                  </SLink>
                  <SLink to="/" onClick={logoutHandler}>
                    Logout
                  </SLink>
                </SDropContainer>
              )}
            </SProfile>
          )}
        </section>
        <SNavLink to="/search">
          <BiSearchAlt2 size={45} />
        </SNavLink>
      </SSection>
    </SHeader>
  );
};
export default Header;
