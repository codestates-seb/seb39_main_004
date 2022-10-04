/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/Search/SearchBar";
import SearchResultList from "../../components/Search/SearchResultList";

const SSearchLayout = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const SSearchResult = styled.div`
  width: 100%;
  margin: 70px 0;
  @media ${({ theme }) => theme.device.tablet} {
    margin: 30px 0;
  }
`;

const Search = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchData, setSearchData] = useState<any[]>([]);
  const [searchSortBy, setSearchSortBy] = useState("id");

  return (
    <SSearchLayout>
      <SearchBar
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        setSearchData={setSearchData}
        searchSortBy={searchSortBy}
      />
      <SSearchResult>
        <SearchResultList
          searchData={searchData}
          setSearchSortBy={setSearchSortBy}
        />
      </SSearchResult>
    </SSearchLayout>
  );
};

export default Search;
