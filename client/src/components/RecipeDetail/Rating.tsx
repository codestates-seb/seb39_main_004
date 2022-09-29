import React from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";

const SRating = styled.div`
  padding: 15px 0;
`;

const Rating = () => {
  return (
    <>
      <SRating>
        {[1, 2, 3, 4, 5].map((i) => {
          return <AiFillStar key={i} size="22px" color="#ff5936" />;
        })}
      </SRating>
    </>
  );
};

export default Rating;
