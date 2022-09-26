import styled from "styled-components";
import { SortButtons } from "../CommonUI";
import { RecipeItemList } from "../Main";

const SSearchResultLayout = styled.div``;

const SSortArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SResultTitle = styled.div`
  font-size: 1.3rem;
`;

const SearchResultList = () => {
  return (
    <SSearchResultLayout>
      <SSortArea>
        <SResultTitle>검색 결과 25개</SResultTitle>
        <SortButtons sortValues={["최신순", "조회순", "평점순"]} />
      </SSortArea>

      {/* axios call에서 받은 data를 props로 내려주고 map 돌리기 */}
      <RecipeItemList />
    </SSearchResultLayout>
  );
};

export default SearchResultList;
