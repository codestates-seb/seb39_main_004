import React from "react";
import styled from "styled-components";
import { IPostInGredientProps } from "../../types/interface";

const SIngredientItem = styled.div`
  width: 50%;
  display: inline-block;
  dt,
  dd {
    display: inline-block;
    padding: 10px 5px;
    min-height: 30px;
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
          <input type="checkbox" checked={isEssential} />
          <dt>{name}</dt>
          <dd>{amount}</dd>
        </dl>
      </SIngredientItem>
    </>
  );
};

export default IngredientItem;
