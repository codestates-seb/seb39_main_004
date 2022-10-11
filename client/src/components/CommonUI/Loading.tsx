import styled from "styled-components";
import logo from "../../assets/logos/logo_move2.gif";

const LogingLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.img`
  width: 300px;
  margin-top: 100px;
  @media ${({ theme }) => theme.device.tablet} {
    width: 35%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 50%;
  }
`;

const Loading = () => {
  return (
    <LogingLayout>
      <Spinner src={logo} />
    </LogingLayout>
  );
};

export default Loading;
