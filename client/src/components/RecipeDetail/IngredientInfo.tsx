import React from "react";
import styled from "styled-components";
import { IInputIngredientSection } from "../../types/interface";

const SIngredientItem = styled.div`
  width: 50%;
  display: inline-block;
  dl {
    width: 100%;
    display: inline-grid;
    align-items: center;
    grid-template-columns: 3fr 1fr;
    padding: 15px 50px;
    font-size: 1.2rem;
  }
  dd {
    justify-self: end;
  }
  p {
    display: inline-grid;
    place-items: center;
    -webkit-box-align: center;
    grid-template-columns: auto auto;
  }
  input {
    transform: scale(1.8);
    margin-right: 15px;
  }
  @media ${({ theme }) => theme.device.desktop} {
    dl {
      padding: 11px;
      font-size: 1rem;
    }
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    dl {
      padding: 15px 0;
    }
    input {
      transform: scale(1.3);
      margin-right: 10px;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    dl {
      padding: 15px 0;
      font-size: 0.9rem;
    }
    input {
      transform: scale(1.3);
      margin-right: 10px;
    }
  }
`;

const EssentialTitle = styled.div`
  display: inline-grid;
  background-color: var(--gray);
  padding: 6px 8px;
  margin-left: 7px;
  font-size: 0.5rem;
  color: var(--ivory);
  vertical-align: 5px;
  border-radius: 15px;
`;

const IngredientItem = ({
  name,
  amount,
  isEssential,
}: IInputIngredientSection) => {
  return (
    <>
      <SIngredientItem>
        <dl>
          <dt>
            <p>
              <input type="checkbox" />
              {name}
            </p>
            {isEssential === true && <EssentialTitle>필수</EssentialTitle>}
          </dt>
          <dd>{amount}</dd>
        </dl>
      </SIngredientItem>
    </>
  );
};

export default IngredientItem;
