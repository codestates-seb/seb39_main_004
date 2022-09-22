import React from "react";
import styled from "styled-components";
import {
  Carousel,
  RecipeCategory,
  RecipeItemList,
} from "../../components/Main";

const SMainLayout = styled.main`
  width: 100%;
`;

const SSectionLayout = styled.section`
  display: flex;
  flex-direction: column;
  margin: 70px 0;
  padding: 0 200px;
`;

const Main = () => {
  return (
    <SMainLayout>
      <Carousel />
      <SSectionLayout>
        <RecipeCategory />
        <RecipeItemList />
      </SSectionLayout>
    </SMainLayout>
  );
};

export default Main;
