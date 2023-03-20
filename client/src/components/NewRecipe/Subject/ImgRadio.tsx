import styled from "styled-components";
import { RadioBtn } from "../indexNewRecipe";
import ectYellow from "../../../assets/images/Recipe/ectYellow.svg";
import riceYellow from "../../../assets/images/Recipe/riceYellow.svg";
import dessertYellow from "../../../assets/images/Recipe/dessertYellow.svg";
import beverageYellow from "../../../assets/images/Recipe/beverageYellow.svg";
import noddleYellow from "../../../assets/images/Recipe/noddleYellow.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";

// import ectWhite from "../../../assets/images/Recipe/ectWhite.svg";
// import riceWhite from "../../../assets/images/Recipe/riceWhite.svg";
// import dessertWhite from "../../../assets/images/Recipe/dessertWhite.svg";
// import beverageWhite from "../../../assets/images/Recipe/beverageWhite.svg";
// import noddleWhite from "../../../assets/images/Recipe/noddleWhite.svg";
// const categoryImgsLink = [
//   {
//     name: "rice",
//     data: "밥",
//     icon: riceWhite,
//   },
//   {
//     name: "noddle",
//     data: "면",
//     icon: noddleWhite,
//   },
//   {
//     name: "dessert",
//     data: "디저트",
//     icon: dessertWhite,
//   },
//   {
//     name: "beverage",
//     data: "음료",
//     icon: beverageWhite,
//   },
//   {
//     name: "etc",
//     data: "기타",
//     icon: ectWhite,
//   },
// ];

const categoryImgsLink = [
  {
    name: "rice",
    data: "밥",
    icon: riceYellow,
  },
  {
    name: "noddle",
    data: "면",
    icon: noddleYellow,
  },
  {
    name: "dessert",
    data: "디저트",
    icon: dessertYellow,
  },
  {
    name: "beverage",
    data: "음료",
    icon: beverageYellow,
  },
  {
    name: "etc",
    data: "기타",
    icon: ectYellow,
  },
];

const SCategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${({ theme }) => theme.device.desktop} {
    gap: 15px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    gap: 5px;
    padding-bottom: 1rem;
  }
`;

const ImgRadio = () => {
  const pickCategory = useSelector(
    (state: RootState) => state.recipe.inputTexts.category
  );

  return (
    <SCategoryContainer>
      {categoryImgsLink.map((category, idx) => {
        const name = category.name;
        const data = category.data;
        const icon = category.icon;
        return (
          <RadioBtn
            key={idx}
            name={name}
            data={data}
            icon={icon}
            checked={data === pickCategory}
          />
        );
      })}
    </SCategoryContainer>
  );
};

export default ImgRadio;
