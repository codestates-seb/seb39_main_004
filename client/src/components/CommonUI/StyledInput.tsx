import styled from "styled-components";

export const StyledInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px 0;

  label {
    font-size: 0.8rem;
    color: #333;
    margin-bottom: 0.25rem;
  }

  input {
    width: 100%;
    height: 45px;
    border: none;
    padding: 0.4rem;
    background: white;
    border-radius: 5px;
    font-size: 1rem;
    ::placeholder {
      color: #bbb;
    }
  }

  input:focus {
    outline: none;
  }

  small {
    color: var(--red);
  }
`;
