import styled from "styled-components";

export interface InputProps {
  placeholderColor?: string;
}

export const Input = styled.input`
  padding: 12px;
  border: none;
  background: #ececec40;
  width: 100%;
  outline: none;
  backdrop-filter: blur(200px);
  border-radius: 5px;
  ::placeholder {
    color: ${(props: InputProps) =>
      props.placeholderColor ? props.placeholderColor : "#29292985"};
  }

  :active {
    outline: none;
  }
`;
