import styled from "styled-components";

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;

  label {
    font-size: 1rem;
    color: #c9c5c5;
    margin-bottom: 0.25rem;
  }

  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid gray;
    padding: 0.4rem;

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
