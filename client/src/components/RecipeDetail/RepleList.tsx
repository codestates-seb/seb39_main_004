import React from "react";
import styled from "styled-components";
import axios from "axios";
import useMessage from "../../hooks/useMessage";
import { useParams } from "react-router-dom";
import SimpleRating from "./SimpleRating";
import { useAppSelector } from "../../hooks/dispatchHook";

const SContainer = styled.div`
  position: relative;
  padding: 20px;
  background-color: var(--greenish-grey);
  margin-bottom: 15px;
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
  gap: 20px;
  .user-image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: inline-block;
    border: 1px solid var(--pale-gray);
  }
  .info-name {
    display: flex;
    gap: 0.8rem;
    font-size: 1.1rem;
    color: #000;
  }
  .time {
    font-size: 0.8rem;
    color: var(--deep-gray);
    padding-right: 10px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    .user-image {
      width: 60px;
      height: 60px;
    }
    .info-name {
      display: -webkit-box;
      font-size: 1rem;
    }
  }
`;

const SDeleteButton = styled.div`
  position: absolute;
  right: 20px;
  top: 50px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const SReplyContainer = styled.div`
  margin-top: 14px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.9rem;
    line-height: 1.5rem;
  }
`;

interface RepleDataProps {
  replyId: number;
  replyBody: string;
  createDate: string;
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
  createDate,
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
          <div>
            <img
              className="user-image"
              src={`${process.env.PUBLIC_URL}/assets/${user.imgProfileUrl}`}
              alt="profile"
            />
          </div>
          <div>
            <p className="info-name">
              <span>{user.name}</span>
              <SimpleRating stars={stars} />
              <span className="time">{createDate.slice(0, 16)}</span>
            </p>
            <SReplyContainer>{replyBody}</SReplyContainer>
          </div>
        </SUserInfo>
        {userInfo && userInfo.name === user.name ? (
          <SDeleteButton onClick={onDeleteComment}>Delete</SDeleteButton>
        ) : null}
      </SUserBody>
    </SContainer>
  );
};

export default RepleContent;
