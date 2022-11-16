import React from "react";
import { TagWithBtn } from "./indexNewRecipe";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatchHook";
import { recipeActions } from "../../redux/slices/recipeSlice";

const STagsContainer = styled.ul`
  background-color: white;
  padding: 1.2rem 2.3rem;
  border: 2.5px solid var(--gray);
  border-style: solid none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  align-content: space-around;
  gap: 1.3rem;
  @media ${({ theme }) => theme.device.tablet} {
    padding: 1.2rem;
  }
`;

const SNonOutlineInput = styled.input`
  width: 300px;
  font-size: 1.1rem;
  margin-left: 2rem;
  border: none;
  &:focus {
    outline: none;
  }
  @media ${({ theme }) => theme.device.desktop} {
    font-size: 1rem;
    margin-left: 0;
  }
`;

const TagsMaker = () => {
  const dispatch = useAppDispatch();
  const tagsDatas = useAppSelector((state) => state.recipe.inputTexts.tags);

  const changeInputValueHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;
    if (event.key === "Enter") {
      dispatch(recipeActions.addTag({ name: target.value }));
      target.value = "";
    }
  };

  return (
    <STagsContainer>
      {tagsDatas.map((taginfo, idx) => {
        return <TagWithBtn key={idx} tagValue={taginfo.name} id={idx} />;
      })}
      <SNonOutlineInput
        name="name"
        onKeyUp={changeInputValueHandler}
        placeholder="태그를 추가해주세요."
      />
    </STagsContainer>
  );
};
export default TagsMaker;
