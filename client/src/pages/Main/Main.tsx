/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SortButtons } from "../../components/CommonUI";
import { userSession } from "../../redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatchHook";
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
  @media ${({ theme }) => theme.device.tablet} {
    margin: 30px 0;
  }
`;

const Main = () => {
  const sortValues = ["최신순", "조회순", "평점순"];
  const [mainData, setMainData] = useState<any[]>([]);
  const [mainSortBy, setMainSortBy] = useState("id");
  const [category, setCategory] = useState("");
  const dispatch = useAppDispatch();
  const { sessionStatus } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (sessionStatus) dispatch(userSession());
    console.log("메인 세션 체크: ", sessionStatus);
  }, [sessionStatus]);

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
