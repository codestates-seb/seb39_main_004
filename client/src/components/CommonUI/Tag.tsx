import styled from "styled-components";
import { ITagProps } from "../../types/interface";

const STag = styled.span`
  margin: 0 4px;
  color: var(--gray);

  ::before {
    color: var(--yellow);
    content: "#";
  }
`;

const Tag = ({ name }: ITagProps) => {
  return <STag>{name}</STag>;
};

export default Tag;
