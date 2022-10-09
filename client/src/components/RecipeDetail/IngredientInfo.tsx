import React from "react";
import styled from "styled-components";
import { IPostInGredientProps } from "../../types/interface";

const SIngredientItem = styled.div`
  width: 50%;
  display: inline-block;
  dl {
    width: 100%;
    display: inline-grid;
    grid-template-columns: 3fr 1fr;
    padding: 12px 20px;
    min-height: 30px;
    font-size: 1.1rem;
  }
  dd {
    justify-self: end;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    dl {
      padding: 15px 0;
      font-size: 0.9rem;
    }
  }
`;

const IngredientItem = ({
  name,
  amount,
  isEssential,
}: IPostInGredientProps) => {
  return (
    <>
      <SIngredientItem>
        <dl>
          <dt>
            <input type="checkbox" defaultChecked={isEssential} />
            {name}
          </dt>
          <dd>{amount}</dd>
        </dl>
      </SIngredientItem>
    </>
  );
};

export default IngredientItem;
