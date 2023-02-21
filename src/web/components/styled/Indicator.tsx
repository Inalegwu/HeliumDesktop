import styled from "styled-components";

export const Indicator = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.color ? props.color : "#ECECEC")};
`;
