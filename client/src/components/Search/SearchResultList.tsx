import styled from "styled-components";

const SListLayout = styled.div``;

const SUl = styled.ul`
  display: flex;
  li {
    margin: 10px;
  }
`;

const SearchResultList = () => {
  return (
    <SListLayout>
      <SUl>
        <li>제목</li>
        <li>시간</li>
      </SUl>
      {/* props로 받아온 데이터 map 돌리기 */}
    </SListLayout>
  );
};

// 제목, 시간

export default SearchResultList;
