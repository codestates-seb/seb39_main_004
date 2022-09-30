import { RadioBtn } from "./indexNewRecipe";
import { IImgRadioProps } from "../../types/interface";

const categoryImgsLink = [
  { rice: "" },
  { noddle: "" },
  { dessert: "" },
  { beverage: "" },
  { etc: "" },
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
