import { Footer, Header } from "./CommonUI";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const SContainer = styled.div`
  /* width: 100vw; */
`;

const SMain = styled.main`
  min-height: calc(100vh - 210px); // header 60 + footer 150
`;

const Layout = () => {
  return (
    <SContainer>
      <Header />
      <SMain>
        <Outlet />
      </SMain>
      <Footer />
    </SContainer>
  );
};
export default Layout;
