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
import { IStepValues, ITagsData, IRecipeTemp } from "../../types/interface";
import { FormEvent, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import recipeLogo from "../../assets/images/Recipe/recipeLogo.svg";
import useMessage from "../../hooks/useMessage";
import useRecipeJsonDataValidation from "../../hooks/useRecipeJsonDataValidation";

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

const AddPost = () => {
  const message = useMessage(3000);
  const navigate = useNavigate();

  // ??????????????? ??????
  const [data, setData] = useState<IRecipeTemp>({ body: "", title: "" });
  const [thumbNail, setThumbNail] = useState<TypeOfFileList>();
  const [stepImgFiles, setStepImgFiles] = useState<TypeOfFileList[]>([]);
  const [directDatas, setDirectDatas] = useState<IStepValues[]>([]);
  const [checkedCateg, setCheckedCateg] = useState("");
  const [ingredientsDatas, setIngredientsDatas] = useState<TypeOfIngredients[]>(
    []
  );
  const [tagsDatas, setTagsDatas] = useState<ITagsData[]>([]);

  // ??? ??? ??????
  const isJsonDataEmpty = useRecipeJsonDataValidation(
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

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    /** ????????? ?????? ?????? */
    if (isJsonDataEmpty === true) {
      message.fire({
        icon: "error",
        title:
          "????????? ????????? ??????????????????.\n ????????? ????????? ????????? \n??????????????????.",
      });
      return;
    }

    /** ????????? ?????? ?????? */
    const emptyImageIndex = stepImgFiles.findIndex((el) => el === undefined);
    if (emptyImageIndex >= 0) {
      message.fire({
        icon: "error",
        title: `?????? ????????? ${emptyImageIndex + 1}?????? ???????????? \n??????????????????`,
      });
      return;
    }
    if (!thumbNail || stepImgFiles.length === 0) {
      message.fire({
        icon: "error",
        title: `??????????????? \n???????????? ??????????????????.`,
      });
      return;
    }

    /** ?????? ?????? ????????? ?????? */
    const formData = new FormData();
    formData.append("imgThumbNail", thumbNail);

    stepImgFiles.forEach((file) => {
      if (file) {
        formData.append("imgDirection", file);
      }
    });

    // ???????????? ?????? ????????? ??????
    const filteredIngredients: TypeOfIngredients[] = [];
    ingredientsDatas.forEach((oneline, idx) => {
      filteredIngredients.push({ ...oneline, index: idx + 1 });
    });

    // ???????????? ?????? ????????? ??????
    const filteredDirects: IStepValues[] = [];
    directDatas.forEach((oneline, idx) => {
      filteredDirects.push({ ...oneline, index: idx + 1 });
    });

    const recipeDatas = {
      ...data,
      category: checkedCateg,
      ingredients: filteredIngredients,
      directions: filteredDirects,
      tags: tagsDatas,
    };

    formData.append(
      "recipe",
      new Blob([JSON.stringify(recipeDatas)], { type: "application/json" })
    );

    /** ?????? ?????? */
    const response = await axios.post("/api/v1/recipe/add", formData, {
      headers: { "content-type": "multipart/form-data" },
    });

    try {
      const newId = response.data.data.id;
      navigate(`/post/${newId}/`);
    } catch (error) {
      message.fire({
        icon: "error",
        title:
          "????????? ????????? ??????????????????.\n ????????? ????????? ????????? \n??????????????????.",
      });
    }
  };

  return (
    <SFormContainer>
      <SLogoRecipe src={recipeLogo} alt="recipeLogo"></SLogoRecipe>
      <form action="" method="post" onSubmit={submitHandler}>
        <SSection>
          <SRecipeInfo>
            <SRecipeTexts>
              <SLable htmlFor="title">
                ????????? ??????
                <RequireMark />
              </SLable>
              <SInput
                name="title"
                value={data.title}
                onChange={inputHandler}
                id="title"
                placeholder="????????? ????????? ???????????????."
              />
              <SLable htmlFor="body">
                ?????? ??????
                <RequireMark />
              </SLable>
              <STextarea
                name="body"
                id="body"
                value={data.body}
                onChange={inputHandler}
                rows={5}
                placeholder="???????????? ??????????????????."
              ></STextarea>
            </SRecipeTexts>
            <ThumbNailUploader setThumbNail={setThumbNail} />
          </SRecipeInfo>
          <SFieldset>
            <SLable htmlFor="category">
              ?????? ????????????
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
            ?????? ??????
            <RequireMark />
            <Guide text="?????? ????????? ??????????????? ????????????." />
          </SLable>
          <AddingIngredients
            setIngredientsDatas={setIngredientsDatas}
            ingredientsDatas={ingredientsDatas}
          />
        </SSection>
        <SSection color={"var(--yellow)"}>
          <SLable>
            ?????? ??????
            <RequireMark />
            <Guide text="????????? ????????? ???????????? ???????????????." />
          </SLable>
          <StepsMaker
            directDatas={directDatas}
            setDirectDatas={setDirectDatas}
            stepImgFiles={stepImgFiles}
            setStepImgFiles={setStepImgFiles}
          />
        </SSection>
        <SSection color={"var(--sky-blue)"}>
          <SLable>??????</SLable>
          <TagsMaker setTagsDatas={setTagsDatas} tagsDatas={tagsDatas} />
        </SSection>
        <SSectionBtn>
          <SFormBtn color={"var(--deep-green)"} type="reset">
            ??????
          </SFormBtn>
          <SFormBtn type="button" onClick={submitHandler}>
            ??????
          </SFormBtn>
          {/* <button >????????????</button> */}
        </SSectionBtn>
      </form>
    </SFormContainer>
  );
};
export default AddPost;
