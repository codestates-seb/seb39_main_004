import ImgUploader from "./ImgUploader";
import { SortButtons } from "../../components/CommonUI";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

const SImg = styled.img`
  width: 250px;
  height: 200px;
  object-fit: cover; // 비율 조정
  border: 1px solid black;
`;

interface ResponseImgProps {
  contentType?: string;
  createData?: string;
  fileName: string;
  fileSize?: number;
  id: number;
  modDate?: string;
  originFileName?: string;
}

const ImgServerTest = () => {
  const [responsedImg, setResponsedImg] = useState<ResponseImgProps[]>([]);

  const filterHandler = async (orderValue: string) => {
    console.log("filterhandler의 매개변수", orderValue); // 정렬 관련 서버 기능 구현 후 동작 처리하겠습니다.
    const response = await axios.get("/api/images");
    try {
      console.log("axois resaponse data", response.data);
      setResponsedImg(response.data);
    } catch (error) {
      console.log("정렬 에러");
    }
  };

  useEffect(() => {
    // console.log("페이지 렌더링");
  }, [responsedImg]);

  return (
    <>
      <SortButtons
        sortValues={["최신순", "평점순"]}
        clickEvent={filterHandler}
      ></SortButtons>
      <ImgUploader></ImgUploader>

      {responsedImg.length > 0 &&
        /** 이미지 렌더링 */
        responsedImg.map((el) => {
          return (
            <SImg
              key={el.id}
              src={`${process.env.PUBLIC_URL}/assets/${el.fileName}`}
              alt="서버이미지"
            />
          );
        })}
    </>
  );
};
export default ImgServerTest;
