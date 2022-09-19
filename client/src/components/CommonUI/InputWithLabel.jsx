import styled from "styled-components";

const SInputContainer = styled.div`
  & + & {
    margin-top: 1.5rem;
  }
`;

const SLabel = styled.div`
  font-size: 1rem;
  color: #c9c5c5;
  margin-bottom: 0.25rem;
`;

const SInput = styled.input`
  width: 100%;
  border: 1px solid gray;
  border-radius: 3px;
  padding: 0.4rem;
  ::placeholder {
    color: #bbb;
  }
`;

const InputWithLabel = ({ label, ...rest }) => {
  return (
    <SInputContainer>
      <SLabel>{label}</SLabel>
      <SInput {...rest} />
    </SInputContainer>
  );
};

export default InputWithLabel;
