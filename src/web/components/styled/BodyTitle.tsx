import styled from "styled-components";

export interface BodyTitleProps {
  color: string;
}

export const BodyTitle = styled.input`
  background: transparent;
  height: 6vh;
  border: none;
  border-radius: 5px;
  width: 100%;
  font-size: 20px;
  ::placeholder {
    font-size: 20px;
  }
  outline: none;
  :active {
    outline: none;
  }
  color: ${(props: BodyTitleProps) => (props.color ? props.color : "#ECECEC")};
`;
