import React from "react";
import styled from "styled-components";
import Rating from "./Rating";

const SContainer = styled.div`
  padding: 20px 0;
`;

const SUserBody = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

const SUserInfo = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  .user-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: inline-block;
    border: 1px solid var(--pale-gray);
  }
  .info-name {
    font-size: 17px;
    margin-right: 10px;
    margin-left: 10px;
    font-weight: normal;
    color: var(--red);
  }
  .time {
    font-size: 0.8rem;
    color: var(--deep-gray);
    padding-right: 10px;
  }
`;

const SDeleteButton = styled.div`
  display: grid;
  align-items: flex-start;
  font-size: 0.8rem;
  cursor: pointer;
`;

const SReplyContainer = styled.div`
  margin-top: 20px;
`;

interface Prop {
  replyId: number;
  replyBody: string;
  createdAt: string;
  user: {
    ninkname: string;
    email: string;
    userImage: string;
  };
}

const RepleContent = ({ replyBody, createdAt, user }: Prop) => {
  return (
    <SContainer>
      <SUserBody>
        <SUserInfo>
          <img className="user-image" src={user.userImage} alt="profile" />
          <span className="info-name">{user.ninkname} </span>
          <span className="time">{createdAt}</span>
          <Rating />
        </SUserInfo>
        <SDeleteButton>Delete</SDeleteButton>
      </SUserBody>
      <SReplyContainer>{replyBody}</SReplyContainer>
    </SContainer>
  );
};

export default RepleContent;
