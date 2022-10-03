import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import share from "../../assets/icons/share.svg";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
import view from "../../assets/icons/view.svg";
import star from "../../assets/icons/star.svg";
import { IPostCategoryProps } from "../../types/interface";
import axios from "axios";

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
  const { id } = useParams();
  const [bookCheck, setBookCheck] = useState(false);

  const doBookmark = async () => {
    console.log(bookCheck);
    console.log(id);
    axios.post(`https://www.mmz.today:8080/api/v1/recipe/${id}/bookmark`);
    try {
      setBookCheck(true);
    } catch (error) {
      console.log(error);
    }
  };
  const undoBookmark = async () => {
    console.log("ㅇ어", bookCheck);
    console.log(id);
    axios.post(`https://www.mmz.today:8080/api/v1/recipe/${id}/bookmark/undo`);
    try {
      setBookCheck(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SCtagoryContainer>
        <SHeader>
          <h1>카테고리</h1>
          <div>
            <img src={share} alt="share" />
            {bookCheck ? (
              <BsBookmarkCheckFill onClick={undoBookmark} size={30} />
            ) : (
              <BsBookmarkPlus onClick={doBookmark} size={30} />
            )}
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
