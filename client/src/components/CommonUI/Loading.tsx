import styled from "styled-components";
import logo from "../../assets/logos/logo_move2.gif";

const LogingLayout = styled.div`
  width: 300px;
  margin-top: 100px;
`;

const Spinner = styled.img``;

const Loading = () => {
  return (
    <LogingLayout>
      <Spinner src={logo} />
    </LogingLayout>
  );
};

export default Loading;
