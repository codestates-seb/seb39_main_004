import React from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";

const SRating = styled.div`
  display: flex;
  gap: 0.4rem;
  font-size: 1rem;
  align-items: center;
  & svg {
    font-size: 1.3rem;
    color: var(--red);
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.9rem;
    & svg {
      font-size: 1.2rem;
    }
  }
`;

const SScore = styled.div``;

interface StarsProps {
  stars: number;
}

const SimpleRating = ({ stars }: StarsProps) => {
  return (
    <SRating>
      <AiFillStar />
      <SScore>{stars}</SScore>
    </SRating>
  );
};

export default SimpleRating;
