import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Rating from "./Rating";

const SContainer = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-top: 40px;
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
`;

const RepleUpload = () => {
  const [reple, setReple] = useState("");
  const { id } = useParams();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post(`api/v1/recipe/${id}/review/add`).then((response) => {
      if (response.data.success) {
        alert("댓글 작성이 성공하였습니다.");
        window.location.reload();
      } else {
        alert("댓글 작성이 실패하였습니다.");
      }
    });
  };

  return (
    <SContainer>
      <h2>후기 남기기</h2>
      <SReplyContainer>
        <form onSubmit={onSubmitHandler}>
          <Rating />
          <input
            type="text"
            value={reple}
            onChange={(e) => setReple(e.target.value)}
            placeholder="직접 만들어본 후기를 남겨주세요!"
          />
          <button type="submit">등록</button>
        </form>
      </SReplyContainer>
    </SContainer>
  );
};

export default RepleUpload;
