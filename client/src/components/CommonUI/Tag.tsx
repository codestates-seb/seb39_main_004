import styled from "styled-components";
import { ITagProps } from "../../types/interface";

export const STag = styled.span`
  margin: 0 7px 0 0;
  color: var(--gray);

  ::before {
    color: var(--yellow);
    content: "#";
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.9rem;
  }
`;

const Tag = ({ name }: ITagProps) => {
  return <STag>{name}</STag>;
};

export default Tag;
