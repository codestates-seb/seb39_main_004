import styled from "styled-components";
import { FaRegLightbulb } from "react-icons/fa";

const SGuideText = styled.p`
  color: var(--gray);
  float: right;
  font-size: 1.2rem;
  @media ${({ theme }) => theme.device.dasktop} {
    font-size: 1rem;
  }
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 0.8rem;
    padding-top: 10px;
  }
`;

const Guide = ({ text }: { text: string }) => {
  return (
    <SGuideText>
      <FaRegLightbulb size={14} />
      {text}
    </SGuideText>
  );
};
export default Guide;
