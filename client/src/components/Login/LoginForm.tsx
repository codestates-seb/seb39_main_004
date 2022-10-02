import styled from "styled-components";
import { Button, StyledInput } from "../../components/CommonUI";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatchHook";
import { useEffect } from "react";
import SNSLogin from "../../components/Login/SNSLogin";
import loginlogo from "../../assets/icons/loginlogo.svg";

const SForm = styled.form`
  position: relative;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  width: 430px;
  padding: 50px 60px;
  background-color: #f2f1ea;
`;

const SLoginLogo = styled.div`
  position: absolute;
  top: -45px;
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
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>();

  useEffect(() => {
    // 로그인 성공 시 홈으로 이동
    if (userInfo) navigate("/login");
  }, [userInfo]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const loginData = {
      username: data.email,
      password: data.password,
    };

    dispatch(userLogin(loginData));
  };

  return (
    <SForm onSubmit={handleSubmit(onSubmit)}>
      <SLoginLogo>
        <img src={loginlogo} alt="loginlogo" />
      </SLoginLogo>
      <StyledInput>
        <label htmlFor="email">EMAIL</label>
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
        <label htmlFor="password">PASSWORD</label>
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
      <SNSLogin />
    </SForm>
  );
};

export default LoginForm;
