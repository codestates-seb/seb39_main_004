import styled from "styled-components";

const STag = styled.span`
  margin: 0 4px;
  color: var(--gray);

  ::before {
    color: var(--yellow);
    content: "#";
  }
`;

interface TagProps {
  tagItem: string;
}

const Tag = ({ tagItem }: TagProps) => {
  return <STag>{tagItem}</STag>;
};

export default Tag;
