import styled from "styled-components";

const SSortContainer = styled.section`
  display: flex;
  gap: 0.5rem;
  justify-content: right;
  align-items: center;
  color: var(--deep-gray);

  button {
    padding: 7px 10px;
    background-color: var(--pale-gray);
    font-size: 0.9rem;
    color: var(--gray);
    border-radius: 50px;
    &:active,
    &:focus {
      background-color: var(--pink);
      color: #fff;
      transition: 0.1s;
    }
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 0.6rem;
    }
  }

  div:last-child:after {
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
        <div key={idx}>
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              clickEvent?.(value);
            }}
          >
            {value}
          </button>
        </div>
      ))}
    </SSortContainer>
  );
};
export default SortButtons;
