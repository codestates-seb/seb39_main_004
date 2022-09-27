import { useState } from "react";
import styled from "styled-components";

const STextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const STextarea = styled.textarea`
  width: 100%;
  height: 5rem;
  padding: 0.5rem;
`;

/** InputWithLabel에서 정의한 InputProps와 유사함 -> 재사용 검토 */
interface TextAreaProps {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  ref?: React.MutableRefObject<null>;
}

const TextareaWithLabel = ({ label, ...rest }: TextAreaProps) => {
  const [textValue, setTextValue] = useState("");
  return (
    <STextareaContainer>
      <label htmlFor="text">{label}</label>
      <STextarea
        {...rest}
        value={textValue}
        onChange={(e) => {
          setTextValue(e.target.value);
        }}
      />
    </STextareaContainer>
  );
};

export default TextareaWithLabel;
