import React, { useState } from "react";
import styled from "styled-components";
import { Tag } from "../../components/CommonUI";
import UserInfo from "../../components/RecipeDetail/UserInfo";
import RecipeInfo from "../../components/RecipeDetail/RecipeInfo";
import RecipeStep from "../../components/RecipeDetail/RecipeStep";
import RepleContainer from "../../components/RecipeDetail/RepleContainer";
import { detailData } from "./data";

const SContainer = styled.div`
  padding-top: 50px;
`;

const SHeaderContainer = styled.div`
  margin: 30px auto 0;
  padding-bottom: 20px;
  text-align: center;
  h1 {
    font-size: 2rem;
  }
`;

const SFollowBtn = styled.div`
  width: 58px;
  margin: 0 auto;
  text-align: center;
  padding: 7px 0;
  background-color: #000;
  margin-top: 15px;
  color: #fff;
  font-size: 1rem;
`;

const SDesc = styled.div`
  position: relative;
  padding-top: 10px;
  color: #aaa;
  font-size: 1rem;
`;

const STagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 3px;
`;

const STabMenu = styled.ul`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  margin-bottom: 50px;
  border-bottom: 1px solid var(--pale-gray);
  .submenu {
    padding: 10px 30px;
    cursor: pointer;
  }
  .focused {
    border-top: 3px solid var(--deep-gray);
    border-right: 1px solid var(--pale-gray);
    border-left: 1px solid var(--pale-gray);
  }
`;

const SRecipeStepContainer = styled.div``;

const RecipeDetail = () => {
  const data = detailData;
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    {
      id: 0,
      name: "레시피",
      content: (
        <SRecipeStepContainer>
          {data.directions.map((i) => (
            <RecipeStep
              key={i.direcId}
              direcId={i.direcId}
              image={i.image}
              body={i.body}
            />
          ))}
        </SRecipeStepContainer>
      ),
    },
    {
      id: 1,
      name: "후기",
      content: <RepleContainer />,
    },
  ];

  return (
    <SContainer>
      <UserInfo thumbNail={data.thumbNail} user={data.user} />
      <SFollowBtn>follow</SFollowBtn>
      <SHeaderContainer>
        <h1>{data.recipeTitle}</h1>
        <SDesc>{data.body}</SDesc>
      </SHeaderContainer>
      <STagContainer>
        {data.recipeTags.map((i) => (
          <Tag key={i} name={i} />
        ))}
      </STagContainer>
      <RecipeInfo />
      <STabMenu>
        {menuArr.map((item) => {
          return (
            <div
              role="presentation"
              key={item.id}
              className={currentTab === item.id ? "submenu focused" : "submenu"}
              onClick={() => setCurrentTab(item.id)}
            >
              {item.name}
            </div>
          );
        })}
      </STabMenu>
      <div>{menuArr[currentTab].content}</div>
    </SContainer>
  );
};

export default RecipeDetail;
