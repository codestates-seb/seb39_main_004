import { useState, useRef } from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 250px;
  height: 200px;
  object-fit: cover; // 비율 조정
  border: 1px solid black;
`;
const ImgInput = styled.input`
  display: none;
`;

const ImgUploader = () => {
  const [fileURL, setFileURL] = useState<string>("");
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFileURL = URL.createObjectURL(event.target.files[0]);
      setFileURL(newFileURL);
    }

    /** 서버통신 */
    // const formData = new FormData();
    // formData.append("file", event.target.files[0]);
    // formData.append("file2", event.target.files[0]);
    // console.log("폼데이터벨류", formData.values()); // Iterator {}
    // for (const key of formData.keys()) {
    // Type 'IterableIterator<string>' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.
    // https://xively.tistory.com/65
    // console.log("반복", key, ":", formData.get(key));
    // }
  };
  const onImageRemove = (): void => {
    URL.revokeObjectURL(fileURL);
    setFileURL(""); // 렌더링 이미지 초기화
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
          if (imgUploadInput.current) {
            imgUploadInput.current.click();
          }
        }}
      >
        이미지 변경 버튼
      </button>
      <button onClick={onImageRemove}>제거 버튼</button>
      {/* <button onClick={}>submit</button> */}
    </>
  );
};

export default ImgUploader;
