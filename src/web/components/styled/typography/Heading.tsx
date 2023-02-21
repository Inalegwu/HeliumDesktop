import styled from "styled-components";

export const Heading = styled.h1`
  font-weight: lighter;
  color: ${(props) => (props.color ? props.color : "black")};
`;
