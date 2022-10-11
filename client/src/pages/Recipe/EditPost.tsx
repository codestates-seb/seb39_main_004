import {
  SLable,
  SLogoRecipe,
  SInput,
  STextarea,
} from "../../components/NewRecipe/RecipeFormStyled";
import {
  ThumbNailUploader,
  TagsMaker,
  Guide,
  AddingIngredients,
  StepsMaker,
  ImgRadio,
  RequireMark,
} from "../../components/NewRecipe/indexNewRecipe";
import { TypeOfFileList, TypeOfIngredients } from "../../types/type";
import {
  IStepValues,
  ITagsData,
  ITagProps,
  // IEditResponseData,
  // IPostInGredientProps,
  IRecipeTemp,
} from "../../types/interface";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import recipeLogo from "../../assets/images/Recipe/recipeLogo.svg";
import useMessage from "../../hooks/useMessage";
import useRecipeValidation from "../../hooks/useRecipeValidation";

const SFormContainer = styled.main`
  max-width: 1280px;
  display: flex;
  flex-direction: column;
`;

const SSection = styled.div`
  width: 100%;
  background-color: var(--greenish-grey);
  border: 3px solid ${(props) => props.color ?? "var(--pink)"};
  border-style: solid none;
  padding: 4rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.device.desktop} {
    padding: 2rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding: 1rem;
  }
`;

const SFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  & > :first-child {
    margin-top: 3rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    & > :first-child {
      margin-top: 1rem;
    }
  }
`;

const SRecipeInfo = styled.div`
  display: flex;
  gap: 2.5rem;
  @media ${({ theme }) => theme.device.tablet} {
    display: block;
  }
`;

const SRecipeTexts = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  & > :nth-child(3) {
    margin-top: 2rem;
  }
  @media ${({ theme }) => theme.device.desktop} {
    & > :nth-child(3) {
      margin-top: 1rem;
    }
  }
`;

const SSectionBtn = styled.section`
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding-top: 2rem;
  @media ${({ theme }) => theme.device.tablet} {
    gap: 1rem;
  }
`;

const SFormBtn = styled.button`
  background-color: ${(props) => props.color ?? "var(--pink)"};
  color: white;
  width: 280px;
  font-size: 1.6rem;
  padding: 1rem;
  border-radius: 3px;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.3rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 50%;
    font-size: 1rem;
  }
`;

