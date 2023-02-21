import styled from "styled-components";

export const Input = styled.input`
  padding: 12px;
  border: none;
  background: #ececec40;
  width: 100%;
  outline: none;
  backdrop-filter: blur(200px);
  border-radius: 5px;
  ::placeholder {
    color: #29292985;
  }

  :active {
    outline: none;
  }
`;
