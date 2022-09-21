import styled from "styled-components";
import SignUpForm from "../../components/SignUp/SignUpForm";

const SSignUpContainer = styled.div`
  width: 300px;
  // 중앙 정렬
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SignUp = () => {
  return (
    <SSignUpContainer>
      <SignUpForm />
    </SSignUpContainer>
  );
};

export default SignUp;
