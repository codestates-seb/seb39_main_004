import styled from "styled-components";

const SLogoRecipe = styled.img`
  width: 280px;
  margin: 4rem auto;
`;

const SLable = styled.label`
  color: var(--deep-green);
  font-size: 1.7rem;
  margin-bottom: 1rem;
`;

const SInput = styled.input`
  width: 100%;
  font-size: 1.4rem;
  padding: 1.2rem 2.3rem;
  border: 2.5px solid var(--gray);
  border-style: solid none;
  &:focus {
    outline: none;
  }
`;

const STextarea = styled.textarea`
  width: 100%;
  font-size: 1.4rem;
  padding: 1.2rem 2.3rem;
  border: 2.5px solid var(--gray);
  border-style: solid none;
  &:focus {
    outline: none;
  }
`;

export { SLable, SLogoRecipe, SInput, STextarea };
