import styled from "styled-components";
import { IRemoveBtnProps } from "../../../types/interface";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const SBtn = styled.button`
  color: var(--deep-gray);
`;

const RemoveBtn = ({ removeHandler }: IRemoveBtnProps) => {
  return (
    <SBtn type="button" onClick={removeHandler}>
      <IoMdRemoveCircleOutline size={22} />
    </SBtn>
  );
};
export default RemoveBtn;
