import styled from "styled-components";
import { SortButtons } from "../CommonUI";
import { RecipeItemList } from "../Main";
import { SearchDataProps } from "../../ts/interface";

const SSortArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SResultTitle = styled.div`
  font-size: 1.5rem;
`;

const SearchResultList = ({ searchData, setSearchSortBy }: SearchDataProps) => {
  const onSortClick = (sortValue: string) => {
    if (sortValue === "최신순") {
      setSearchSortBy && setSearchSortBy("id");
    } else if (sortValue === "조회순") {
      setSearchSortBy && setSearchSortBy("views");
    } else if (sortValue === "평점순") {
      setSearchSortBy && setSearchSortBy("stars");
    }
  };

  return (
    <div>
      <SSortArea>
        <SResultTitle>
          검색 결과 {searchData && searchData.length}개
        </SResultTitle>
        <SortButtons
          sortValues={["최신순", "조회순", "평점순"]}
          clickEvent={onSortClick}
        />
      </SSortArea>

      <RecipeItemList searchData={searchData} />
    </div>
  );
};

export default SearchResultList;
