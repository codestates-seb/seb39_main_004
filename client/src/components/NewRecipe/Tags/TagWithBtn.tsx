import { ITagWithBtnProps } from "../../../types/interface";
import { STag } from "../../CommonUI/Tag";
import styled from "styled-components";
import { useAppDispatch } from "../../../hooks/dispatchHook";
import { recipeActions } from "../../../redux/slices/recipeSlice";

const SFormTag = styled(STag)`
  font-size: 1.1rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.9rem;
  }
`;

const TagWithBtn = ({ tagValue, id }: ITagWithBtnProps) => {
  const dispatch = useAppDispatch();

  return (
    <li>
      <SFormTag
        role="presentation"
        onClick={() => {
          dispatch(recipeActions.removeTag(id));
        }}
      >
        {tagValue}
      </SFormTag>
    </li>
  );
};
export default TagWithBtn;
