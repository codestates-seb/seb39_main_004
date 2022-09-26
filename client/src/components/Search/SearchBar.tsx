import React, { useState } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { Button } from "../CommonUI";
import SearchResultList from "./SearchResultList";

const SSearchLayout = styled.section``;

const SSearchBar = styled.div`
  margin: 20px;
  width: 360px;
  height: 32px;
  border-radius: 3px;
  background-color: var(--white);
  border: solid 1px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 300px;
    border: none;
    outline: none;
  }

  &:last-child {
    cursor: pointer;
  }
`;

const SButtonLayout = styled.div`
  display: flex;
  padding: 10px 0;

  & > Button {
    margin: 0 10px;
  }
`;

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
    // 검색어 없을 경우 전체 리스트 반환
    if (search === null || search === "") {
      // 전체 데이터 axios call
    } else {
      // 검색어로 axios call
    }
  };

  return (
    <SSearchLayout>
      <form onSubmit={onSubmitHandler}>
        <SSearchBar>
          <input
            type="search"
            placeholder="검색어를 입력해주세요."
            onChange={onChangeSearch}
          />
          <BiSearch type="submit" />
        </SSearchBar>
        <SButtonLayout>
          <Button>이름순</Button>
          <Button>최신순</Button>
        </SButtonLayout>
      </form>
      {/* axios call에서 받은 data를 props로 내려주기 */}
      <SearchResultList />
    </SSearchLayout>
  );
};

export default SearchBar;
