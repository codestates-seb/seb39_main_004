import styled from "styled-components";

const SButton = styled.button`
  background: #cecbcb;
  margin-top: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  cursor: pointer;
  user-select: none; // drag 방지
  border-radius: 0.2rem;
  width: 100%;
  transition: 0.2s all;
  &:hover {
    background: #857a7a;
  }

  &:active {
    background: gainsboro;
  }
`;

const Button = ({ children, onClick }) => {
  return <SButton onClick={onClick}>{children}</SButton>;
};

export default Button;
