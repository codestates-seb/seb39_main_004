import styled from "styled-components";
import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { MdOutlineLogout, MdOutlineLogin } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { userLogout, userSession } from "../../redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatchHook";
import { persistor } from "../..";

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
  const dispatch = useAppDispatch();
  const { sessionStatus } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (sessionStatus) dispatch(userSession()); // TODO: 로그인 상태면 유저 정보 가져옴 (나중에 마이페이지에서 필요)
    console.log("메인페이지 세션상태: ", sessionStatus);
  }, [sessionStatus]);

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

        <SNavLink to="/search">
          <BiSearchAlt2 size={25} />
        </SNavLink>
      </section>
    </SHeader>
  );
};
export default Header;
