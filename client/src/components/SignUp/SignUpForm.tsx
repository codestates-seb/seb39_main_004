import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, StyledInput } from "../../components/CommonUI";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatchHook";
import { userSignUp } from "../../redux/slices/userSlice";
import signlogo from "../../assets/icons/signlogo.svg";

const SForm = styled.form`
  position: relative;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  width: 430px;
  padding: 50px 60px;
  background-color: #f2f1ea;
  @media ${({ theme }) => theme.device.tablet} {
    width: 320px;
    padding: 30px 20px;
  }
`;

const SSignLogo = styled.div`
  position: absolute;
  top: -45px;
  @media ${({ theme }) => theme.device.tablet} {
    width: 180px;
    top: -32px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 160px;
    top: -30px;
  }
`;
const SErrorMsg = styled.div`
  margin: 10px 0;
`;

type Inputs = {
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { signUpInfo } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (signUpInfo) navigate("/login");
  }, [signUpInfo]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const signUpData = {
      name: data.nickname,
      email: data.email,
      password: data.password,
    };

    dispatch(userSignUp(signUpData));
  };

  return (
    <SForm onSubmit={handleSubmit(onSubmit)}>
      <SSignLogo>
        <img src={signlogo} alt="loginlogo" />
      </SSignLogo>
      <StyledInput>
        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          type="text"
          placeholder="한글, 영문, 숫자 혼용 2~8자"
          {...register("nickname", {
            required: "닉네임을 입력해주세요.",
            pattern: {
              value: /^[가-힣ㄱ-ㅎa-zA-Z0-9]+$/,
              message: "닉네임에 특수문자를 사용할 수 없습니다.",
            },
            maxLength: {
              value: 8,
              message: "8자리 이상 닉네임은 사용할 수 없습니다.",
            },
            minLength: {
              value: 2,
              message: "2자리 이상 닉네임을 작성해주세요.",
            },
          })}
        />
        <SErrorMsg>
          {errors.nickname && (
            <small role="alert">{errors.nickname.message}</small>
          )}
        </SErrorMsg>
      </StyledInput>

      <StyledInput>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="text"
          placeholder="example@email.com"
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
          placeholder="영문, 숫자, 특수문자 혼용 8~16자"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
              message: "8~16자의 영문, 숫자, 특수문자를 포함해야 합니다.",
            },
          })}
        />
        <SErrorMsg>
          {errors.password && (
            <small role="alert">{errors.password.message}</small>
          )}
        </SErrorMsg>
      </StyledInput>

      <StyledInput>
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <input
          id="passwordCheck"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          {...register("passwordCheck", {
            required: "비밀번호를 입력해주세요.",
            validate: (value: string) => {
              const { password } = getValues();
              return password === value || "비밀번호가 일치하지 않습니다.";
            },
          })}
        />
        <SErrorMsg>
          {errors.passwordCheck && (
            <small role="alert">{errors.passwordCheck.message}</small>
          )}
        </SErrorMsg>
      </StyledInput>
      <Button type="submit" disabled={isSubmitting}>
        회원가입
      </Button>
    </SForm>
  );
};

export default SignUpForm;
