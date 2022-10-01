import React, { useEffect, useState } from "react";
import { ITagsMakerProps } from "../../types/interface";
import { TypeOfTags } from "../../types/type";
import { TagWithBtn } from "./indexNewRecipe";
import styled from "styled-components";

const STagsContainer = styled.ul`
  display: flex;
`;

const TagsMaker = ({ setTagsDatas }: ITagsMakerProps) => {
  const [tags, setTags] = useState<string[]>([]);

  const inputValueChange = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    const target = event.target as HTMLInputElement;
    if (event.key === "Enter") {
      setTags([...tags, target.value]);
      target.value = "";
    }
  };

  const tagRemover = (idx: number) => {
    const newTags = tags.slice();
    newTags.splice(idx, 1);
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
              idx={idx}
              tagRemover={tagRemover}
            ></TagWithBtn>
          );
        })}
      <input
        type="text"
        onKeyUp={inputValueChange}
        placeholder="태그를 추가해주세요."
      />
    </STagsContainer>
  );
};
export default TagsMaker;
