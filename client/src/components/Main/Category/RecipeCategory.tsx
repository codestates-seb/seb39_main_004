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
import CategoryIcon from "./CategoryIcon";
import { ICategoryProps } from "../../../types/interface";

const SCategoryLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
`;

const SH1 = styled.h1`
  width: 100%;
  margin-bottom: 30px;
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--deep-green);
`;

const SCategoryList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-flow: row wrap;
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
    font-size: 1.1rem;
    margin: 1rem 0;
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
`;
const CategoryBox = styled.div``;

// const categories = [
//   { id: 1, img: rice, alt: "밥", text: "밥", link: "/" },
//   { id: 2, img: noodle, alt: "면", text: "면", link: "/" },
//   { id: 3, img: dessert, alt: "디저트", text: "디저트", link: "/" },
//   { id: 4, img: drink, alt: "음료", text: "음료", link: "/" },
//   { id: 5, img: etc, alt: "기타", text: "기타", link: "/" },
// ];

const RecipeCategory = ({ setCategory }: ICategoryProps) => {
  const onCategoryClick = (categoryValue: string) => {
    setCategory(categoryValue);
  };

  const [active, setActive] = useState(1);

  return (
    <SCategoryLayout>
      <SH1>레시피 분류</SH1>
      <CategoryList>
        <CategoryItem onClick={() => setActive(1)}>
          {active === 1 ? (
            <CategoryBox>
              <img src={rice_active} alt="rice-active" />
              <p className="f_yellow">밥</p>
            </CategoryBox>
          ) : (
            <CategoryBox>
              <img src={rice} alt="rice" />
              <p className="f_green">밥</p>
            </CategoryBox>
          )}
        </CategoryItem>
        <CategoryItem onClick={() => setActive(2)}>
          {active === 2 ? (
            <CategoryBox>
              <img src={noodle_active} alt="noodle_active" />
              <p className="f_yellow">면</p>
            </CategoryBox>
          ) : (
            <CategoryBox>
              <img src={noodle} alt="noodle" />
              <p className="f_green">면</p>
            </CategoryBox>
          )}
        </CategoryItem>
        <CategoryItem onClick={() => setActive(3)}>
          {active === 3 ? (
            <CategoryBox>
              <img src={dessert_active} alt="dessert_active" />
              <p className="f_yellow">디저트</p>
            </CategoryBox>
          ) : (
            <CategoryBox>
              <img src={dessert} alt="dessert" />
              <p className="f_green">디저트</p>
            </CategoryBox>
          )}
        </CategoryItem>
        <CategoryItem onClick={() => setActive(4)}>
          {active === 4 ? (
            <CategoryBox>
              <img src={drink_active} alt="drink_active" />
              <p className="f_yellow">음료</p>
            </CategoryBox>
          ) : (
            <CategoryBox>
              <img src={drink} alt="drink" />
              <p className="f_green">음료</p>
            </CategoryBox>
          )}
        </CategoryItem>
        <CategoryItem onClick={() => setActive(5)}>
          {active === 5 ? (
            <CategoryBox>
              <img src={etc_active} alt="etc_active" />
              <p className="f_yellow">기타</p>
            </CategoryBox>
          ) : (
            <CategoryBox>
              <img src={etc} alt="etc" />
              <p className="f_green">기타</p>
            </CategoryBox>
          )}
        </CategoryItem>
      </CategoryList>
      {/* <SCategoryList>
        {categories.map((i, idx) => (
          <CategoryIcon
            key={idx}
            img={i.img}
            alt={i.alt}
            text={i.text}
            link={i.link}
            clickEvent={onCategoryClick}
          />
        ))}
      </SCategoryList> */}
    </SCategoryLayout>
  );
};

export default RecipeCategory;
