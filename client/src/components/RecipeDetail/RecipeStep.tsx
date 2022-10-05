import React from "react";
import styled from "styled-components";
import { IPostDirectionsProps } from "../../types/interface";

const SStepContainer = styled.div`
  display: grid;
  grid-template-columns: 730px auto;
  column-gap: 20px;
  margin-bottom: 30px;
  @media ${({ theme }) => theme.device.desktop} {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 20px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    row-gap: 15px;
  }
`;

const StepInfo = styled.div`
  h2 {
    color: var(--red);
    font-size: 1.5rem;
    padding-bottom: 20px;
  }
  span {
    padding-right: 5px;
  }
  p {
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    h2 {
      font-size: 1.2rem;
      padding-bottom: 10px;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

const SStepImg = styled.img`
  display: inline-block;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  object-fit: cover;
  @media ${({ theme }) => theme.device.mobile} {
    height: 270px;
  }
`;

const PostStep = ({ index, imgDirectionUrl, body }: IPostDirectionsProps) => {
  return (
    <>
      <SStepContainer>
        <StepInfo>
          <h2>
            <span>Step</span>
            {index}
          </h2>
          <p>{body}</p>
        </StepInfo>
        <SStepImg src={`${process.env.PUBLIC_URL}/assets/${imgDirectionUrl}`} />
      </SStepContainer>
    </>
  );
};

export default PostStep;
