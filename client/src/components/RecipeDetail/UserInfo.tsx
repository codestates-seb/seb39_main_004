import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { IPostUserProps } from "../../types/interface";
import { userSession } from "../../redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatchHook";
import Swal from "sweetalert2";

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
  @media ${({ theme }) => theme.device.mobile} {
    bottom: -10px;
  }
`;

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid var(--pale-gray);
  display: block;
  margin: 0 auto 5px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 80px;
    height: 80px;
  }
`;

const SUserId = styled.div`
  display: inline-block;
  color: #333;
  margin-top: 15px;
  font-size: 1.7rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.3rem;
  }
`;

const SFollowBtn = styled.div`
  display: inline-block;
  text-align: center;
  margin-left: 15px;
  padding: 8px 10px;
  background-color: var(--greenish-grey);
  color: var(--red);
  font-size: 0.6rem;
  border-radius: 20px;
  vertical-align: 6px;
  @media ${({ theme }) => theme.device.mobile} {
    vertical-align: 3px;
  }
`;

const SButtonContaienr = styled.div`
  position: absolute;
  right: 0;
  bottom: 40px;
  font-size: 0.8rem;
  cursor: pointer;
  > :first-child {
    margin-right: 10px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    bottom: 60px;
    font-size: 0.7rem;
  }
`;

const PostUserInfo = ({ name, imgProfileUrl }: IPostUserProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sessionStatus, userInfo } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (sessionStatus) dispatch(userSession());
    console.log("레시피 세션 체크: ", sessionStatus);
  }, [sessionStatus]);

  const DeleteHandler = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/api/v1/recipe/${id}/delete`).then(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "삭제되었습니다.",
          });

          navigate("/");
        });
      } catch (error) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "레시피 삭제에 실패했습니다.",
        });
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
          <SFollowBtn>Follow</SFollowBtn>
          <SButtonContaienr>
            {userInfo.name && name === userInfo.name ? (
              <>
                <span>
                  <Link to={`/edit/${id}`}>Edit</Link>
                </span>
                <span role="presentation" onClick={DeleteHandler}>
                  Delete
                </span>
              </>
            ) : null}
          </SButtonContaienr>
        </SUserInfo>
      </SContainer>
    </>
  );
};

export default PostUserInfo;
