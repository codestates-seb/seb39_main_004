import styled from "styled-components";
import SignUpForm from "../../components/SignUp/SignUpForm";

const SSignUpContainer = styled.div`
  // 중앙 정렬
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding-top: 200px;
`;

const SignUp = () => {
  return (
    <SSignUpContainer>
      <SignUpForm />
    </SSignUpContainer>
  );
};

export default SignUp;
