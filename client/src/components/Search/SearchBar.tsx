import React, { useState } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { Tag } from "../CommonUI";

const SSearchLayout = styled.section`
  width: 100vw;
  background-color: var(--deep-green);
  z-index: 1;
`;

const SSearchBar = styled.div`
  margin: 20px;
  border-radius: 3px;
  background-color: var(--deep-green);
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 500px;
    font-size: 1rem;
    color: white;
    border: none;
    border-bottom: solid 1px white;
    background-color: var(--deep-green);
    outline: none;
  }

  button {
    cursor: pointer;
    color: white;
    font-size: 1.5rem;
  }
`;

const SSearchTagLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  background-color: var(--ivory);
`;

const SSearchWord = styled.div`
  color: var(--deep-green);
`;

const STagArea = styled.div`
  margin: 0 20px;
  border-bottom: 1px solid var(--deep-green);
`;

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value);
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

  const onTagClickHandler = (i: string) => {
    console.log(i);
  };

  return (
    <SSearchLayout>
      <form onSubmit={onSubmitHandler}>
        <SSearchBar>
          <input type="text" onChange={onChangeSearch} />
          <button type="submit">
            <BiSearch />
          </button>
        </SSearchBar>
      </form>
      <SSearchTagLayout>
        <SSearchWord>인기 검색어</SSearchWord>
        <STagArea>
          {["계란", "돼지고기", "파스타"].map((i) => (
            <Tag key={i} tagItem={i} />
          ))}
        </STagArea>
      </SSearchTagLayout>
    </SSearchLayout>
  );
};

export default SearchBar;
