/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

// TODO: 추후 Hook으로 만들기
const infiniteScroll = () => {
  const [list, setList] = useState<any[]>([]); // 글 리스트
  const [page, setPage] = useState(1); // 현재 페이지
  const [load, setLoad] = useState<boolean>(true); // 로딩 스피너 상태
  const preventRef = useRef(true); // 옵저버 중복 실행 방지
  const obsRef = useRef(null); //observer Element
  const endRef = useRef(false); //모든 글 로드 확인

  useEffect(() => {
    // 옵저버 생성
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    getRecipePost();
  }, [page]);

  const obsHandler = (entries: any) => {
    //옵저버 콜백함수
    const target = entries[0];

    if (target.isIntersecting && preventRef.current) {
      preventRef.current = false; // 옵저버 중복 실행 방지
      setPage((prev) => prev + 1); // 페이지 값 증가
    }
  };

  const getRecipePost = useCallback(async () => {
    //글 불러오기
    // console.log("레시피 글 불러오기");
    setLoad(true); //로딩 시작

    const res = await axios({
      method: "GET",
      url: `/api/db/post/read/list/?page=${page}`,
    });

    if (res.data) {
      if (res.data.end) {
        //마지막 페이지일 경우
        endRef.current = true;
      }
      setList((prev) => [...prev, ...res.data.list]); //리스트 추가
      preventRef.current = true;
    } else {
      // console.log(res);
    }
    setLoad(false); //로딩 종료
  }, [page]);

  return (
    <>
      <div className="wrap min-h-[100vh]">
        {list && (
          <>
            {list.map((li: any) => (
              <img
                key={li.id}
                src={li.url}
                alt={li.dke}
                width={"500px"}
                height={"300px"}
              />
            ))}
          </>
        )}
        {load ? <div>로딩 중</div> : <></>}
        <div ref={obsRef}>옵저버 Element</div>
      </div>
    </>
  );
};

export default infiniteScroll;
