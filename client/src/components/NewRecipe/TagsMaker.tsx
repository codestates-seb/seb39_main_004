import React, { useEffect, useState } from "react";
import { ITagsMakerProps } from "../../types/interface";
import { TypeOfTags } from "../../types/type";
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

const TagsMaker = ({ setTagsDatas, resTags }: ITagsMakerProps) => {
  const initialValue: string[] = [];
  if (resTags) {
    resTags.forEach((tag) => {
      const el = Object.values(tag)[0];
      initialValue.push(el);
    });
  }
  const [tags, setTags] = useState<string[]>(initialValue);

  const inputValueChange = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    const target = event.target as HTMLInputElement;
    if (event.key === "Enter") {
      setTags([...tags, target.value]);
      target.value = "";
    }
  };

  const tagRemover = (id: number) => {
    const newTags = tags.slice();
    newTags.splice(id, 1);
    setTags(newTags);
  };

  useEffect(() => {
    const newData: TypeOfTags[] = [];
    tags.forEach((tags) => {
      newData.push({ name: tags });
    });
    setTagsDatas(newData);
  }, [tags]);

  return (
    <STagsContainer>
      {tags.length > 0 &&
        tags.map((tag, idx) => {
          return (
            <TagWithBtn
              key={idx}
              tag={tag}
              id={idx}
              tagRemover={tagRemover}
            ></TagWithBtn>
          );
        })}
      <SNoLineInput
        type="text"
        onKeyUp={inputValueChange}
        placeholder="태그를 추가해주세요."
      />
    </STagsContainer>
  );
};
export default TagsMaker;
