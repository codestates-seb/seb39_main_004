import React from "react";
import styled from "styled-components";
import InputWithLabel from "../CommonUI/InputWithLabel";
import Button from "../CommonUI/Button";

const SForm = styled.form`
  background: #e2e1e1;
`;

const LoginForm = () => {
  return (
    <SForm>
      <label htmlFor="id">id</label>
      <InputWithLabel type="text" placeholder="ID" required></InputWithLabel>
      <InputWithLabel
        type="password"
        placeholder="Password"
        required
      ></InputWithLabel>
      <Button>Login</Button>
    </SForm>
  );
};

export default LoginForm;
