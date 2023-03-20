import styled from "styled-components";
import { IRemoveBtnProps } from "../../../types/interface";
import { IoMdRemoveCircleOutline } from "react-icons/io";

export const SBtn = styled.button`
  position: absolute;
  right: 5px;
  top: 8px;
  color: var(--deep-gray);
  gap: 2.5rem;
  z-index: 1;
  @media ${({ theme }) => theme.device.tablet} {
    top: 5px;
    svg {
      width: 25px;
    }
  }
`;

const RemoveBtn = ({ removeHandler, idx }: IRemoveBtnProps) => {
  return (
    <SBtn type="button" onClick={() => removeHandler(idx)}>
      <IoMdRemoveCircleOutline size={38} />
    </SBtn>
  );
};
export default RemoveBtn;
