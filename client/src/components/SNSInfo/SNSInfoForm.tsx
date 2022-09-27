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

const SNSInfoForm = () => {
  return (
    <SForm onSubmit={onSubmitHandler}>
      <SH1>SNS 회원 가입</SH1>
      <InputWithLabel
        label="이메일"
        name="email"
        placeholder="Email"
        type="email"
      />
      <InputWithLabel
        label="닉네임"
        name="nickName"
        placeholder="Nickname"
        type="text"
      />
      <InputWithLabel
        label="자기소개"
        name="bio"
        placeholder="간단한 소개를 적어주세요"
        type="text"
      />
      <Button>회원가입</Button>
    </SForm>
  );
};

export default SNSInfoForm;
