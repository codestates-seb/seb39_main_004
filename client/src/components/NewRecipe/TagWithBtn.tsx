import { ITagWithBtnProps } from "../../types/interface";
import styled from "styled-components";

const Stag = styled.span`
  margin: 0.5rem;
`;

const TagWithBtn = ({ tag, tagRemover, idx }: ITagWithBtnProps) => {
  return (
    <li>
      <Stag
        role="presentation"
        onClick={(): void => {
          tagRemover(idx);
        }}
      >
        {tag}
      </Stag>
    </li>
  );
};
export default TagWithBtn;
