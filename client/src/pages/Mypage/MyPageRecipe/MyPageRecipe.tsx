import React from "react";
import styled from "styled-components";
import { SortButtons } from "../../../components/CommonUI/";
import { IMyRecipeData } from "../../../types/interface";
import { Link } from "react-router-dom";

const SContainer = styled.div`
  display: grid;
  grid-template-columns: 130px auto;
  -webkit-column-gap: 20px;
  column-gap: 20px;
  padding: 20px;
  margin: 20px 0;
  background-color: var(--greenish-grey);
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 100px auto;
    padding: 10px;
    margin: 10px 0;
  }
`;
const RecipeImg = styled.img`
  display: inline-block;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  background-color: var(--pale-gray);
  width: 130px;
  height: 130px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100px;
    height: 100px;
  }
`;

const RecipeInfo = styled.div`
  padding-top: 30px;
  h2 {
    font-size: 1.1rem;
    padding-bottom: 15px;
  }
  p {
    color: var(--deep-gray);
    font-size: 0.9rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding-top: 20px;
    h2 {
      font-size: 1rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;

const SEmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;
`;

const MyPageRecipe = ({ recipeData }: IMyRecipeData) => {
  const sortValues = ["최신순", "조회순", "평점순"];

  return (
    <>
      <SortButtons sortValues={sortValues} />
      {recipeData.length > 0 ? (
        recipeData.map((data) => (
          <Link to={`/post/${data.id}`} key={data.id}>
            <SContainer>
              <RecipeImg
                src={`${process.env.PUBLIC_URL}/assets/${data.imgThumbNailUrl}`}
              />
              <RecipeInfo>
                <h2> {data.title}</h2>
                <p>{data.createDate}</p>
              </RecipeInfo>
            </SContainer>
          </Link>
        ))
      ) : (
        <SEmptyContainer>
          <div>작성한 레시피가 없습니다.</div>
        </SEmptyContainer>
      )}
    </>
  );
};

export default MyPageRecipe;
