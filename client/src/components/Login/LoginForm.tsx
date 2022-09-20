import styled from "styled-components";
import React, { FormEvent } from "react";
import { InputWithLabel, Button } from "../../components/CommonUI";

const SForm = styled.form``;

const SH1 = styled.h1`
  text-align: center;
  padding: 20px;
  font-size: 30px;
`;

const onSubmitHandler = (e: FormEvent) => {
  e.preventDefault();
};

const LoginForm = () => {
  return (
    <SForm onSubmit={onSubmitHandler}>
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
    </SForm>
  );
};

export default LoginForm;
