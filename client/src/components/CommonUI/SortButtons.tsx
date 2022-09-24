import styled from "styled-components";

const SSortContainer = styled.section`
  display: flex;
  gap: 1rem;
`;

interface Sort {
  sortValues: string[];
  clickEvent?: (orderValue: string) => Promise<void> | void;
}

const SortButtons = ({ sortValues, clickEvent }: Sort) => {
  return (
    <SSortContainer>
      {sortValues.map((value, idx) => (
        <button
          key={idx}
          onClick={(e) => {
            e.preventDefault();
            clickEvent?.(value);
          }}
        >
          {value}
        </button>
      ))}
    </SSortContainer>
  );
};
export default SortButtons;
