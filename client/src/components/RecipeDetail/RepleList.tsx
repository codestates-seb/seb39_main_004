import React from "react";
import styled from "styled-components";
import axios from "axios";
import useMessage from "../../hooks/useMessage";
import { useParams } from "react-router-dom";
import SimpleRating from "./SimpleRating";
import { useAppSelector } from "../../hooks/dispatchHook";

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

interface RepleDataProps {
  replyId: number;
  replyBody: string;
  createdAt: string;
  stars: number;
  user: {
    name: string;
    email: string;
    imgProfileUrl: string;
  };
}

const RepleContent = ({
  replyId,
  replyBody,
  createdAt,
  user,
  stars,
}: RepleDataProps) => {
  const message = useMessage(2000);
  const { id } = useParams();
  const { userInfo } = useAppSelector((state) => state.user);

  const onDeleteComment = async () => {
    try {
      await axios.delete(`/api/v1/recipe/${id}/review/${replyId}/delete`);
      message.fire({
        icon: "success",
        title: "후기가 삭제되었습니다.",
      });
    } catch {
      message.fire({
        icon: "error",
        title: "후기 삭제에 실패했습니다.",
      });
    }
  };

  return (
    <SContainer>
      <SUserBody>
        <SUserInfo>
          <img
            className="user-image"
            src={`${process.env.PUBLIC_URL}/assets/${user.imgProfileUrl}`}
            alt="profile"
          />
          <span className="info-name">{user.name} </span>
          <span className="time">{createdAt}</span>
          <SimpleRating stars={stars} />
        </SUserInfo>
        {userInfo.name === user.name ? (
          <SDeleteButton onClick={onDeleteComment}>Delete</SDeleteButton>
        ) : null}
      </SUserBody>
      <SReplyContainer>{replyBody}</SReplyContainer>
    </SContainer>
  );
};

export default RepleContent;
