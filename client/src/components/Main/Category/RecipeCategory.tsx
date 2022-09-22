import styled from "styled-components";
import main from "../../../assets/icons/main-dish.png";
import rice from "../../../assets/icons/rice.png";
import pan from "../../../assets/icons/pan.png";
import noodle from "../../../assets/icons/noodles.png";
import bread from "../../../assets/icons/bread.png";
import CategoryIcon from "./CategoryIcon";

const SCategoryLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SH1 = styled.h1`
  width: 100%;
  padding: 20px;
  font-size: 2rem;
`;

const SCategoryList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 50px;
  flex-flow: row wrap;
`;

const categories = [
  { id: 1, img: main, alt: "메인", text: "메인", link: "/" },
  { id: 2, img: rice, alt: "밥", text: "밥", link: "/" },
  { id: 3, img: pan, alt: "국/탕", text: "국/탕", link: "/" },
  { id: 4, img: noodle, alt: "면", text: "면", link: "/" },
  { id: 5, img: bread, alt: "빵", text: "빵", link: "/" },
];

const RecipeCategory = () => {
  return (
    <SCategoryLayout>
      <SH1>레시피 분류</SH1>
      <SCategoryList>
        {categories.map((i) => (
          <CategoryIcon
            key={i.id}
            img={i.img}
            alt={i.alt}
            text={i.text}
            link={i.link}
          />
        ))}
      </SCategoryList>
    </SCategoryLayout>
  );
};

export default RecipeCategory;
