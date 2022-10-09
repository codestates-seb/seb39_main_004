/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { SortButtons, Loading } from "../../components/CommonUI";
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
  @media ${({ theme }) => theme.device.mobile} {
    margin: 30px 0;
  }
`;

const SLoadingLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SResultTitle = styled.div`
  font-size: 1.3rem;
  color: var(--deep-green);
  span {
    color: var(--red);
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
  }
`;

const Main = () => {
  const sortValues = ["최신순", "조회순", "평점순"];
  const [mainData, setMainData] = useState<any[]>([]);
  const [mainSortBy, setMainSortBy] = useState("id");
  const [category, setCategory] = useState("");
  const dispatch = useAppDispatch();
  const { sessionStatus } = useAppSelector((state) => state.user);

  const [page, setPage] = useState(0); // 현재 페이지
  const [load, setLoad] = useState<boolean>(true); // 로딩 스피너 상태
  const preventRef = useRef(true); // 옵저버 중복 실행 방지
  const obsRef = useRef(null); // observer Element
  const endRef = useRef(false); // 모든 글 로드 확인

  useEffect(() => {
    console.log("1. 옵저버 핸들러", page);
    if (sessionStatus) dispatch(userSession());

    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  // 페이지 변경될 때 실행
  // TODO: 여기가 두 번 불리는게 문제인 듯..
  useEffect(() => {
    console.log("2. page 변경", page);
    setTimeout(() => {
      getRecipePost();
    }, 1000);
  }, [page]);

  // 카테고리, 정렬 기준 변경될 때 실행
  useEffect(() => {
    // 카테고리 변경 시 이전 데이터 초기화
    setPage(0);
    setMainData([]);
    console.log("3. 카테고리, 정렬 변경:", page, category, mainSortBy);

    setTimeout(() => {
      getRecipePost();
    }, 1000);
  }, [category, mainSortBy]);

  const obsHandler = (entries: any) => {
    //옵저버 콜백함수
    const target = entries[0];

    if (target.isIntersecting && preventRef.current) {
      preventRef.current = false; // 옵저버 중복 실행 방지
      setPage((prev) => prev + 1); // 페이지 값 증가
    }
  };

  const getRecipePost = useCallback(async () => {
    // console.log("레시피 글 불러오기");
    setLoad(true); //로딩 시작
    console.log("getRecipePost 페이지", page);

    // 카테고리 미선택 시 전체 데이터 조회
    if (category === "") {
      const { data } = await axios.get(
        `/api/v1/recipe/all/${page}?orderBy=${mainSortBy}&sort=dec`
      );

      if (data.data) {
        if (data.pageInfo.totalPages) {
          //마지막 페이지일 경우
          endRef.current = true;
        }
        setMainData((prev) => [...prev, ...data.data]); //리스트 추가
        preventRef.current = true;
      }
    } else {
      const { data } = await axios.get(
        `/api/v1/recipe/category/${page}?category=${category}&orderBy=${mainSortBy}`
      );

      if (data.data) {
        if (data.pageInfo.totalPages) {
          //마지막 페이지일 경우
          endRef.current = true;
        }
        setMainData((prev) => [...prev, ...data.data]); //리스트 추가
        preventRef.current = true;
      }
    }

    setLoad(false); //로딩 종료
  }, [page]);

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
        <SResultTitle>
          검색 결과 <span>{mainData && mainData.length}</span>개
        </SResultTitle>
        <RecipeItemList mainData={mainData} />
        <SLoadingLayout>
          {load && <Loading />}
          {/* 옵저버 Element */}
          <div ref={obsRef}></div>
        </SLoadingLayout>
      </SSectionLayout>
    </SMainLayout>
  );
};

export default Main;
