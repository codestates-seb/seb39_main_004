import styled from "styled-components";

const SSortContainer = styled.section`
  display: flex;
  gap: 0.1rem;
  margin: 1rem;
  justify-content: right;
  align-items: center;
  font-size: 0.8rem;
  color: var(--gray);

  button:hover {
    transition: 0.1s;
    color: var(--red);
  }

  div:last-child {
    display: none;
  }
`;

interface Sort {
  sortValues: string[];
  clickEvent?: (orderValue: string) => Promise<void> | void;
}

const SortButtons = ({ sortValues, clickEvent }: Sort) => {
  return (
    <SSortContainer>
      {sortValues.map((value, idx) => (
        <>
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              clickEvent?.(value);
            }}
          >
            {value}
          </button>
          <div>|</div>
        </>
      ))}
    </SSortContainer>
  );
};
export default SortButtons;
