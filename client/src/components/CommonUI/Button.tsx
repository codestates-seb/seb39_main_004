import styled from "styled-components";

const SButton = styled.button`
  background: var(--deep-green);
  user-select: none; // drag 방지
  border-radius: 0.2rem;
  width: 100%;
  line-height: 45px;
  color: white;
  font-size: 1.1rem;
  transition: 0.2s all;
  cursor: pointer;
  &:hover {
    background: var(--red);
  }
  @media ${({ theme }) => theme.device.mobile} {
    line-height: 40px;
    font-size: 0.9rem;
  }
`;

interface ButtonProps {
  children: string;
  type?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return <SButton onClick={onClick}>{children}</SButton>;
};

export default Button;
