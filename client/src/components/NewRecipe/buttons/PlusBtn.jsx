import styled from "styled-components";
import { HiPlusCircle } from "react-icons/hi";

const SBtn = styled.button`
  color: var(--deep-green);
  @media ${({ theme }) => theme.device.tablet} {
    svg {
      width: 35px;
    }
  }
`;

const PlusBtn = ({ addHandler }) => {
  return (
    <SBtn type="button" onClick={addHandler}>
      <HiPlusCircle size={50} />
    </SBtn>
  );
};
export default PlusBtn;
