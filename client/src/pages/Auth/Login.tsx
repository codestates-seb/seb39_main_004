import styled from "styled-components";
import LoginForm from "../../components/Login/LoginForm";

const SLoginContainer = styled.div`
  // 중앙 정렬
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding-top: 200px;
`;

const Login = () => {
  return (
    <SLoginContainer>
      <LoginForm />
    </SLoginContainer>
  );
};

export default Login;
