import styled from "styled-components";
import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { MdOutlineLogin, MdOutlineNoteAlt } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { userLogout } from "../../redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatchHook";
import { CgProfile } from "react-icons/cg";
import logo from "../../assets/logos/logo.svg";
import { persistor } from "../..";

const SLogo = styled.img`
  width: 145px;
  margin-right: 1.6rem;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100px;
    margin-right: 0.5rem;
  }
`;

const SOutLine = styled.div`
  border-bottom: 1px solid var(--pale-gray);
`;

const SHeader = styled.header`
  max-width: 1280px;
  height: 80px;
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
  @media ${({ theme }) => theme.device.mobile} {
    height: 55px;
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
  font-size: 1.1rem;
  padding: 0 1.2rem;
  &.active {
    color: var(--red);
  }
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 0.9rem;
    padding: 0 0.5rem;
    svg {
      width: 25px;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.8rem;
    padding: 0.4rem;
    svg {
      width: 23px;
    }
  }
`;

const SDropContainer = styled.div`
  background-color: var(--deep-green);
  width: 180px;
  color: white;
  position: absolute;
  transform: translate(-75px, 23px);
  z-index: 1;
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.device.tablet} {
    width: 120px;
    transform: translate(-39px, 10px);
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100px;
    transform: translate(-39px, 10px);
  }
`;

const SLink = styled(Link)`
  font-size: 1.5rem;
  color: white;
  font-size: 1rem;
  width: 100%;
  padding: 1.2rem;
  text-align: center;
  outline: none;
  &:hover {
    color: var(--yellow);
  }
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 0.6rem;
    padding: 0.8rem;
  }
`;

const SProfile = styled.div`
  color: var(--gray);
  padding: 1.2rem;
  cursor: pointer;
  .actived {
    color: var(--red);
  }
  @media ${({ theme }) => theme.device.tablet} {
    padding: 0.2rem;
    svg {
      width: 23px;
    }
  }
`;

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sessionStatus } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (sessionStatus) navigate("/");
  }, [sessionStatus]);

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
          {sessionStatus && (
            <SNavLink to="/recipe">
              <MdOutlineNoteAlt size={32} />
            </SNavLink>
          )}

          <section>
            {!sessionStatus ? (
              <SNavLink to="/login">
                <MdOutlineLogin size={32} />
              </SNavLink>
            ) : (
              <SProfile
                onClick={() => {
                  setIsClicked(!isClicked);
                }}
              >
                <CgProfile
                  size={32}
                  className={isClicked ? "actived" : undefined}
                />
                {isClicked && (
                  <SDropContainer>
                    <SLink to="/mypage">
                      <div>MyPage</div>
                    </SLink>
                    <SLink
                      to="/"
                      onClick={async () => {
                        await dispatch(userLogout());
                        await persistor.purge(); // persistStore 데이터 초기화
                      }}
                    >
                      Logout
                    </SLink>
                  </SDropContainer>
                )}
              </SProfile>
            )}
          </section>
          <SNavLink to="/search">
            <BiSearchAlt2 size={33} />
          </SNavLink>
        </SSection>
      </SHeader>
    </SOutLine>
  );
};

export default Header;
