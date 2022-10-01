import React from "react";
import styled from "styled-components";
import { IPostDirectionsProps } from "../../types/interface";

const SStepContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  column-gap: 20px;
  margin-bottom: 30px;
  h2 {
    font-size: 1.5rem;
  }
`;

const StepInfo = styled.div`
  h2 {
    color: var(--red);
    font-size: 1.2rem;
    padding-bottom: 20px;
  }
`;

const SStepImg = styled.img`
  display: inline-block;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const PostStep = ({ index, imgDirectionUrl, body }: IPostDirectionsProps) => {
  return (
    <>
      <SStepContainer>
        <StepInfo>
          <h2>Step{index}</h2>
          <p>{body}</p>
        </StepInfo>
        <SStepImg src={`${process.env.PUBLIC_URL}/assets/${imgDirectionUrl}`} />
      </SStepContainer>
    </>
  );
};

export default PostStep;
