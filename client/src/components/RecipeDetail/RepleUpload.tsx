import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Rating from "./Rating";
import { Button } from "../CommonUI";
import axios from "axios";
import useMessage from "../../hooks/useMessage";
import { useParams } from "react-router-dom";

const SContainer = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-top: 40px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    h2 {
      font-size: 1.1rem;
      margin-top: 20px;
    }
  }
`;

const SReplyContainer = styled.div`
  width: 100%;
  form {
    margin-top: 30px;
    margin-bottom: 20px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 7fr 1fr;
    grid-template-rows: 50px;
    gap: 10px;
    input {
      padding: 10px;
      height: 100%;
      border: 1px solid var(--pale-gray);
      &:active,
      &:focus {
        outline: none;
        border: 1px solid var(--deep-gray);
      }
    }
    button {
      height: 100%;
      font-weight: bold;
      color: #fff;
      font-size: 1rem;
      background: var(--red);
    }
  }
  @media ${({ theme }) => theme.device.desktop} {
    form {
      grid-template-columns: 2fr 8fr 2fr;
    }
  }
  @media ${({ theme }) => theme.device.tablet} {
    form {
      display: block;
      margin-top: 10px;
      input {
        width: 100%;
        margin-bottom: 10px;
      }
      button {
        font-size: 0.9rem;
      }
    }
  }
`;

const RepleUpload = () => {
  const [reple, setReple] = useState("");
  const [starClicked, setStarClicked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const score = starClicked.filter(Boolean).length;
  const { id } = useParams();
  const message = useMessage(2000);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (reple !== "") {
        await axios.post(`/api/v1/recipe/${id}/review/add`, {
          body: reple,
          stars: score,
        });
      } else {
        message.fire({
          icon: "error",
          title: "후기 내용을 작성해주세요.",
        });
      }
    } catch {
      message.fire({
        icon: "error",
        title: "로그인 후 시도해주세요.",
      });
    }
    // 후기 등록 후 상태 초기화
    setReple("");
    setStarClicked([false, false, false, false, false]);
  };

  useEffect(() => {
    //
  }, [starClicked]);

  return (
    <SContainer>
      <h2>후기 남기기</h2>
      <SReplyContainer>
        <form onSubmit={onSubmitHandler}>
          <Rating starClicked={starClicked} setStarClicked={setStarClicked} />
          <input
            type="text"
            value={reple}
            onChange={(e) => setReple(e.target.value)}
            placeholder="직접 만들어본 후기를 남겨주세요!"
          />
          <Button type="submit">등록</Button>
        </form>
      </SReplyContainer>
    </SContainer>
  );
};

export default RepleUpload;
