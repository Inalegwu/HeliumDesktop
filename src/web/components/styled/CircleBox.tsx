import styled from "styled-components";

export interface CircleBoxProps {
  backgroundColor: string;
}

export const CircleBox = styled.div`
  height: 500px;
  border-radius: 50%;
  position: absolute;
  z-index: 0;
  aspect-ratio: 1;
  background-color: ${(props: CircleBoxProps) =>
    props.backgroundColor ? props.backgroundColor : "#ECECECEC"};
`;