const EditPost = () => {
  const message = useMessage(3000);
  const navigate = useNavigate();

  // 수정페이지 관련
  const { recipeId } = useParams();

  // 등록페이지 관련
  // const [data, setData] = useState<IEditResponseData>();
  const [data, setData] = useState<IRecipeTemp>({ body: "", title: "" });
  const [thumbNailUrl, setThumbNailUrl] = useState<string>();
  const [thumbNail, setThumbNail] = useState<TypeOfFileList>();
  const [stepImgFiles, setStepImgFiles] = useState<TypeOfFileList[]>([]);
  const [directDatas, setDirectDatas] = useState<IStepValues[]>([]);
  const [checkedCateg, setCheckedCateg] = useState("");
  const [ingredientsDatas, setIngredientsDatas] = useState<TypeOfIngredients[]>(
    []
  );
  const [tagsDatas, setTagsDatas] = useState<ITagsData[]>([]);

  // 빈 값 체크
  const isEmpty = useRecipeValidation(
    data,
    ingredientsDatas,
    directDatas,
    tagsDatas
  );

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    setData({ ...data, [target.name]: target.value });
  };

  const submitHandler = async () => {
    if (isEmpty === true) {
      message.fire({
        icon: "error",
        title:
          "레시피 등록에 실패했습니다.\n 누락된 정보가 있는지 \n확인해주세요.",
      });
      return;
    }
    // console.log("카테", checkedCateg); // 수정시 null X
    // console.log("onSubmitData", data);
    // console.log("재료", ingredientsDatas);
    // console.log("순서", directDatas);

    /** 서버 요청 데이터 구축 */
    const formdata = new FormData();

    if (thumbNail) {
      formdata.append("imgThumbNail", thumbNail);
    } else {
      // 썸네일 수정 없을 때 임의의 파일 전송
      const tempFile = new File(["foo"], "foo.txt", {
        type: "text/plain",
      });
      formdata.append("imgThumbNail", tempFile);
    }

    stepImgFiles.forEach((file) => {
      if (file) {
        formdata.append("imgDirection", file);
      }
    });

    const recipeDatas = {
      ...data,
      category: checkedCateg,
      ingredients: ingredientsDatas,
      directions: directDatas,
      tags: tagsDatas,
    };

    formdata.append(
      "recipe",
      new Blob([JSON.stringify(recipeDatas)], { type: "application/json" })
    );

    console.log("수정페이지 버튼 recipeDatas", recipeDatas);

    /** 서버 요청 */
    const response = await axios.post(
      `/api/v1/recipe/${recipeId}/edit`,
      formdata,
      {
        headers: { "content-type": "multipart/form-data" },
      }
    );

    try {
      const newId = response.data.data.id;
      navigate(`/post/${newId}/`);
    } catch (error) {
      message.fire({
        icon: "error",
        title: "레시피 등록에 실패했습니다.\n 다시 시도해주세요.",
      });
    }
  };

  useEffect(() => {
    axios
      .get(`/api/v1/recipe/${recipeId}/edit/`)
      .then((res) => {
        const resData = res.data.data;
        // console.log("resData", resData);
        setData({ body: resData.body, title: resData.title });
        setCheckedCateg(resData.category);
        setDirectDatas(resData.directions);
        setThumbNailUrl(resData.imgThumbNailUrl);
        setIngredientsDatas(resData.ingredients);
        const tagList: { name: string }[] = [];
        resData.tags.forEach((el: ITagProps) => {
          tagList.push({ name: el.name });
        });
        setTagsDatas([...tagList]);
      })
      .catch(() => {
        message.fire({
          icon: "error",
          title: "서버 에러가 발생했습니다. \n 다시 시도해주세요.",
        });
      });
  }, []);
  console.log("순서", directDatas);

  return (
    <SFormContainer>
      <SLogoRecipe src={recipeLogo} alt="recipeLogo"></SLogoRecipe>
      <form action="" method="post" onSubmit={submitHandler}>
        <SSection>
          <SRecipeInfo>
            <SRecipeTexts>
              <SLable htmlFor="title">
                레시피 제목
                <RequireMark />
              </SLable>
              {data && (
                <SInput
                  name="title"
                  value={data.title}
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                  id="title"
                  placeholder="레시피 제목을 적어주세요."
                />
              )}
              <SLable htmlFor="body">
                요리 소개
                <RequireMark />
              </SLable>
              {data && (
                <STextarea
                  name="body"
                  id="body"
                  value={data.body}
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                  rows={5}
                  placeholder="레시피를 소개해주세요."
                ></STextarea>
              )}
            </SRecipeTexts>
            {thumbNailUrl && (
              <ThumbNailUploader
                setThumbNail={setThumbNail}
                resThumbNailImgUrl={thumbNailUrl}
              />
            )}
          </SRecipeInfo>
          <SFieldset>
            <SLable htmlFor="category">
              요리 카테고리
              <RequireMark />
            </SLable>
            <ImgRadio
              setCheckedCateg={setCheckedCateg}
              checkedCateg={checkedCateg}
            ></ImgRadio>
          </SFieldset>
        </SSection>
        <SSection color={"var(--green-bean)"}>
          <SLable htmlFor="ingredients">
            요리 재료
            <RequireMark />
            <Guide text="필수 재료는 체크표시를 해주세요." />
          </SLable>
          <AddingIngredients
            setIngredientsDatas={setIngredientsDatas}
            ingredientsDatas={ingredientsDatas}
          />
        </SSection>
        <SSection color={"var(--yellow)"}>
          <SLable>
            요리 순서
            <RequireMark />
            <Guide text="중요한 부분은 빠짐없이 적어주세요." />
          </SLable>
          <StepsMaker
            directDatas={directDatas}
            setDirectDatas={setDirectDatas}
            stepImgFiles={stepImgFiles}
            setStepImgFiles={setStepImgFiles}
          />
        </SSection>
        <SSection color={"var(--sky-blue)"}>
          <SLable>태그</SLable>
          <TagsMaker setTagsDatas={setTagsDatas} tagsDatas={tagsDatas} />
        </SSection>
        <SSectionBtn>
          <SFormBtn color={"var(--deep-green)"} type="reset">
            취소
          </SFormBtn>
          <SFormBtn type="button" onClick={submitHandler}>
            등록
          </SFormBtn>
        </SSectionBtn>
      </form>
    </SFormContainer>
  );
};
export default EditPost;
