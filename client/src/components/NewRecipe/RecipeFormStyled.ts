import styled from "styled-components";

const SLogoRecipe = styled.img`
  width: 280px;
  margin: 4rem auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 160px;
    margin: 2rem auto;
  }
`;

const SLable = styled.label`
  color: var(--deep-green);
  font-size: 1.3rem;
  margin-bottom: 1rem;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.1rem;
    margin-top: 1rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }
`;

const SInput = styled.input`
  width: 100%;
  font-size: 1.1rem;
  padding: 1rem;
  border: 2.5px solid var(--gray);
  border-style: solid none;
  &:focus {
    outline: none;
  }
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1rem;
    :nth-child(4) {
      padding-top: 1rem;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.9rem;
  }
`;

const STextarea = styled.textarea`
  width: 100%;
  font-size: 1.1rem;
  padding: 1rem;
  border: 2.5px solid var(--gray);
  border-style: solid none;
  &:focus {
    outline: none;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.9rem;
  }
`;

export { SLable, SLogoRecipe, SInput, STextarea };
