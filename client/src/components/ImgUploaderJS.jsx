import { useState, useRef } from "react";
import styled from "styled-components";

const Img = styled.img`
  /* width: 300px; */
`;
const ImgInput = styled.input`
  display: none;
`;

const ImgUploader = () => {
  const [fileURL, setFileURL] = useState("");
  const imgUploadInput = useRef();

  const onImageChange = (event) => {
    const reader = new FileReader();
    const image = imgUploadInput.current.files[0];

    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setFileURL(reader.result);
    };

    /** 서버통신 */
    // const formData = new FormData();
    // formData.append("file", event.target.files[0]);
    // formData.append("file2", event.target.files[0]);
    // for (const key of formData.keys()) {
    //   console.log(key, ":", formData.get(key));
    // }
  };
  return (
    <>
      <Img
        src={
          fileURL
            ? fileURL
            : "https://cdn-icons-png.flaticon.com/512/1555/1555492.png"
        }
        alt=""
      ></Img>
      <label htmlFor="img">이미지 업로드</label>
      <ImgInput
        type="file"
        id="img"
        accept="image/*"
        required
        ref={imgUploadInput}
        onChange={onImageChange}
      ></ImgInput>
      <button
        onClick={(event) => {
          event.preventDefault();
          imgUploadInput.current.click();
        }}
      >
        이미지 변경 버튼
      </button>
    </>
  );
};

export default ImgUploader;
