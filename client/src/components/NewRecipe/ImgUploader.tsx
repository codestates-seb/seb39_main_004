import { useState, useRef } from "react";
import { StepMakerProps } from "../../ts/interface";
import styled from "styled-components";

const SImgInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SImg = styled.img`
  width: 250px;
  height: 200px;
  object-fit: cover; // 비율 조정
  border: 1px solid black;
`;

const SImgInput = styled.input`
  display: none;
`;

const ImgUploader = ({
  idx,
  setStepImgFiles,
  stepImgFiles,
}: StepMakerProps) => {
  const [fileURL, setStepImgFilesURL] = useState<string>("");
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (idx !== undefined) {
        const newImgFile = stepImgFiles;
        newImgFile[idx] = event.target.files[0];
        // console.log("요소하나", newImgFile[idx]);
        // console.log("값 전체", newImgFile);
        setStepImgFiles(newImgFile);
      }

      const newFileURL = URL.createObjectURL(event.target.files[0]);
      setStepImgFilesURL(newFileURL);
      // console.log("event.target.files", event.target.files);
      // console.log("file", file);
    }
  };

  return (
    <SImgInputContainer>
      <label htmlFor="img">레시피 사진</label>
      <SImg
        src={
          fileURL
            ? fileURL
            : "https://cdn-icons-png.flaticon.com/512/1555/1555492.png"
        }
        alt=""
        onClick={() => {
          if (imgUploadInput.current) {
            imgUploadInput.current.click();
          }
        }}
      ></SImg>
      <SImgInput
        type="file"
        id="img"
        accept="image/*"
        required
        ref={imgUploadInput}
        onChange={onImageChange}
      ></SImgInput>
      {/* <button onClick={submitHandler}>submit</button> */}
    </SImgInputContainer>
  );
};

export default ImgUploader;
