import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import UserInfo from "../../components/RecipeDetail/UserInfo";
import IngredientItem from "../../components/RecipeDetail/IngredientInfo";
import CategoryInfo from "../../components/RecipeDetail/CategoryInfo";
import RecipeStep from "../../components/RecipeDetail/RecipeStep";
import RepleContainer from "../../components/RecipeDetail/RepleContainer";
import { IPostResponceProps } from "../../types/interface";
import recipeLogo from "../../assets/images/Recipe/recipeLogo.svg";

const SThumbNailContainer = styled.img`
  width: 100vw;
  height: 400px;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  object-fit: cover;
  @media ${({ theme }) => theme.device.mobile} {
    height: 270px;
  }
`;

const SUserContainer = styled.div``;

const SLogoRecipe = styled.img`
  position: absolute;
  top: -50px;
  right: 0;
  left: 0;
  margin: 0 auto;
  display: block;
  @media ${({ theme }) => theme.device.tablet} {
    width: 200px;
    top: -35px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 130px;
    top: -23px;
  }
`;

const STopContainer = styled.div`
  position: relative;
  background-color: #f2f1ea;
  padding: 30px;
  margin-top: 8rem;
  margin-bottom: 30px;
  @media ${({ theme }) => theme.device.tablet} {
    margin-top: 6rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding: 20px;
    margin-top: 4rem;
  }
`;

const SHeaderContainer = styled.div`
  margin: 30px auto 0;
  padding-bottom: 20px;
  text-align: center;
  h1 {
    font-size: 2.1rem;
    padding-top: 30px;
    display: inline-block;
  }
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 0;
    padding-bottom: 10px;
    h1 {
      font-size: 1.2rem;
      padding-top: 20px;
    }
  }
`;

const SDesc = styled.p`
  position: relative;
  padding-top: 15px;
  color: var(--gray);
  font-size: 1.1rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.8rem;
    line-height: 1.3rem;
  }
`;

const IngredientContainer = styled.div`
  width: 100%;
  h4 {
    color: var(--deep-green);
    font-size: 1.5rem;
    font-weight: bold;
    padding-bottom: 20px;
    padding-left: 50px;
  }
  @media ${({ theme }) => theme.device.desktop} {
    h4 {
      padding-left: 15px;
    }
  }
  @media ${({ theme }) => theme.device.tablet} {
    margin-top: 30px;
    h4 {
      font-size: 1.2rem;
      padding-bottom: 0;
      padding-left: 0;
    }
  }
`;

const STabMenu = styled.ul`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  margin-bottom: 50px;
  border-bottom: 3px solid var(--pale-green);
  .submenu {
    width: 150px;
    padding: 10px 30px;
    font-size: 1.1rem;
    text-align: center;
    cursor: pointer;
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
      width: 150px;
      border-bottom: 3px solid var(--red);
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: 30px;
    .submenu {
      width: 100%;
      padding: 10px 30px;
      font-size: 0.9rem;
    }
    .focused {
      :after {
        width: 100%;
      }
    }
  }
`;

const SRecipeInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  column-gap: 20px;
  flex-grow: 1;
  padding: 50px 0 30px;
  @media ${({ theme }) => theme.device.desktop} {
    column-gap: 20px;
    padding: 10px 0;
  }
  @media ${({ theme }) => theme.device.tablet} {
    display: block;
  }
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
              userId={data[0].owner.userId}
              name={data[0].owner.name}
              imgProfileUrl={data[0].owner.imgProfileUrl}
              followed={data[0].owner.followed}
            />
          </SUserContainer>
          <STopContainer>
            <SLogoRecipe src={recipeLogo} alt="recipeLogo"></SLogoRecipe>
            <SHeaderContainer>
              <h1>{data[0].title}</h1>
              <SDesc>{data[0].body}</SDesc>
            </SHeaderContainer>
            <SRecipeInfoContainer>
              <CategoryInfo
                bookmarked={data[0].bookmarked}
                stars={data[0].stars}
                views={data[0].views}
                createDate={data[0].createDate}
                tags={data[0].tags}
                category={data[0].category}
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
          </STopContainer>
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
