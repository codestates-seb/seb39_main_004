import styled from "styled-components";
import { useState } from "react";

const SSelectBtn = styled.button`
  background-color: aliceblue;
  /* width: 100%; */
  width: 150px;
  outline: solid;
  padding: 0.5rem 0.8rem;
  margin-left: 1rem;
  position: relative;
`;

const STextContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SOptionContainer = styled.ul`
  background-color: white;
  width: 100%;
  transform: translate(-0.8rem, 0.8rem);
  position: absolute;
  z-index: 1;
  li {
    height: 1.8rem;
    text-align: left;
    padding: 0.5rem 0.8rem;
  }
  & :hover {
    background-color: aliceblue;
  }
`;

interface SelectProps {
  label: string;
  values: string[];
}

const SelectButton = ({ label, values }: SelectProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  return (
    <>
      <SSelectBtn
        onClick={(e) => {
          e.preventDefault();
          setIsClicked(!isClicked);
        }}
      >
        <STextContainer>
          <div>{selectedValue ? selectedValue : label}</div>
          <span>아이콘</span>
        </STextContainer>
        {isClicked && (
          <SOptionContainer>
            {values.map((value, idx) => {
              return (
                <li
                  key={idx}
                  role="presentation"
                  onClick={() => {
                    setSelectedValue(value);
                  }}
                >
                  {value}
                </li>
              );
            })}
          </SOptionContainer>
        )}
      </SSelectBtn>
    </>
  );
};
export default SelectButton;
