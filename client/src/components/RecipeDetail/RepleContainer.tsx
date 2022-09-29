import React from "react";
import styled from "styled-components";
import { SortButtons } from "../../components/CommonUI";
import RepleUpload from "./RepleUpload";
import RepleList from "./RepleList";
import { detailData } from "../../pages/Recipe/data";

const SRepleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  font-size: 1.2rem;
`;

const RepleContainer = () => {
  const data = detailData;
  const sortValues = ["최신순", "평점순"];

  return (
    <>
      <RepleUpload />
      <SRepleHeader>
        총 {data.replyList.length}개의 리뷰가 있습니다.
        <SortButtons sortValues={sortValues} />
      </SRepleHeader>

      {data.replyList.map((i) => (
        <RepleList
          key={i.replyId}
          replyId={i.replyId}
          replyBody={i.replyBody}
          createdAt={i.createdAt}
          user={i.user}
        />
      ))}
    </>
  );
};

export default RepleContainer;
