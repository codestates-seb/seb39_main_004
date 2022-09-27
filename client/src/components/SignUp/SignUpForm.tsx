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

const SignUpForm = () => {
  return (
    <SForm onSubmit={onSubmitHandler}>
      <SH1>회원가입</SH1>
      <InputWithLabel
        label="닉네임"
        name="nickName"
        placeholder="Nickname"
        type="text"
      />
      <InputWithLabel
        label="이메일"
        name="email"
        placeholder="Email"
        type="email"
      />
      <InputWithLabel
        label="비밀번호"
        name="password"
        placeholder="숫자, 영문 포함 최소 6자 이상"
        type="password"
      />
      <InputWithLabel
        label="비밀번호 확인"
        name="password-confirm"
        placeholder="숫자, 영문 포함 최소 6자 이상"
        type="password"
      />
      <Button>회원가입</Button>
    </SForm>
  );
};

export default SignUpForm;
