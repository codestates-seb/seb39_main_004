import styled from "styled-components";
import { Button, StyledInput } from "../../components/CommonUI";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const SForm = styled.form``;

const SH1 = styled.h1`
  text-align: center;
  padding: 20px;
  font-size: 30px;
`;

const SErrorMsg = styled.div`
  margin: 10px 0;
`;

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data.email, data.password);

    const axiosConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    };

    const axiosBody = {
      username: data.email,
      password: data.password,
    };

    axios
      .post("/api/v1/auth/login", qs.stringify(axiosBody), axiosConfig)
      .then((response) => {
        console.log(response); // 구현 완료 후 제거

        if (response.status === 200) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SForm onSubmit={handleSubmit(onSubmit)}>
      <SH1>로그인</SH1>
      <StyledInput>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="text"
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^\S+@\S+\.\S+/,
              message: "이메일 형식을 확인해주세요.",
            },
          })}
        />
        <SErrorMsg>
          {errors.email && <small role="alert">{errors.email.message}</small>}
        </SErrorMsg>
      </StyledInput>
      <StyledInput>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "8자리 이상을 입력해주세요.",
            },
          })}
        />
        <SErrorMsg>
          {errors.password && (
            <small role="alert">{errors.password.message}</small>
          )}
        </SErrorMsg>
      </StyledInput>
      <Button type="submit" disabled={isSubmitting}>
        로그인
      </Button>
    </SForm>
  );
};

export default LoginForm;
