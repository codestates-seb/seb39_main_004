import styled from "styled-components";

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
  padding-right: 4rem;
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
  padding-right: 4rem;
  border: 2.5px solid var(--gray);
  border-style: solid none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 1.1rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.9rem;
  }
`;

export { SLable, SInput, STextarea };
