import styled from "styled-components";
import {
  StyledInput,
  TextareaWithLabel,
  Button,
} from "../../components/CommonUI";
import { useForm, SubmitHandler } from "react-hook-form";
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
  email: string;
  nickname: string;
};

const SNSInfoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (/*data*/) => {
    // console.log(data);
  };

  return (
    <SForm onSubmit={handleSubmit(onSubmit)}>
      <SSignLogo>
        <img src={signlogo} alt="loginlogo" />
      </SSignLogo>
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

      <TextareaWithLabel
        label="자기소개"
        name="bio"
        placeholder="간단한 소개를 적어주세요"
      />
      <Button type="submit" disabled={isSubmitting}>
        회원가입
      </Button>
    </SForm>
  );
};

export default SNSInfoForm;
