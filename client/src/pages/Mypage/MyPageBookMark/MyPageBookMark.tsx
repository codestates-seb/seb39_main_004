import React from "react";
import styled from "styled-components";
import { IBookMarkProps } from "../../../types/interface";
import { Link } from "react-router-dom";
import emptyLogo from "../../../assets/images/myPage/emptyLogo.png";

const SContainer = styled.div`
  display: grid;
  grid-template-columns: 130px auto;
  align-items: center;
  column-gap: 20px;
  padding: 30px 0;
  border-bottom: 1px solid var(--pale-gray);
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 100px auto;
    padding: 20px 0;
  }
`;
const SRecipeImg = styled.img`
  display: inline-block;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  background-color: var(--pale-gray);
  width: 130px;
  height: 130px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100px;
    height: 100px;
  }
`;

const SBookMarkCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
    p {
      font-size: 0.9rem;
    }
  }
`;

const SBookMarkTitle = styled.div`
  h2 {
    font-size: 1.1rem;
    padding-bottom: 15px;
  }
  span {
    color: var(--deep-gray);
    font-size: 0.9rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding-bottom: 10px;
    h2 {
      font-size: 1rem;
      padding-bottom: 5px;
    }
    span {
      font-size: 0.8rem;
    }
  }
`;

const SEmptyContainer = styled.div`
  display: table;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5rem;
  text-align: center;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.7rem;
  }
`;

const SEmptyLogo = styled.img`
  width: 100px;
  padding-bottom: 5px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 70px;
  }
`;

const MyPageBookMark = ({ bookMarkData }: IBookMarkProps) => {
  return (
    <>
      {bookMarkData.length > 0 ? (
        bookMarkData.map((data) => (
          <Link to={`/post/${data.id}`} key={data.id}>
            <SContainer>
              <SRecipeImg
                src={`${process.env.PUBLIC_URL}/assets/${data.imgThumbNailUrl}`}
              />

              <SBookMarkCont>
                <SBookMarkTitle>
                  <h2> {data.title}</h2>
                  <span>{data.createDate.slice(0, 16)}</span>
                </SBookMarkTitle>
                <p>{data.ownerNickName}</p>
              </SBookMarkCont>
            </SContainer>
          </Link>
        ))
      ) : (
        <SEmptyContainer>
          <SEmptyLogo src={emptyLogo} alt="logo" />
          <div>북마크가 없습니다.</div>
        </SEmptyContainer>
      )}
    </>
  );
};

export default MyPageBookMark;
