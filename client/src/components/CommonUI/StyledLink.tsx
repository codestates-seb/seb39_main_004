import styled from "styled-components";
import { Link } from "react-router-dom";

const SLi = styled.li``;

const SLink = styled(Link)`
  font-size: 0.9rem;
  &:hover {
    color: gray;
  }
`;

interface LinkProps {
  to: string;
  children: string;
}

const StyledLink = ({ to, children }: LinkProps) => {
  return (
    <SLi>
      <SLink to={to}>{children}</SLink>
    </SLi>
  );
};

export default StyledLink;
