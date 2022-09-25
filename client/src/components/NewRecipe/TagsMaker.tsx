import React, { useState } from "react";
import styled from "styled-components";

const STagsContainer = styled.ul`
  display: flex;
`;

const TagsMaker = () => {
  const [tags, setTags] = useState<string[]>(["tag1", "tag2"]);

  const InputValueChange = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    console.log(event);
    console.log(event.key);
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
        onKeyUp={InputValueChange}
        placeholder="태그를 추가해주세요."
      />
    </STagsContainer>
  );
};
export default TagsMaker;
