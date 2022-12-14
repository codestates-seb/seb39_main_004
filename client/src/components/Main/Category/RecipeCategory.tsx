import styled from "styled-components";
import { useState } from "react";
import rice from "../../../assets/icons/rice.svg";
import rice_active from "../../../assets/icons/rice-active.svg";
import noodle from "../../../assets/icons/noodles.svg";
import noodle_active from "../../../assets/icons/noodles-active.svg";
import dessert from "../../../assets/icons/dessert.svg";
import dessert_active from "../../../assets/icons/dessert-active.svg";
import drink from "../../../assets/icons/drink.svg";
import drink_active from "../../../assets/icons/drink_active.svg";
import etc from "../../../assets/icons/etc.svg";
import etc_active from "../../../assets/icons/etc-active.svg";
import { ICategoryProps } from "../../../types/interface";

const SCategoryLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  @media ${({ theme }) => theme.device.tablet} {
    margin-bottom: 2rem;
  }
`;

const SH1 = styled.h1`
  width: 100%;
  margin-bottom: 30px;
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--deep-green);
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
    margin-bottom: 15px;
  }
`;

const CategoryItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  p {
    position: absolute;
    bottom: 25px;
    right: 0;
    left: 0;
    padding: 1rem 0;
    font-size: 1.1rem;
    @media ${({ theme }) => theme.device.desktop} {
      bottom: 10px;
      font-size: 0.9rem;
    }
    @media ${({ theme }) => theme.device.tablet} {
      bottom: 5px;
      font-size: 0.8rem;
    }
    @media ${({ theme }) => theme.device.mobile} {
      bottom: -10px;
      font-size: 0.6rem;
    }
  }
  .f_green {
    color: var(--deep-green);
  }
  .f_yellow {
    color: var(--yellow);
  }
`;

const CategoryList = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  @media ${({ theme }) => theme.device.desktop} {
    gap: 30px;
  }
  @media ${({ theme }) => theme.device.tablet} {
    gap: 3px;
  }
`;
const CategoryBox = styled.div``;

const RecipeCategory = ({ setCategory }: ICategoryProps) => {
  const onCategoryClick = (categoryValue: string) => {
    setCategory(categoryValue);
  };

  const [active, setActive] = useState(1);

  return (
    <SCategoryLayout>
      <SH1>????????? ??????</SH1>
      <CategoryList>
        <CategoryItem
          onClick={() => {
            setActive(1);
            onCategoryClick("???");
          }}
        >
          {active === 1 ? (
            <CategoryBox>
              <img src={rice_active} alt="rice-active" />
              <p className="f_yellow">???</p>
            </CategoryBox>
          ) : (
            <CategoryBox>
              <img src={rice} alt="rice" />
              <p className="f_green">???</p>
            </CategoryBox>
          )}
        </CategoryItem>
        <CategoryItem
          onClick={() => {
            setActive(2);
            onCategoryClick("???");
          }}
        >
          {active === 2 ? (
            <CategoryBox>
              <img src={noodle_active} alt="noodle_active" />
              <p className="f_yellow">???</p>
            </CategoryBox>
          ) : (
            <CategoryBox>
              <img src={noodle} alt="noodle" />
              <p className="f_green">???</p>
            </CategoryBox>
          )}
        </CategoryItem>
        <CategoryItem
          onClick={() => {
            setActive(3);
            onCategoryClick("?????????");
          }}
        >
          {active === 3 ? (
            <CategoryBox>
              <img src={dessert_active} alt="dessert_active" />
              <p className="f_yellow">?????????</p>
            </CategoryBox>
          ) : (
            <CategoryBox>
              <img src={dessert} alt="dessert" />
              <p className="f_green">?????????</p>
            </CategoryBox>
          )}
        </CategoryItem>
        <CategoryItem
          onClick={() => {
            setActive(4);
            onCategoryClick("??????");
          }}
        >
          {active === 4 ? (
            <CategoryBox>
              <img src={drink_active} alt="drink_active" />
              <p className="f_yellow">??????</p>
            </CategoryBox>
          ) : (
            <CategoryBox>
              <img src={drink} alt="drink" />
              <p className="f_green">??????</p>
            </CategoryBox>
          )}
        </CategoryItem>
        <CategoryItem
          onClick={() => {
            setActive(5);
            onCategoryClick("??????");
          }}
        >
          {active === 5 ? (
            <CategoryBox>
              <img src={etc_active} alt="etc_active" />
              <p className="f_yellow">??????</p>
            </CategoryBox>
          ) : (
            <CategoryBox>
              <img src={etc} alt="etc" />
              <p className="f_green">??????</p>
            </CategoryBox>
          )}
        </CategoryItem>
      </CategoryList>
    </SCategoryLayout>
  );
};

export default RecipeCategory;
