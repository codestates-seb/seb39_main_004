import React from "react";
import { ITagsMakerProps } from "../../types/interface";
import { TagWithBtn } from "./indexNewRecipe";
import styled from "styled-components";

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

const SNoLineInput = styled.input`
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

const TagsMaker = ({ setTagsDatas, tagsDatas }: ITagsMakerProps) => {
  const inputValueChange = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (tagsDatas) {
      const target = event.target as HTMLInputElement;
      if (event.key === "Enter") {
        const newTag = { name: target.value };
        setTagsDatas([...tagsDatas, newTag]);
        target.value = "";
      }
    }
  };

  const tagRemover = (id: number) => {
    const newTags = tagsDatas.slice();
    newTags.splice(id, 1);
    setTagsDatas(newTags);
  };

  return (
    <STagsContainer>
      {tagsDatas &&
        tagsDatas.map((taginfo, idx) => {
          return (
            <TagWithBtn
              key={idx}
              tag={taginfo.name}
              id={idx}
              tagRemover={tagRemover}
            ></TagWithBtn>
          );
        })}
      <SNoLineInput
        name="name"
        onKeyUp={inputValueChange}
        placeholder="태그를 추가해주세요."
      />
    </STagsContainer>
  );
};
export default TagsMaker;
