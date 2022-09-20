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
  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    /** 서버통신 */
    const formData = new FormData();
    if (file) {
      console.log("file", file);
      formData.append("file", file[0]);
    }
    // for (const key of formData.keys()) {
    // Type 'IterableIterator<string>' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.
    // console.log("반복", key, ":", formData.get(key));
    // }

    // healty check
    // axios
    //   .get("/api/test")
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     throw new Error(error);
    //   });
    // console.log("submit handler");
    // console.log("file", file);
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
