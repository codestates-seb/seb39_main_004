import styled from "styled-components";
import LoginForm from "../../components/Login/LoginForm";
import SNSLogin from "../../components/Login/SNSLogin";

const SLoginContainer = styled.div`
  width: 300px;
  // 중앙 정렬
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Login = () => {
  return (
    <SLoginContainer>
      <LoginForm />
      <SNSLogin />
    </SLoginContainer>
  );
};

export default Login;
