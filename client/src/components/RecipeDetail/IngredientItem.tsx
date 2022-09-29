import React from "react";
import styled from "styled-components";

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

interface Prop {
  id: number;
  name: string;
  amount: string;
  isEssential: boolean;
}

const IngredientItem = ({ name, amount }: Prop) => {
  return (
    <>
      <SIngredientItem>
        <dl>
          <input type="checkbox" />
          <dt>{name}</dt>
          <dd>{amount}</dd>
        </dl>
      </SIngredientItem>
    </>
  );
};

export default IngredientItem;
