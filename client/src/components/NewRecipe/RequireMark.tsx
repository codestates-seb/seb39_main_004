import styled from "styled-components";

const SRequiredMark = styled.span`
  color: var(--red);
  font-size: 2rem;
  margin-left: 0.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
  }
`;

const RequireMark = () => {
  return <SRequiredMark>*</SRequiredMark>;
};
export default RequireMark;
