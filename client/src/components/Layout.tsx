import { Footer, Header } from "./CommonUI";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

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
