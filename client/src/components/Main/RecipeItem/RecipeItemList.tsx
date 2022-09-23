import styled from "styled-components";
import RecipeItem from "./RecipeItem";

const SItemListLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

const dummyData = [
  {
    id: 1,
    recipeTitle: "햄마요 덮밥",
    tag: ["#햄", "#마요네즈", "밥"],
    recipeImg:
      "https://ottogi.okitchen.co.kr/pds/upfile/2020-08-25_427865954[12].jpg",
    link: "/",
  },
  {
    id: 2,
    recipeTitle: "콘치즈",
    tag: ["#치즈", "#안주"],
    recipeImg:
      "https://ottogi.okitchen.co.kr/pds/upfile/2020-08-25_427863666[8].jpg",
    link: "/",
  },
  {
    id: 3,
    recipeTitle: "토마토 냉파스타",
    tag: ["#면", "#토마토"],
    recipeImg:
      "https://ottogi.okitchen.co.kr/pds/upfile/2020-08-25_427865954[2].jpg",
    link: "/",
  },
  {
    id: 4,
    recipeTitle: "카레 비프 스튜",
    tag: ["#카레", "#소고기", "메인"],
    recipeImg:
      "https://ottogi.okitchen.co.kr/pds/upfile/2020-08-25_427863666[2].jpg",
    link: "/",
  },
  {
    id: 5,
    recipeTitle: "햄마요 덮밥",
    tag: ["#햄", "#마요네즈", "밥"],
    recipeImg:
      "https://ottogi.okitchen.co.kr/pds/upfile/2020-08-25_427865954[12].jpg",
    link: "/",
  },
  {
    id: 6,
    recipeTitle: "콘치즈",
    tag: ["#치즈", "#안주"],
    recipeImg:
      "https://ottogi.okitchen.co.kr/pds/upfile/2020-08-25_427863666[8].jpg",
    link: "/",
  },
  {
    id: 7,
    recipeTitle: "토마토 냉파스타",
    tag: ["#면", "#토마토"],
    recipeImg:
      "https://ottogi.okitchen.co.kr/pds/upfile/2020-08-25_427865954[2].jpg",
    link: "/",
  },
  {
    id: 8,
    recipeTitle: "카레 비프 스튜",
    tag: ["#카레", "#소고기", "메인"],
    recipeImg:
      "https://ottogi.okitchen.co.kr/pds/upfile/2020-08-25_427863666[2].jpg",
    link: "/",
  },
];

const RecipeItemList = () => {
  return (
    <SItemListLayout>
      {dummyData.map((i) => (
        <RecipeItem
          key={i.id}
          id={i.id}
          recipeTitle={i.recipeTitle}
          tag={i.tag}
          recipeImg={i.recipeImg}
        />
      ))}
    </SItemListLayout>
  );
};

export default RecipeItemList;
