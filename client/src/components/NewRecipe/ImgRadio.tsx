import { RadioBtn } from "./indexNewRecipe";
import { IImgRadioProps } from "../../types/interface";

const categoryImgsLink = [
  { rice: "../../assets/category/rice.png" },
  { noddle: "../../assets/category/noddle.png" },
  { dessert: "../../assets/category/dessert.svg" },
  { beverage: "../../assets/category/beverage.png" },
  { etc: "../../assets/category/etc.svg" },
];

const ImgRadio = ({ setCheckedCateg }: IImgRadioProps) => {
  return (
    <>
      {categoryImgsLink.map((category, idx) => {
        const keyValue = Object.keys(category)[0];
        const srcValue = Object.values(category)[0];
        return (
          <RadioBtn
            key={idx}
            keyValue={keyValue}
            srcValue={srcValue}
            setCheckedCateg={setCheckedCateg}
          />
        );
      })}
    </>
  );
};

export default ImgRadio;
