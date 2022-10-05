import React from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { IStarProps } from "../../types/interface";

const SRating = styled.div`
  padding: 15px 0;
  & svg {
    color: var(--gray);
    cursor: pointer;
  }
  :hover svg {
    transition: 0.3s;
    color: var(--red);
  }
  // hover된 별 이외의 나머지 별들은 회색 처리
  & svg:hover ~ svg {
    color: var(--gray);
  }
  // 클릭한 별 만큼 색이 남아있도록 처리
  .starColor {
    color: var(--red);
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    text-align: center;
  }
`;

const Rating = ({ starClicked, setStarClicked }: IStarProps) => {
  const handleStarClick = (index: number) => {
    const starClickState = [...(starClicked || [])];
    for (let i = 0; i < 5; i++) {
      starClickState[i] = i <= index ? true : false;
    }
    setStarClicked && setStarClicked(starClickState);
  };

  return (
    <>
      <SRating>
        {[0, 1, 2, 3, 4].map((i) => {
          return (
            <AiFillStar
              key={i}
              size="22px"
              onClick={() => handleStarClick(i)}
              className={starClicked && starClicked[i] ? "starColor" : ""}
            />
          );
        })}
      </SRating>
    </>
  );
};

export default Rating;
