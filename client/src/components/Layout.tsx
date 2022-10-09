import { Footer, Header } from "./CommonUI";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import topbtn from "../assets/images/main/topbtn.png";

const SContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const SMain = styled.main`
  min-height: calc(100vh - 323px); // header 95 + footer 228
  margin: 0 auto;
  padding-bottom: 200px;
  max-width: 1280px;
  @media ${({ theme }) => theme.device.desktop} {
    margin: 0 1rem;
    padding-bottom: 100px;
  }
`;

const STopBtn = styled.img`
  width: 65px;
  position: fixed;
  right: 45px;
  bottom: 50px;
  cursor: pointer;
  @media ${({ theme }) => theme.device.tablet} {
    width: 50px;
    right: 20px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 40px;
    right: 10px;
    bottom: 30px;
  }
`;

const Layout = () => {
  const [showButton, setShowButton] = useState<boolean>(false); //스크롤 탑버튼

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const ShowButtonClick = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", ShowButtonClick);
    return () => {
      window.removeEventListener("scroll", ShowButtonClick);
    };
  }, []);

  return (
    <SContainer>
      <Header />
      <SMain>
        <Outlet />
      </SMain>
      <Footer />
      {showButton && (
        <STopBtn onClick={scrollToTop} src={topbtn} alt="topbtn" />
      )}
    </SContainer>
  );
};
export default Layout;
