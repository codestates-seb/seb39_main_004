/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SortButtons } from "../../components/CommonUI";
import RepleUpload from "./RepleUpload";
import RepleList from "./RepleList";
import useMessage from "../../hooks/useMessage";
import axios from "axios";

const SRepleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 1rem;
  color: var(--deep-gray);
`;

const RepleContainer = () => {
  const sortValues = ["최신순", "평점순"];
  const [reple, setReple] = useState<any[]>([]);
  const { id } = useParams();
  const message = useMessage(2000);

  const getAllComment = async () => {
    try {
      const { data } = await axios.get(`/api/v1/recipe/${id}/review`);
      setReple(data.data);
    } catch {
      message.fire({
        icon: "error",
        title: "후기 로딩에 실패했습니다.",
      });
    }
  };

  useEffect(() => {
    getAllComment();
  }, [reple]);

  return (
    <>
      <RepleUpload />
      <SRepleHeader>
        총 {reple.length}개의 리뷰가 있습니다.
        <SortButtons sortValues={sortValues} />
      </SRepleHeader>

      {reple.map((i) => (
        <RepleList
          key={i.id}
          replyId={i.id}
          replyBody={i.body}
          createDate={i.createDate}
          user={i.owner}
          stars={i.stars}
        />
      ))}
    </>
  );
};

export default RepleContainer;
