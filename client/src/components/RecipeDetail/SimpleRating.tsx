import React from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";

const SRating = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  & svg {
    font-size: 1.5rem;
    color: var(--red);
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
