import React from "react";
import styled from "styled-components";
import { SortButtons } from "../../components/CommonUI";
import {
  Carousel,
  RecipeCategory,
  RecipeItemList,
} from "../../components/Main";

const SMainLayout = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 100px;
`;

const SSectionLayout = styled.section`
  margin: 70px 0;
  padding: 0 150px;

  // 임시 반응형 작업 (추후 중단점 수정 필요)
  @media screen and (max-width: 1000px) {
    padding: 0 20px;
  }
`;

const Main = () => {
  const sortValues = ["최신순", "조회순", "평점순"];

  return (
    <SMainLayout>
      <Carousel />
      <SSectionLayout>
        <RecipeCategory />
        <SortButtons sortValues={sortValues} />
        <RecipeItemList />
      </SSectionLayout>
    </SMainLayout>
  );
};

export default Main;
