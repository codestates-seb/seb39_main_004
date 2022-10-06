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
import {
  TypeOfFileList,
  TypeOfFormData,
  TypeOfIngredients,
} from "../../types/type";
import { IStepValues, ITagsData, ITagProps } from "../../types/interface";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import recipeLogo from "../../assets/images/Recipe/recipeLogo.svg";
import useMessage from "../../hooks/useMessage";

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
  const [thumbNailUrl, setThumbNailUrl] = useState<string>();
  const [thumbNail, setThumbNail] = useState<TypeOfFileList>();
  const [stepImgFiles, setStepImgFiles] = useState<TypeOfFileList[]>([]);
  const [booleanArr, setBooleanArr] = useState<boolean[]>([]);
  const [directDatas, setDirectDatas] = useState<IStepValues[]>([]);
  const [checkedCateg, setCheckedCateg] = useState("");
  const [ingredientsDatas, setIngredientsDatas] = useState<TypeOfIngredients[]>(
    []
  );
  const [tagsDatas, setTagsDatas] = useState<ITagsData[]>([]);
  const [fake, setFake] = useState(false);

  const { register, handleSubmit, setValue } =
    useForm<TypeOfFormData>(undefined);
  const submitHandler: SubmitHandler<TypeOfFormData> = async (data) => {
    // console.log("불리언", booleanArr);
    // console.log("onSubmitData", data);
    // console.log("재료", ingredientsDatas);
    // console.log("d이미지 순서", stepImgFiles);
    // console.log("순서", directDatas);
    // console.log("태그", tagsDatas);
    // console.log("카테", checkedCateg);

    /** 이미지 누락 체크 */
    // const emptyIndex = stepImgFiles.findIndex((el) => el === undefined);
    // if (emptyIndex >= 0) {
    //   message.fire({
    //     icon: "error",
    //     title: `요리 순서의 ${emptyIndex + 1}번째 이미지를 \n추가해주세요`,
    //   });
    //   return;
    // }
    if (!thumbNail || stepImgFiles.length === 0) {
      message.fire({
        icon: "error",
        title: `등록하려면 \n이미지를 추가해주세요.`,
      });
      return;
    }
    /** 서버 요청 데이터 구축 */
    const formData = new FormData();
    formData.append("imgThumbNail", thumbNail);

    stepImgFiles.forEach((file) => {
      if (file) {
        formData.append("imgDirection", file);
      }
    });
    // console.log(booleanArr, stepImgFiles);

    booleanArr.forEach((el, idx) => {
      const newFile = new File([], "temp.mmz");
      if (stepImgFiles[idx]) {
        // console.log("타입", typeof stepImgFiles[idx]);
        // formData.append("imgDirection", stepImgFiles[idx]);
      } else {
        console.log("빈값", newFile);
        // formData.append("imgDirection", newFile);
      }
    });
    const recipeDatas = {
      ...data,
      category: checkedCateg,
      ingredients: ingredientsDatas,
      directions: directDatas,
      tags: tagsDatas,
    };
    formData.append(
      "recipe",
      new Blob([JSON.stringify(recipeDatas)], { type: "application/json" })
    );

    /** 서버 요청 */
    try {
      if (fake) {
        const response = await axios.delete(
          `/api/v1/recipe/${recipeId}/delete`
        );
        response.status ? setFake(!fake) : undefined;
      } else {
        const response = await axios.post("/api/v1/recipe/add", formData, {
          headers: { "content-type": "multipart/form-data" },
        });
        const newId = response.data.data.id;
        navigate(`/post/${newId}/`);
      }
    } catch (error) {
      console.log(error);
      message.fire({
        icon: "error",
        title:
          "레시피 등록에 실패했습니다.\n 누락된 정보가 있는지 \n확인해주세요.",
      });
    }
  };

  useEffect(() => {
    axios
      .get(`/api/v1/recipe/${recipeId}/edit/`)
      .then((res) => {
        const resData = res.data.data;
        // console.log("resData", resData);
        setCheckedCateg(resData.category);
        setValue("title", resData.title);
        setValue("body", resData.body);
        setDirectDatas(resData.directions);
        setThumbNailUrl(resData.imgThumbNailUrl);
        setIngredientsDatas(resData.ingredients);
        const tagList: { name: string }[] = [];
        resData.tags.forEach((el: ITagProps) => {
          tagList.push({ name: el.name });
        });
        setTagsDatas([...tagList]);
      })
      .catch((err) => {
        console.log("수정에러", err);
      });
  }, []);
  // console.log("변경", tagsDatas);
  // console.log(recipeId, "recipeId");

  // console.log("썸네일 최상위", thumbNailUrl);

  return (
    <SFormContainer>
      <SLogoRecipe src={recipeLogo} alt="recipeLogo"></SLogoRecipe>
      <form action="" method="post" onSubmit={handleSubmit(submitHandler)}>
        <SSection>
          <SRecipeInfo>
            <SRecipeTexts>
              <SLable htmlFor="title">
                레시피 제목
                <RequireMark />
              </SLable>
              <SInput
                {...register("title", { required: true })}
                id="title"
                placeholder="레시피 제목을 적어주세요."
              />
              <SLable htmlFor="body">
                요리 소개
                <RequireMark />
              </SLable>
              <STextarea
                {...register("body", { required: true })}
                id="body"
                // cols={50}
                rows={5}
                placeholder="레시피를 소개해주세요."
              ></STextarea>
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
            booleanArr={booleanArr}
            setBooleanArr={setBooleanArr}
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
          <SFormBtn type="button" onClick={handleSubmit(submitHandler)}>
            등록
          </SFormBtn>
        </SSectionBtn>
      </form>
    </SFormContainer>
  );
};
export default EditPost;
