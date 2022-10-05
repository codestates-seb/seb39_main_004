import { ITagWithBtnProps } from "../../types/interface";
import { STag } from "../CommonUI/Tag";
import styled from "styled-components";

const SFormTag = styled(STag)`
  font-size: 1.1rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.9rem;
  }
`;

const TagWithBtn = ({ tag, tagRemover, id }: ITagWithBtnProps) => {
  return (
    <li>
      <SFormTag
        role="presentation"
        onClick={(): void => {
          tagRemover(id);
        }}
      >
        {tag}
      </SFormTag>
    </li>
  );
};
export default TagWithBtn;
