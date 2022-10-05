import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PostTag } from "../../components/CommonUI";
import { BsFillBookmarkCheckFill, BsBookmark } from "react-icons/bs";
import view from "../../assets/icons/view.svg";
import star from "../../assets/icons/star.svg";
import { IPostCategoryProps } from "../../types/interface";
import axios from "axios";
import useMessage from "../../hooks/useMessage";

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
  @media ${({ theme }) => theme.device.tablet} {
    svg {
      width: 22px;
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
    font-size: 1.6rem;
  }
  p {
    padding-right: 10px;
  }
  @media ${({ theme }) => theme.device.tablet} {
    h1 {
      font-size: 1.2rem;
    }
  }
`;

const STagContainer = styled.div`
  margin-bottom: 40px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: 20px;
  }
`;

const SIconBox = styled.div`
  display: flex;
  gap: 40px;
  font-size: 1.2rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.8rem;
    img {
      width: 24px;
      vertical-align: -7px;
    }
  }
`;

const SBookMark = styled.div`
  cursor: pointer;
`;

const PostInfo = ({
  stars,
  views,
  createDate,
  bookmarked,
  category,
  tags,
}: IPostCategoryProps) => {
  const [bookCheck, setBookCheck] = useState(bookmarked);
  const { id } = useParams();
  const message = useMessage(2000);

  const doBookmark = async () => {
    try {
      await axios.post(`/api/v1/recipe/${id}/bookmark/`);
      setBookCheck(true);
    } catch (error) {
      message.fire({
        icon: "error",
        title: "북마크 추가에 실패했습니다. \n 로그인을 해주세요.",
      });
    }
  };

  const undoBookmark = async () => {
    try {
      axios.post(`/api/v1/recipe/${id}/bookmark/undo/`);
      setBookCheck(false);
    } catch (error) {
      message.fire({
        icon: "error",
        title: "북마크 해제에 실패했습니다.",
      });
    }
  };
  useEffect(() => {
    // 북마크
  }, [bookCheck]);

  return (
    <>
      <SCtagoryContainer>
        <SHeader>
          <h1>#{category}</h1>
          <SBookMark>
            {/* TODO: 추후 공유 기능 구현 */}
            {/* <FiDownload size={25} className="share" /> */}
            {bookCheck ? (
              <BsFillBookmarkCheckFill onClick={undoBookmark} size={24} />
            ) : (
              <BsBookmark onClick={doBookmark} size={24} />
            )}
          </SBookMark>
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
