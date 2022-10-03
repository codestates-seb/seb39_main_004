import styled from "styled-components";
import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { MdOutlineLogin, MdOutlineNoteAlt } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { userLogout, userSession } from "../../redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatchHook";
import { CgProfile } from "react-icons/cg";
import logo from "../../assets/logos/logo.svg";
import { persistor } from "../..";

const SLogo = styled.img`
  width: 190px;
  margin-right: 1.6rem;
`;

const SOutLine = styled.div`
  border-bottom: 1px solid var(--pale-gray);
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
<<<<<<< HEAD
=======
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
>>>>>>> ba5774e0b63f64a4611bab3ae2fa64ce3551de84
  const dispatch = useAppDispatch();
  const { sessionStatus } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (sessionStatus) dispatch(userSession()); // TODO: 로그인 상태면 유저 정보 가져옴 (나중에 마이페이지에서 필요)
    console.log("메인페이지 세션상태: ", sessionStatus);
  }, [sessionStatus]);

<<<<<<< HEAD
  return (
    <SHeader>
      <Link to="/">
        <SLogo src={`${process.env.PUBLIC_URL}/logo.png`} alt="MMZ logo" />
      </Link>
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
        {!sessionStatus ? (
          <SNavLink to="/login">
            <MdOutlineLogin size={25} />
          </SNavLink>
        ) : (
          <SNavLink
            to="/"
            end
            onClick={async () => {
              await dispatch(userLogout());
              await persistor.purge(); // persistStore 데이터 초기화
            }}
          >
            <MdOutlineLogout size={25} />
          </SNavLink>
        )}
=======
  const logoutHandler = () => {
    dispatch(userLogout());
    navigate("/");
  };
>>>>>>> ba5774e0b63f64a4611bab3ae2fa64ce3551de84

  return (
    <SOutLine>
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
    </SOutLine>
  );
};
export default Header;
