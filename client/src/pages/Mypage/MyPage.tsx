/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MyPageUser from "./MyPageUser/MyPageUser";
import MyPageRecipe from "./MyPageRecipe/MyPageRecipe";
import MyPageReview from "./MyPageReview/MyPageReview";
import MyPageBookMark from "./MyPageBookMark/MyPageBookMark";
import MyPageFollow from "./MyPageFreind/MyPageFollow";
import MyPageFollowing from "./MyPageFreind/MyPageFollowing";
import { userSession } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatchHook";
import axios from "axios";

const SContainer = styled.div`
  padding-top: 50px;
`;

const STabContainer = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-bottom: 30px;
  border-bottom: 3px solid var(--pale-green);
`;

const STabMenu = styled.ul`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  @media ${({ theme }) => theme.device.desktop} {
    width: 100%;
    align-items: center;
    display: inline-grid;
    grid-auto-flow: column;
  }
  .submenu {
    padding: 10px 30px;
    font-size: 1.1rem;
    text-align: center;
    cursor: pointer;
    @media ${({ theme }) => theme.device.desktop} {
      width: 100%;
      font-size: 1rem;
      padding: 10px;
    }
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 0.8rem;
      padding: 10px 10px;
    }
  }
  .focused {
    position: relative;
    :after {
      content: "";
      position: absolute;
      right: 0;
      left: 0;
      bottom: -3px;
      display: block;
      border-bottom: 3px solid var(--red);
    }
  }
`;

const MyPage = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  // const { sessionStatus, userInfo } = useAppSelector((state) => state.user);
  const [currentTab, setCurrentTab] = useState(0);
  const [recipeData, setRecipeData] = useState<any[]>([]); // 레시피 데이터
  const [reviewData, setReviewData] = useState<any[]>([]); // 후기 데이터
  const [bookMarkData, setBookMarkData] = useState<any[]>([]); // 북마크 데이터
  const [followData, setFollowData] = useState<any[]>([]); // 팔로우 데이터
  const [followingData, setFollowingData] = useState<any[]>([]); // 팔로잉 데이터

  const axiosMyPageData = async (userNum: string) => {
    switch (currentTab) {
      case 0:
        {
          // 레시피
          const { data } = await axios.get(`/api/v1/user/${userNum}/recipe/1`);
          setRecipeData(data.data);
        }
        break;
      case 1:
        {
          // 요리 후기
          const { data } = await axios.get(`/api/v1/user/${userNum}/review/1`);
          setReviewData(data.data);
        }
        break;
      case 2:
        {
          // 북마크
          const { data } = await axios.get(
            `/api/v1/user/${userNum}/bookmark/1`
          );
          setBookMarkData(data.data);
        }
        break;
      case 3:
        {
          // 팔로워
          const { data } = await axios.get(
            `/api/v1/user/${userNum}/follow-list`
          );
          setFollowData(data.data);
        }
        break;
      case 4:
        {
          // 팔로잉
          const { data } = await axios.get(
            `/api/v1/user/${userNum}/following-list`
          );
          setFollowingData(data.data);
        }
        break;
    }
  };

  useEffect(() => {
    dispatch(userSession());
    axiosMyPageData(userInfo.id);
    // console.log("마이페이지 세션 체크: ", sessionStatus);
  }, [currentTab]);

  const menuArr = [
    {
      id: 0,
      name: "나의 레시피",
      content: <MyPageRecipe recipeData={recipeData} />,
    },
    {
      id: 1,
      name: "요리후기",
      content: <MyPageReview reviewData={reviewData} />,
    },
    {
      id: 2,
      name: "북마크",
      content: <MyPageBookMark bookMarkData={bookMarkData} />,
    },
    {
      id: 3,
      name: "팔로워",
      content: <MyPageFollow followData={followData} />,
    },
    {
      id: 4,
      name: "팔로잉",
      content: (
        <MyPageFollowing
          followingData={followingData}
          setFollowingData={setFollowingData}
        />
      ),
    },
  ];
  return (
    <>
      <SContainer>
        <MyPageUser />
        <STabContainer>
          <STabMenu>
            {menuArr.map((item) => {
              return (
                <li
                  role="presentation"
                  key={item.id}
                  className={
                    currentTab === item.id ? "submenu focused" : "submenu"
                  }
                  onClick={() => setCurrentTab(item.id)}
                >
                  {item.name}
                </li>
              );
            })}
          </STabMenu>
        </STabContainer>
        <div>{menuArr[currentTab].content}</div>
      </SContainer>
    </>
  );
};

export default MyPage;
