import styled from "styled-components";

const SSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface SelectProps {
  label: string;
  values: string[];
}
const SelectButton = ({ label, values }: SelectProps) => {
  return (
    <SSelectContainer>
      {/* <label htmlFor="">{label}</label> */}
      <select name={label} required>
        <option value="">{label}</option>
        {values.map((value, idx) => {
          return (
            <option value={value} key={idx}>
              {value}
            </option>
          );
        })}
      </select>
    </SSelectContainer>
  );
};
export default SelectButton;
