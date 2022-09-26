import ImgUploader from "../../components/NewRecipe/ImgUploader";
import TagsMaker from "../../components/NewRecipe/TagsMaker";
import Guide from "../../components/NewRecipe/Guide";
import AddingIngredients from "../../components/NewRecipe/AddingIngredients";
import StepsMaker from "../../components/NewRecipe/StepsMaker";
import { TextareaWithLabel, SelectButton } from "../../components/CommonUI";
import styled from "styled-components";
// import axios from "axios";

const SVideoThumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover; // 비율 조정
  border: 1px solid black;
`;

const SFieldset = styled.fieldset`
  border: 1px solid blue;
  padding: 20px;
`;

const AddPost = () => {
  return (
    <>
      {/* <form action="" method="post"> */}
      <SFieldset>
        <legend>레시피</legend>
        <div className="title-and-thumbnail">
          <div>
            <label htmlFor="title">레시피 제목</label>
            <input
              name="recipeTitle"
              id="title"
              placeholder="레시피 제목을 적어주세요."
              required
            />
            <div style={{ background: "aliceblue" }}>
              <label htmlFor="videoURL">동영상</label>
              <input
                name="videoLink"
                id="videoURL"
                placeholder="동영상 주소를 입력해주세요."
              />
              <SVideoThumbnail
                src={"https://cdn-icons-png.flaticon.com/512/1555/1555492.png"}
                alt="유투브 썸네일 영역"
              ></SVideoThumbnail>
              <div></div>
            </div>
          </div>
          <ImgUploader></ImgUploader>
        </div>
        <TextareaWithLabel
          label="요리 소개"
          name="recipeInfo"
          placeholder="레시피를 소개해주세요."
          required={true}
        />
        <SFieldset>
          <legend>요리 정보</legend>
          <div className="category">
            <SelectButton
              label="종류별"
              values={["메인반찬", "국/탕", "면/만두", "빵", "디저트", "기타"]}
            ></SelectButton>
          </div>
          <div className="recipe-info">
            <SelectButton
              label="인원"
              values={[
                "1인분",
                "2인분",
                "3인분",
                "4인분",
                "5인분",
                "6인분 이상",
              ]}
            ></SelectButton>
            <SelectButton
              label="시간"
              values={["10분 이내", "30분 이내", "60분 이내", "1시간 이상"]}
            ></SelectButton>
            <SelectButton
              label="난이도"
              values={["초급", "중급", "고급"]}
            ></SelectButton>
          </div>
        </SFieldset>
      </SFieldset>
      <SFieldset>
        <legend>요리재료</legend>
        <Guide text="필수 재료는 체크표시를 해주세요." />
        <AddingIngredients />
      </SFieldset>
      <SFieldset>
        <legend>요리순서</legend>
        <Guide text="중요한 부분은 빠짐없이 적어주세요." />
        <StepsMaker />
      </SFieldset>
      <SFieldset>
        <legend>태그</legend>
        <TagsMaker></TagsMaker>
      </SFieldset>
      {/* </form> */}
      <section className="btnContainer">
        <button type="submit">submit</button>
        {/* <button >임시저장</button> */}
        <button type="reset">reset</button>
      </section>
    </>
  );
};
export default AddPost;
