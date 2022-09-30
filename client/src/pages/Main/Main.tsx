/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SortButtons } from "../../components/CommonUI";
import {
  Carousel,
  RecipeCategory,
  RecipeItemList,
} from "../../components/Main";
import axios from "axios";

const SMainLayout = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SSectionLayout = styled.section`
  margin: 70px 0;

  // 임시 반응형 작업 (추후 중단점 수정 필요)
  @media screen and (max-width: 1000px) {
    padding: 0 20px;
  }
`;

const Main = () => {
  const sortValues = ["최신순", "조회순", "평점순"];
  const [mainData, setMainData] = useState<any[]>([]);
  const [mainSortBy, setMainSortBy] = useState("id");
  const [category, setCategory] = useState("");

  const axiosMainData = async (mainSortBy: string) => {
    // 카테고리 미선택 시 전체 데이터 조회
    if (category === "") {
      const { data } = await axios.get(
        `/api/v1/recipe/all/1?orderBy=${mainSortBy}&sort=dec`
      );

      setMainData(data.data);
    } else {
      const { data } = await axios.get(
        `/api/v1/recipe/category/1?category=${category}&orderBy=${mainSortBy}`
      );

      setMainData(data.data);
    }
  };

  useEffect(() => {
    axiosMainData(mainSortBy);
  }, [category, mainSortBy]);

  const onSortClick = (sortValue: string) => {
    if (sortValue === "최신순") {
      setMainSortBy("id");
    } else if (sortValue === "조회순") {
      setMainSortBy("views");
    } else if (sortValue === "평점순") {
      setMainSortBy("stars");
    }
  };

  return (
    <SMainLayout>
      <Carousel />
      <SSectionLayout>
        <RecipeCategory setCategory={setCategory} />
        <SortButtons sortValues={sortValues} clickEvent={onSortClick} />
        <RecipeItemList mainData={mainData} />
      </SSectionLayout>
    </SMainLayout>
  );
};

export default Main;
