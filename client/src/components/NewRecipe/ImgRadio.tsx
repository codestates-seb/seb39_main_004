import { RadioBtn } from "./indexNewRecipe";
import { IImgRadioProps } from "../../types/interface";

const categoryImgsLink = [
  {
    name: "rice",
    data: "밥",
    icon: "https://www.mmz.today/static/media/rice.169de1433b358d8213feed3098e4a1ec.svg",
  },
  {
    name: "noddle",
    data: "면",
    icon: "https://www.mmz.today/static/media/rice.169de1433b358d8213feed3098e4a1ec.svg",
  },
  {
    name: "dessert",
    data: "디저트",
    icon: "https://www.mmz.today/static/media/rice.169de1433b358d8213feed3098e4a1ec.svg",
  },
  {
    name: "beverage",
    data: "음료",
    icon: "https://www.mmz.today/static/media/rice.169de1433b358d8213feed3098e4a1ec.svg",
  },
  {
    name: "etc",
    data: "기타",
    icon: "https://www.mmz.today/static/media/rice.169de1433b358d8213feed3098e4a1ec.svg",
  },
];

const ImgRadio = ({ setCheckedCateg, checkedCateg }: IImgRadioProps) => {
  return (
    <>
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
            setCheckedCateg={setCheckedCateg}
            checked={data === checkedCateg}
          />
        );
      })}
    </>
  );
};

export default ImgRadio;
