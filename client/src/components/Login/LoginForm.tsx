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
      <SH1>로그인</SH1>
      <InputWithLabel
        label="아이디"
        name="id"
        placeholder="ID"
        type="text"
        required
      />
      <InputWithLabel
        label="비밀번호"
        name="password"
        placeholder="Password"
        type="password"
        required
      />
      <Button>로그인</Button>
    </SForm>
  );
};

export default LoginForm;
