import styled from "styled-components";

export const Editor = styled.textarea`
  width: 100%;
  height: 86vh;
  background: transparent;
  border: none;
  outline: none;
  :active {
    outline: none;
  }
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  font-size: 20px;
  padding: 8px;
  overflow-y: scroll;
  overflow-wrap: break-word;
`;
