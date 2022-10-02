import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Tag } from "../../components/CommonUI";
import UserInfo from "../../components/RecipeDetail/UserInfo";
import IngredientItem from "../../components/RecipeDetail/IngredientInfo";
import CategoryInfo from "../../components/RecipeDetail/CategoryInfo";
import RecipeStep from "../../components/RecipeDetail/RecipeStep";
import RepleContainer from "../../components/RecipeDetail/RepleContainer";
import { IPostResponceProps } from "../../types/interface";

const SThumbNailContainer = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;
const SUserContainer = styled.div``;

const SFollowBtn = styled.div`
  width: 58px;
  margin: 15px auto;
  text-align: center;
  padding: 7px 0;
  background-color: #000;
  color: #fff;
  font-size: 0.7rem;
`;

const SHeaderContainer = styled.div`
  margin: 30px auto 0;
  padding-bottom: 20px;
  text-align: center;
  h1 {
    font-size: 2rem;
  }
`;

const SDesc = styled.p`
  position: relative;
  padding-top: 15px;
  color: var(--gray);
  font-size: 1rem;
`;

const IngredientContainer = styled.div`
  width: 100%;
  h4 {
    color: var(--deep-green);
    font-size: 1.3rem;
    font-weight: bold;
    padding-bottom: 20px;
    padding-left: 20px;
  }
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
  border-bottom: 1px solid var(--pale-green);
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

const SRecipeInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  column-gap: 70px;
  flex-grow: 1;
  padding: 70px 0;
`;

const SRecipeStepContainer = styled.div``;

const RecipeDetail = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [data, setData] = useState<IPostResponceProps[]>([]);
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(`/api/v1/recipe/${id}`);
    setData([data.data]);
  };

  const menuArr = [
    {
      id: 0,
      name: "레시피",
      content: (
        <SRecipeStepContainer>
          {data[0] &&
            data[0].directions.map((i) => (
              <RecipeStep
                key={i.index}
                index={i.index}
                imgDirectionUrl={i.imgDirectionUrl}
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
    <>
      {data[0] && data[0].owner && (
        <>
          <SThumbNailContainer
            src={`${process.env.PUBLIC_URL}/assets/${data[0].imgThumbNailUrl}`}
          />
          <SUserContainer>
            <UserInfo
              name={data[0].owner.name}
              imgProfileUrl={data[0].owner.imgProfileUrl}
            />
          </SUserContainer>
          <SFollowBtn>follow</SFollowBtn>
          <SHeaderContainer>
            <h1>{data[0].title}</h1>
            <SDesc>{data[0].body}</SDesc>
          </SHeaderContainer>
          <STagContainer>
            {data[0].tags.map((i) => (
              <Tag key={i.id} name={i.name} />
            ))}
          </STagContainer>
          <SRecipeInfoContainer>
            <CategoryInfo
              stars={data[0].stars}
              views={data[0].views}
              createDate={data[0].createDate}
            />
            <IngredientContainer>
              <h4>필요한 재료</h4>
              {data[0].ingredients.map((i) => (
                <IngredientItem
                  key={i.index}
                  index={i.index}
                  name={i.name}
                  amount={i.amount}
                  isEssential={i.isEssential}
                />
              ))}
            </IngredientContainer>
          </SRecipeInfoContainer>
          <STabMenu>
            {menuArr.map((item) => {
              return (
                <div
                  role="presentation"
                  key={item.id}
                  className={
                    currentTab === item.id ? "submenu focused" : "submenu"
                  }
                  onClick={() => setCurrentTab(item.id)}
                >
                  {item.name}
                </div>
              );
            })}
          </STabMenu>
          <div>{menuArr[currentTab].content}</div>
        </>
      )}
    </>
  );
};

export default RecipeDetail;
