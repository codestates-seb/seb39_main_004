import React from "react";
import styled from "styled-components";

const SStepContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  column-gap: 20px;
  margin-bottom: 30px;

  h2 {
    font-size: 1.5rem;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
  }
`;

const SStepImg = styled.div`
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 250px;
  img {
    height: 100%;
  }
`;

interface Prop {
  direcId: number;
  image: string;
  body: string;
}

const PostStep = ({ image, body }: Prop) => {
  return (
    <>
      <SStepContainer>
        <h2>{body}</h2>
        <SStepImg>
          <img src={image} alt="stepImage" />
        </SStepImg>
      </SStepContainer>
    </>
  );
};

export default PostStep;
