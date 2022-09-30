import styled from "styled-components";
import mainDish from "../../../assets/icons/main_dish.svg";
import rice from "../../../assets/icons/rice.svg";
import pan from "../../../assets/icons/pot.svg";
import noodle from "../../../assets/icons/noodles.svg";
import bread from "../../../assets/icons/bread.svg";
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
  padding: 20px;
  font-size: 2rem;
  font-weight: bold;
`;

const SCategoryList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 50px;
  flex-flow: row wrap;
`;

const categories = [
  { id: 1, img: rice, alt: "밥", text: "밥", link: "/" },
  { id: 2, img: noodle, alt: "면", text: "면", link: "/" },
  { id: 3, img: bread, alt: "디저트", text: "디저트", link: "/" },
  { id: 4, img: mainDish, alt: "음료", text: "음료", link: "/" },
  { id: 5, img: pan, alt: "기타", text: "기타", link: "/" },
];

const RecipeCategory = ({ setCategory }: ICategoryProps) => {
  const onCategoryClick = (categoryValue: string) => {
    setCategory(categoryValue);
  };

  return (
    <SCategoryLayout>
      <SH1>레시피 분류</SH1>
      <SCategoryList>
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
      </SCategoryList>
    </SCategoryLayout>
  );
};

export default RecipeCategory;
