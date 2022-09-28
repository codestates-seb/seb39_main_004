import styled from "styled-components";
import { FaRegLightbulb } from "react-icons/fa";

const SGuideText = styled.p`
  color: var(--gray);
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
