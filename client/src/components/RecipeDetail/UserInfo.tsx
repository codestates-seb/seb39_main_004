import React from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { IPostUserProps } from "../../types/interface";

const SContainer = styled.div`
  position: relative;
  padding: 0 0 75px;
`;

const SUserInfo = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
  height: 130px;
`;

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid var(--pale-gray);
  display: block;
  margin: 0 auto 5px;
`;

const SUserId = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  color: #333;
  margin-top: 15px;
  font-size: 1.3rem;
`;

const SButtonContaienr = styled.div`
  position: absolute;
  right: 0;
  bottom: 40px;
  margin-top: 15px;
  font-size: 0.8rem;
  cursor: pointer;
  > :first-child {
    margin-right: 10px;
  }
`;
const PostUserInfo = ({ name, imgProfileUrl }: IPostUserProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const DeleteHandler = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const res = await axios.delete(`/api/v1/recipe/${id}/delete`);
        if (res.data.success) {
          console.log(res.data);
          alert("레시피가 삭제되었습니다.");
          navigate("/");
        }
      } catch (error) {
        alert("레시피 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <>
      <SContainer>
        <SUserInfo>
          <ProfileImg
            src={`${process.env.PUBLIC_URL}/assets/${imgProfileUrl}`}
          />
          <SUserId>{name}</SUserId>
          <SButtonContaienr>
            <span>
              <Link to={`/api/v1/recipe/${id}/edit`}>Edit</Link>
            </span>
            <span role="presentation" onClick={DeleteHandler}>
              Delete
            </span>
          </SButtonContaienr>
        </SUserInfo>
      </SContainer>
    </>
  );
};

export default PostUserInfo;
