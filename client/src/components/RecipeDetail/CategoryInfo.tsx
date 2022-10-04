import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PostTag } from "../../components/CommonUI";
import { BsFillBookmarkCheckFill, BsBookmark } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
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
    width: 28px;
    vertical-align: -8px;
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
  .share {
    margin-right: 15px;
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
    font-size: 1.6rem;
  }
  p {
    padding-right: 10px;
  }
`;

const SIconBox = styled.div`
  display: flex;
  gap: 40px;
  font-size: 1.2rem;
`;

const STagContainer = styled.div`
  margin-bottom: 40px;
`;

const PostInfo = ({
  category,
  tags,
  stars,
  views,
  createDate,
}: IPostCategoryProps) => {
  const { id } = useParams();
  const [bookCheck, setBookCheck] = useState(false);

  const doBookmark = async () => {
    axios.post(`/api/v1/recipe/${id}/bookmark`);
    try {
      setBookCheck(true);
    } catch (error) {
      console.log(error);
    }
  };
  const undoBookmark = async () => {
    axios.post(`/api/v1/recipe/${id}/bookmark/undo`);
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
          <h1>#{category}</h1>
          <div>
            <FiDownload size={25} className="share" />
            {bookCheck ? (
              <BsFillBookmarkCheckFill onClick={undoBookmark} size={24} />
            ) : (
              <BsBookmark onClick={doBookmark} size={24} />
            )}
          </div>
        </SHeader>
        <STagContainer>
          {tags.map((i) => (
            <PostTag key={i.id} name={i.name} />
          ))}
        </STagContainer>
        <SIconBox>
          <div>
            <img src={view} alt="view" />
            {views}
          </div>
          <div>
            <img src={star} alt="stastarr" />
            {stars}
          </div>
        </SIconBox>
        <p className="date">
          <span>등록일</span>
          {createDate}
        </p>
      </SCtagoryContainer>
    </>
  );
};

export default PostInfo;
