import React from "react";
import styled from "styled-components";
import { IPostInGredientProps } from "../../types/interface";

const SIngredientItem = styled.div`
  width: 50%;
  display: inline-block;
  dl {
    width: 100%;
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
    padding: 12px 20px;
    min-height: 30px;
  }
  dd {
    justify-self: end;
  }
`;

const IngredientItem = ({ name, amount, essential }: IPostInGredientProps) => {
  return (
    <>
      <SIngredientItem>
        <dl>
          <dt>
            <input type="checkbox" checked={essential} />
            {name}
          </dt>
          <dd>{amount}</dd>
        </dl>
      </SIngredientItem>
    </>
  );
};

export default IngredientItem;
