import styled from "styled-components";
import React, { FormEvent } from "react";
import { Button } from "../../components/CommonUI";
import { useForm, SubmitHandler } from "react-hook-form";

const SForm = styled.form``;

const SH1 = styled.h1`
  text-align: center;
  padding: 20px;
  font-size: 30px;
`;

const SInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;

  label {
    font-size: 1rem;
    color: #c9c5c5;
    margin-bottom: 0.25rem;
  }

  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid gray;
    padding: 0.4rem;

    ::placeholder {
      color: #bbb;
    }
  }

  input:focus {
    outline: none;
  }

  small {
    color: var(--red);
  }
`;

const SErrorMsg = styled.div`
  margin: 10px 0;
`;

// const onSubmitHandler = (e: FormEvent) => {
//   e.preventDefault();
// };

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  return (
    <SForm onSubmit={handleSubmit(onSubmit)}>
      <SH1>로그인</SH1>
      <SInput>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="text"
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식을 확인해주세요.",
            },
          })}
        />
        <SErrorMsg>
          {errors.email && <small role="alert">{errors.email.message}</small>}
        </SErrorMsg>
      </SInput>
      <SInput>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "8자리 이상 비밀번호를 사용하세요.",
            },
          })}
        />
        <SErrorMsg>
          {errors.password && (
            <small role="alert">{errors.password.message}</small>
          )}
        </SErrorMsg>
      </SInput>
      <Button type="submit" disabled={isSubmitting}>
        로그인
      </Button>
    </SForm>
  );
};

export default LoginForm;
