import styled from "styled-components";

export interface FlexContainerProps {
  background: string;
  blurred?: boolean;
}

export const FlexContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  z-index: 2;
  background: ${(props: FlexContainerProps) =>
    props.background ? props.background : "transparent"};
  backdrop-filter: blur(200px);
`;
