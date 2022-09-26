import React, { useState } from "react";
import styled from "styled-components";

const STagsContainer = styled.ul`
  display: flex;
`;

const TagsMaker = () => {
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

  return (
    <STagsContainer>
      {tags.length > 0 &&
        tags.map((tag, idx) => {
          return (
            <li key={idx}>
              <span>{tag}</span>
              <span>X</span>
            </li>
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
