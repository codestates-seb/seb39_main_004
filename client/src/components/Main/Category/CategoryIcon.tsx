import styled from "styled-components";
import { Link } from "react-router-dom";

const SIconLayout = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100px;
  height: 100%;

  color: var(--dark-gray);

  &:hover {
    transition: 0.3s;
    color: var(--red);
  }
`;

const SImage = styled.img`
  width: 80%;
`;

const SIconLink = styled(Link)`
  font-size: 0.8rem;
`;

const SIconText = styled.span`
  font-size: 1.3rem;
  margin: 1rem 0;
`;

interface IconProps {
  img: string;
  alt: string;
  text: string;
  link: string;
  clickEvent: (categoryValue: string) => void;
}

const CategoryIcon = ({ img, alt, text, link, clickEvent }: IconProps) => {
  return (
    <SIconLayout
      onClick={(e) => {
        e.preventDefault();
        clickEvent?.(text);
      }}
    >
      <SIconLink to={link}>
        <SImage src={img} alt={alt} />
      </SIconLink>
      <SIconText>{text}</SIconText>
    </SIconLayout>
  );
};

export default CategoryIcon;
