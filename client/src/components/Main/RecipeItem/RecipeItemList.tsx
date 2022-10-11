import styled from "styled-components";
import RecipeItem from "./RecipeItem";
import { IRecipeDataProps } from "../../../types/interface";
import theme from "../../../styles/Theme";

const SItemListLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 30px 35px;
  place-items: center;
  margin-top: 3rem;

  @media ${({ theme }) => theme.device.desktop} {
    grid-gap: 25px 20px;
    margin-top: 2rem;
    @media ${({ theme }) => theme.device.mobile} {
      margin-top: 1rem;
    }
  }
`;

const RecipeItemList = ({ mainData, searchData }: IRecipeDataProps) => {
  return (
    <SItemListLayout theme={theme}>
      {mainData &&
        mainData.map((i) => (
          <RecipeItem
            key={i.id}
            id={i.id}
            title={i.title}
            imgThumbNailUrl={i.imgThumbNailUrl}
            tags={i.tags}
            stars={i.stars}
            bookmarked={i.bookmarked}
            reviewCount={i.reviewCount}
            createDate={i.createDate}
          />
        ))}
      {searchData &&
        searchData.map((i) => (
          <RecipeItem
            key={i.id}
            id={i.id}
            title={i.title}
            imgThumbNailUrl={i.imgThumbNailUrl}
            tags={i.tags}
            stars={i.stars}
            bookmarked={i.bookmarked}
            reviewCount={i.reviewCount}
            createDate={i.createDate}
          />
        ))}
    </SItemListLayout>
  );
};

export default RecipeItemList;
