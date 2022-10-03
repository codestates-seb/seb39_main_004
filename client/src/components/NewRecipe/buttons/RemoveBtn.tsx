import styled from "styled-components";
import { IRemoveBtnProps } from "../../../types/interface";
import { IoMdRemoveCircleOutline } from "react-icons/io";

export const SBtn = styled.button`
  position: absolute;
  right: 5px;
  top: 14px;
  color: var(--deep-gray);
  gap: 2.5rem;
  z-index: 1;
`;

const RemoveBtn = ({ removeHandler, idx }: IRemoveBtnProps) => {
  return (
    <SBtn type="button" onClick={() => removeHandler(idx)}>
      <IoMdRemoveCircleOutline size={38} />
    </SBtn>
  );
};
export default RemoveBtn;
