import React from "react";
import styled from "styled-components";
import share from "../../assets/icons/share.svg";
import bookmark from "../../assets/icons/bookmark.svg";
import view from "../../assets/icons/view.svg";
import star from "../../assets/icons/star.svg";
import { IPostCategoryProps } from "../../types/interface";

const SCtagoryContainer = styled.div`
  padding: 20px;
  background-color: var(--deep-green);
  color: #fff;
  p {
    margin-bottom: 10px;
  }
  img {
    width: 27px;
    vertical-align: middle;
    :first-child {
      margin-right: 10px;
    }
  }
  .date {
    padding-top: 20px;
    font-size: 0.8rem;
    span {
      padding-right: 10px;
    }
  }
`;

const SHeader = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding-bottom: 20px;
  h1 {
    font-size: 1.3rem;
  }
  p {
    padding-right: 10px;
  }
`;

const PostInfo = ({ stars, views, createDate }: IPostCategoryProps) => {
  return (
    <>
      <SCtagoryContainer>
        <SHeader>
          <h1>카테고리</h1>
          <div>
            <img src={share} alt="share" />
            <img src={bookmark} alt="bookmark" />
          </div>
        </SHeader>
        <p>
          <img src={view} alt="view" />
          {views}
        </p>
        <p>
          <img src={star} alt="stastarr" />
          {stars}
        </p>
        <p className="date">
          <span>등록일</span>
          {createDate}
        </p>
      </SCtagoryContainer>
    </>
  );
};

export default PostInfo;
