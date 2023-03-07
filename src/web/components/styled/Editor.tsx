import styled from "styled-components";

export interface EditorProps {
  placeholderColor?: string;
}

export const Editor = styled.textarea`
  width: 100%;
  height: 86vh;
  background: transparent;
  border: none;
  outline: none;
  caret-color: ${(props: EditorProps) =>
    props.placeholderColor ? props.placeholderColor : "#ECECEC"};
  ::placeholder {
    color: ${(props: EditorProps) =>
      props.placeholderColor ? props.placeholderColor : "#ECECEC"};
  }
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
