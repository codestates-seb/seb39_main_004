import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { IPostUserProps } from "../../types/interface";
import { userSession } from "../../redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatchHook";
import Swal from "sweetalert2";
import useMessage from "../../hooks/useMessage";

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

const SFollowContainer = styled.div`
  display: inline-block;
  vertical-align: 6px;
  @media ${({ theme }) => theme.device.mobile} {
    vertical-align: 4px;
  }
`;

const SFollowBtn = styled.div`
  text-align: center;
  margin-left: 15px;
  padding: 8px 10px;
  background-color: var(--greenish-grey);
  color: var(--red);
  font-size: 0.6rem;
  border-radius: 20px;
  cursor: pointer;
`;

const SUnFollowBtn = styled.div`
  text-align: center;
  margin-left: 15px;
  padding: 8px 10px;
  background-color: var(--red);
  color: var(--greenish-grey);
  font-size: 0.6rem;
  border-radius: 20px;
  cursor: pointer;
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

const PostUserInfo = ({
  userId,
  name,
  imgProfileUrl,
  followed,
}: IPostUserProps) => {
  const message = useMessage(2000);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sessionStatus = useAppSelector((state) => state.user.sessionStatus);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [follow, setFollow] = useState(followed);
  const { id } = useParams();

  useEffect(() => {
    if (sessionStatus) dispatch(userSession());
    // console.log("레시피 세션 체크: ", sessionStatus);
  }, [sessionStatus, follow]);

  const doFollow = async () => {
    try {
      await axios.post(`/api/v1/follow/${userId}`);
      setFollow(true);
    } catch (error) {
      message.fire({
        icon: "error",
        title: "팔로우 추가에 실패했습니다.  \n 로그인을 해주세요.",
      });
    }
  };

  const undoFollow = async () => {
    try {
      await axios.post(`/api/v1/follow/undo/${userId}`);
      setFollow(false);
    } catch (error) {
      message.fire({
        icon: "error",
        title: "팔로우 해제에 실패했습니다.",
      });
    }
  };

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
          {name && <SUserId>{name}</SUserId>}
          {userInfo &&
            (name === userInfo.name ? null : (
              <SFollowContainer>
                {follow ? (
                  <SUnFollowBtn onClick={undoFollow} role="presentation">
                    UnFollow
                  </SUnFollowBtn>
                ) : (
                  <SFollowBtn onClick={doFollow} role="presentation">
                    Follow
                  </SFollowBtn>
                )}
              </SFollowContainer>
            ))}

          {sessionStatus && (
            <SButtonContaienr>
              {userInfo &&
                (name === userInfo.name ? (
                  <>
                    <span>
                      <Link to={`/recipe/${id}`}>Edit</Link>
                    </span>
                    <span role="presentation" onClick={DeleteHandler}>
                      Delete
                    </span>
                  </>
                ) : null)}
            </SButtonContaienr>
          )}
        </SUserInfo>
      </SContainer>
    </>
  );
};

export default PostUserInfo;
