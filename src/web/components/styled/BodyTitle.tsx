import styled from "styled-components";

export const BodyTitle = styled.h1`
  font-size: 30px;
  font-weight: normal;
  color: ${(props) => (props.color ? props.color : "#ECECEC")};
`;
