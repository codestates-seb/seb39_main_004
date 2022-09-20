import { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

const SImg = styled.img`
  width: 250px;
  height: 200px;
  object-fit: cover; // 비율 조정
  border: 1px solid black;
`;
const SImgInput = styled.input`
  display: none;
`;

const ImgUploader = () => {
  const [fileURL, setFileURL] = useState<string>("");
  const [file, setFile] = useState<FileList | null>();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files);

      const newFileURL = URL.createObjectURL(event.target.files[0]);
      setFileURL(newFileURL);
      // console.log("event.target.files", event.target.files);
      // console.log("file", file);
    }
  };
  const onImageRemove = (): void => {
    URL.revokeObjectURL(fileURL);
    setFileURL(""); // 렌더링 이미지 초기화
    setFile(null);
  };
  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    /** 서버통신 */
    const formData = new FormData();

    if (file) {
      formData.append("file", file[0]);
      // console.log([...formData]); // 데이터 확인용

      try {
        const response = await axios.post("/api/upload", formData, {
          headers: { "content-type": "multipart/form-data" },
        });
        // console.log(response);
        // 상위 컴포넌트 마크업 작업 후 처리하겠습니다.(이미지 )
      } catch (error) {
        console.log("이미지업로드 에러 발생");
      }
    } else {
      alert("업로드할 이미지가 없습니다");
    }
  };
  return (
    <>
      <SImg
        src={
          fileURL
            ? fileURL
            : "https://cdn-icons-png.flaticon.com/512/1555/1555492.png"
        }
        alt=""
      ></SImg>
      <label htmlFor="img">이미지 업로드</label>
      <SImgInput
        type="file"
        id="img"
        accept="image/*"
        required
        ref={imgUploadInput}
        onChange={onImageChange}
      ></SImgInput>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          if (imgUploadInput.current) {
            imgUploadInput.current.click();
          }
        }}
      >
        이미지 변경 버튼
      </button>
      <button type="button" onClick={onImageRemove}>
        제거 버튼
      </button>
      <button onClick={submitHandler}>submit</button>
    </>
  );
};

export default ImgUploader;
