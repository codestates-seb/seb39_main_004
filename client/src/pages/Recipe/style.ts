import styled from "styled-components";

export const SLogoRecipe = styled.img`
  width: 280px;
  margin: 4rem auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 160px;
    margin: 2rem auto;
  }
`;
export const SFormContainer = styled.main`
  max-width: 1280px;
  display: flex;
  flex-direction: column;
`;
export const SSection = styled.div`
  width: 100%;
  background-color: var(--greenish-grey);
  border: 3px solid ${(props) => props.color ?? "var(--pink)"};
  border-style: solid none;
  padding: 4rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.device.desktop} {
    padding: 2rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding: 1rem;
  }
`;
export const SFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  & > :first-child {
    margin-top: 3rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    & > :first-child {
      margin-top: 1rem;
    }
  }
`;
export const SRecipeInfo = styled.div`
  display: flex;
  gap: 2.5rem;
  @media ${({ theme }) => theme.device.tablet} {
    display: block;
  }
`;
export const SRecipeTexts = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  & > :nth-child(3) {
    margin-top: 1rem;
  }
`;
export const SButtonSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding-top: 2rem;
  @media ${({ theme }) => theme.device.tablet} {
    gap: 1rem;
  }
`;
export const SFormBtn = styled.button`
  background-color: ${(props) => props.color ?? "var(--pink)"};
  color: white;
  width: 280px;
  font-size: 1.6rem;
  padding: 1rem;
  border-radius: 3px;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.3rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 50%;
    font-size: 1rem;
  }
`;
