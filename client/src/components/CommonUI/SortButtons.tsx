import styled from "styled-components";

const SSortContainer = styled.ul`
  display: flex;
  gap: 1rem;
`;

interface Sort {
  sortValues: string[];
}

const SortButtons = ({ sortValues }: Sort) => {
  return (
    <SSortContainer>
      {sortValues.map((value, idx) => (
        <li key={idx}>{value}</li>
      ))}
    </SSortContainer>
  );
};
export default SortButtons;
