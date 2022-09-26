import styled from "styled-components";
//import { RecipeItemList } from "../../components/Main";
import SearchBar from "../../components/Search/SearchBar";

const SSearchLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: inherit;
  margin: 70px 0;
  padding: 0 200px;
  gap: 150px;
`;

const Search = () => {
  return (
    <SSearchLayout>
      <SearchBar />
      {/* <RecipeItemList /> */}
    </SSearchLayout>
  );
};

export default Search;
