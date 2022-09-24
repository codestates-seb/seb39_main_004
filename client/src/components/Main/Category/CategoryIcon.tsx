import styled from "styled-components";
import { Link } from "react-router-dom";

const SIconLayout = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100px;
  height: 100%;

  transition: 0.5s;
  color: #a4a4a4;
  &:hover {
    color: #db5f4c;
  }
`;

const SImage = styled.img`
  width: 80%;
`;

const SIconLink = styled(Link)`
  font-size: 0.8rem;
`;

const SIconText = styled.span`
  font-size: 1rem;
  margin: 1rem 0;
`;

interface IconProps {
  img: string;
  alt: string;
  text: string;
  link: string;
}

const CategoryIcon = ({ img, alt, text, link }: IconProps) => {
  return (
    <SIconLayout>
      <SIconLink to={link}>
        <SImage src={img} alt={alt} />
      </SIconLink>
      <SIconText>{text}</SIconText>
    </SIconLayout>
  );
};

export default CategoryIcon;