import styled from "styled-components";
import { TagProps } from "../../ts/interface";

const STag = styled.span`
  margin: 0 4px;
  color: var(--gray);

  ::before {
    color: var(--yellow);
    content: "#";
  }
`;

const Tag = ({ name }: TagProps) => {
  return <STag>{name}</STag>;
};

export default Tag;
