import React, { useState } from "react";
import styled from "styled-components";
import MyPageUser from "./MyPageUser/MyPageUser";
import MyPageRecipe from "./MyPageRecipe/MyPageRecipe";
import MyPageReview from "./MyPageReview/MyPageReview";
import MyPageBookMark from "./MyPageBookMark/MyPageBookMark";
import MyPageFollow from "./MyPageFreind/MyPageFollow";
import MyPageFollowing from "./MyPageFreind/MyPageFollowing";

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
  border-bottom: 1px solid var(--pale-gray);
`;

const STabMenu = styled.ul`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  .submenu {
    padding: 16px 30px;
    cursor: pointer;
  }
  .focused {
    border-top: 3px solid var(--deep-gray);
    border-right: 1px solid var(--pale-gray);
    border-left: 1px solid var(--pale-gray);
  }
`;

const MyPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    {
      id: 0,
      name: "나의 레시피",
      content: <MyPageRecipe />,
    },
    {
      id: 1,
      name: "요리후기",
      content: <MyPageReview />,
    },
    {
      id: 2,
      name: "북마크",
      content: <MyPageBookMark />,
    },
    {
      id: 3,
      name: "팔로워",
      content: <MyPageFollow />,
    },
    {
      id: 4,
      name: "팔로잉",
      content: <MyPageFollowing />,
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
