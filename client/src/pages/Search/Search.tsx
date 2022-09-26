import styled from "styled-components";
import SearchBar from "../../components/Search/SearchBar";
import SearchResultList from "../../components/Search/SearchResultList";

const SSearchLayout = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 150px;
`;

const SSearchResult = styled.div`
  width: 100%;
  margin-bottom: 200px;
  padding: 0 150px;

  // 임시 반응형 작업 (추후 중단점 수정 필요)
  @media screen and (max-width: 1000px) {
    padding: 0 20px;
  }
`;

const Search = () => {
  return (
    <SSearchLayout>
      <SearchBar />
      <SSearchResult>
        <SearchResultList />
      </SSearchResult>
    </SSearchLayout>
  );
};

export default Search;
