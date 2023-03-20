import { useState, KeyboardEvent } from "react";
import { TagWithBtn } from "../indexNewRecipe";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../../hooks/dispatchHook";
import { recipeActions } from "../../../redux/slices/recipeSlice";

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
  const [inputValue, setInputValue] = useState("");

  const changeInputValueHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (event.key === "Enter" && event.nativeEvent.isComposing === false) {
      dispatch(recipeActions.addTag({ name: target.value }));
      setInputValue("");
    }
  };

  return (
    <STagsContainer>
      {tagsDatas.map((tagData, idx) => {
        return <TagWithBtn key={idx} tagValue={tagData.name} id={idx} />;
      })}
      <SNonOutlineInput
        name="name"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        onKeyDown={changeInputValueHandler}
        placeholder="태그를 추가해주세요."
      />
    </STagsContainer>
  );
};
export default TagsMaker;
