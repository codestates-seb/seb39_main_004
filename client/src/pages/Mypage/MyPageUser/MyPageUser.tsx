/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { userSession } from "../../../redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../../hooks/dispatchHook";
import { IUserData } from "../../../types/interface";
import { TypeOfFileList } from "../../../types/type";
import { ThumbNailUploader } from "../../../components/NewRecipe/indexNewRecipe";
import useMessage from "../../../hooks/useMessage";

const SContainer = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 20px;
  margin-bottom: 30px;
  h2 {
    font-size: 1.5rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 100px 1fr;
  }
`;

const STextInfo = styled.div`
  position: relative;
  h2 {
    padding-bottom: 30px;
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 1.2rem;
    }
  }
  p {
    padding-bottom: 40px;
    @media ${({ theme }) => theme.device.mobile} {
      padding-bottom: 15px;
    }
  }
  span {
    color: var(--deep-gray);
    font-size: 1rem;
    display: inline-grid;
    place-items: center;
    grid-template-columns: auto auto;
    column-gap: 20px;
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 0.8rem;
    }
  }
`;

const SButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  color: var(--deep-gray);
  font-size: 0.9rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.7rem;
  }
`;

const MyPageUser = () => {
  const [userData, setUserData] = useState<IUserData | undefined>();
  const [profileFile, setProfileFile] = useState<TypeOfFileList>();
  const message = useMessage(2000);
  const dispatch = useAppDispatch();
  const { sessionStatus, userInfo } = useAppSelector((state) => state.user);

  const updateProfile = async () => {
    const formdata = new FormData();

    if (profileFile) {
      formdata.append("imgProfile", profileFile);
    } else {
      message.fire({
        icon: "question",
        title: "????????? ???????????? ??????????????????.",
      });
      return;
    }

    await axios.post(`api/v1/user/upload/profile`, formdata, {
      headers: { "content-type": "multipart/form-data" },
    });

    try {
      message.fire({
        icon: "success",
        title: "???????????? ?????? ???????????????.",
      });
    } catch (error) {
      message.fire({
        icon: "error",
        title: "????????? ????????? ??????????????????. \n?????? ??????????????????.",
      });
    }
  };

  const axiosUserData = async (userNum: string) => {
    const { data } = await axios.get(`/api/v1/user/${userNum}`);
    setUserData(data);
  };

  useEffect(() => {
    if (sessionStatus) dispatch(userSession());
    axiosUserData(userInfo.id);
  }, []);

  return (
    <SContainer>
      {userData && (
        <ThumbNailUploader
          isMypage={true}
          resThumbNailImgUrl={userData.user.imgProfileUrl}
          setThumbNail={setProfileFile}
        ></ThumbNailUploader>
      )}
      <STextInfo>
        <h2>{userData && userData.user.name}</h2>
        <p>{userData && userData.user.bio}</p>
        <span>????????? {userData && userData.followerCount}</span>
        <span>????????? {userData && userData.followingCount}</span>
        <SButton onClick={updateProfile}>????????? ??????</SButton>
      </STextInfo>
    </SContainer>
  );
};

export default MyPageUser;
