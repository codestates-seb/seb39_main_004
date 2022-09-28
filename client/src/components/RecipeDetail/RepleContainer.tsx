import React from "react";
import styled from "styled-components";
import RepleUpload from "./RepleUpload";
import RepleList from "./RepleList";
import { detailData } from "../../pages/Recipe/data";

const SRepleHeader = styled.div`
  margin-top: 30px;
  font-size: 1.2rem;
`;

const RepleContainer = () => {
  const data = detailData;
  return (
    <>
      <RepleUpload />
      <SRepleHeader>
        총 {data.replyList.length}개의 리뷰가 있습니다.
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
