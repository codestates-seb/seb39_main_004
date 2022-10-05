import { IRadioBtnProps } from "../../types/interface";
// import { useState } from "react";
import styled from "styled-components";

const SLabel = styled.label`
  &:hover {
    transform: scale(110%);
  }
  input:checked + img {
    filter: drop-shadow(0.1rem 0.4rem 0 var(--pink));
  }
  input {
    margin: 0;
    padding: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  img {
    width: 200px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    input:checked + img {
      filter: drop-shadow(0.1rem 0.2rem 0 var(--pink));
    }
  }
`;

const RadioBtn = ({
  name,
  data,
  icon,
  checked,
  setCheckedCateg,
}: IRadioBtnProps) => {
  return (
    <SLabel htmlFor={name}>
      <input
        type="radio"
        name="category"
        id={name}
        value={data}
        onChange={() => {
          setCheckedCateg(data);
        }}
        checked={checked}
      />
      <img src={icon} alt={name} />
    </SLabel>
  );
};
export default RadioBtn;
