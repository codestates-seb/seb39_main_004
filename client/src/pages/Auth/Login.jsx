import React from "react";
import styled from "styled-components";
import { InputWithLabel, Button } from "../../components/CommonUI";

const SFormContainer = styled.div`
  width: 300px;
  // 중앙 정렬
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SH1 = styled.h1`
  text-align: center;
  padding: 20px;
  font-size: 30px;
`;

const Login = () => {
  return (
    <SFormContainer>
      <SH1>Login</SH1>
      <InputWithLabel
        label="ID"
        name="id"
        placeholder="ID"
        type="text"
        required
      />
      <InputWithLabel
        label="Password"
        name="password"
        placeholder="Password"
        type="password"
        required
      />
      <Button>Login</Button>
    </SFormContainer>
  );
};

export default Login;
