import ImgUploader from "../../components/ImgUploader";
import {
  SortButtons,
  TextareaWithLabel,
  SelectButton,
} from "../../components/CommonUI";
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
  contentType: string;
  createData: string;
  fileName: string;
  fileSize: number;
  id: number;
  modDate: string;
  originFileName: string;
}

const AddPost = () => {
  const [responsedImg, setResponsedImg] = useState<ResponseImgProps[]>([]);
  // const responsedImg = ["[썸네일]TIL.png", "qwe123.png", "Dark-Purple.jpeg"];

  const filterHandler = async (orderValue: string) => {
    console.log(orderValue); // 정렬 관련 서버 기능 구현 후 동작 처리하겠습니다.
    const response = await axios.get("/api/images");
    try {
      // console.log("axois resaponse data", response);
      console.log("axois resaponse data", response.data);
      setResponsedImg(response.data);
    } catch (error) {
      console.log("정렬 에러");
      // throw new Error(error);
    }
  };
  useEffect(() => {
    // console.log("들어옴");
  }, [responsedImg]);

  return (
    <>
      <div>레시피 등록</div>
      {/* <form action="" method="post"> */}
      <ImgUploader></ImgUploader>
      {/* <button type="submit">submit</button> */}
      {/* <button type="reset">reset</button> */}
      {/* </form> */}
      <SortButtons
        sortValues={["최신순", "조회순", "평점순"]}
        clickEvent={filterHandler}
      ></SortButtons>
      <SortButtons
        sortValues={["최신순", "평점순"]}
        clickEvent={filterHandler}
      ></SortButtons>
      <TextareaWithLabel
        label="텍스트"
        name="텍스트에어리어"
        placeholder="플레이스홀더"
        required={true}
      ></TextareaWithLabel>
      <SelectButton
        label="인원"
        values={["1인분", "2인분", "3인분", "4인분"]}
      ></SelectButton>
      <br />
      {responsedImg.length > 0 &&
        /** 이미지 리스트로 렌더링 */
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
export default AddPost;
