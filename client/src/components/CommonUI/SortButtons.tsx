import styled from "styled-components";

const SSortContainer = styled.ul`
  display: flex;
  gap: 1rem;
`;

interface Sort {
  sortValues: string[];
}

const filterHandler = (orderValue: string) => {
  console.log(orderValue); // 정렬 관련 서버 기능 구현 후 동작 처리하겠습니다.
};

const SortButtons = ({ sortValues }: Sort) => {
  return (
    <SSortContainer>
      {sortValues.map((value, idx) => (
        <li
          key={idx}
          role="presentation"
          onClick={() => {
            filterHandler(value);
          }}
          onKeyDown={() => {
            filterHandler(value);
          }}
        >
          {value}
        </li>
      ))}
    </SSortContainer>
  );
};
export default SortButtons;
