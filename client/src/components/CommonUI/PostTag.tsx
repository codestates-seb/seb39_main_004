import styled from "styled-components";
import { ITagProps } from "../../types/interface";

export const STag = styled.span`
  margin: 0 4px;
  background-color: #fff;
  padding: 5px 7px;
  color: var(--deep-green);
  font-size: 0.9rem;
  line-height: 35px;
  border-radius: 15px;
  white-space: nowrap;
  ::before {
    color: var(--deep-green);
    content: "#";
  }
`;

const Tag = ({ name }: ITagProps) => {
  return <STag>{name}</STag>;
};

export default Tag;
