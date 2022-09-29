import styled from "styled-components";
import RecipeItem from "./RecipeItem";
import { SearchDataProps } from "../../../ts/interface";

const SItemListLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 64px 40px;
  place-items: center;
  margin-top: 3rem;

  // 임시 반응형 작업 (추후 중단점 수정 필요)
  @media screen and (max-width: 1300px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const RecipeItemList = ({ searchData }: SearchDataProps) => {
  console.log("RecipeItemList", searchData);

  return (
    <SItemListLayout>
      {searchData &&
        searchData.map((i) => (
          <RecipeItem
            key={i.id}
            id={i.id}
            title={i.title}
            imgThumbNailUrl={i.imgThumbNailUrl}
            tags={i.tags}
            stars={i.stars}
          />
        ))}
    </SItemListLayout>
  );
};

export default RecipeItemList;
