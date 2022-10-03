import { useState } from "react";
import styled from "styled-components";

const STextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
  label {
    font-size: 0.8rem;
    color: #333;
    margin-bottom: 0.25rem;
  }
`;

const STextarea = styled.textarea`
  width: 100%;
  height: 5rem;
  padding: 0.5rem;
  border: none;
  font-size: 1rem;
  ::placeholder {
    color: #bbb;
  }
`;

/** InputWithLabel에서 정의한 InputProps와 유사함 -> 재사용 검토 */
interface TextAreaProps {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
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
