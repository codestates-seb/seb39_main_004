import { IRadioBtnProps } from "../../types/interface";
import styled from "styled-components";

const SLabel = styled.label`
  background-color: aqua;
  &:hover {
    /* 호버했을떄 */
  }
  & input:checked + img {
    /* 선택된 아이템 표시 */
    border: 2px solid black;
  }
  input {
    margin: 0;
    padding: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

const RadioBtn = ({ keyValue, srcValue, setCheckedCateg }: IRadioBtnProps) => {
  return (
    <SLabel htmlFor={keyValue}>
      <input
        type="radio"
        name="category"
        id={keyValue}
        value={keyValue}
        onClick={() => {
          setCheckedCateg(keyValue);
        }}
      />
      <img src={srcValue} alt={keyValue} />
    </SLabel>
  );
};
export default RadioBtn;
