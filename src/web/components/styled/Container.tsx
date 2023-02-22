import styled from "styled-components";

export interface ContainerProps {
  background: string;
  textColor: string;
}

export const Container = styled.div`
  width: 30%;
  display: flex;
  /* background: linear-gradient(-60deg, #ececec32, #ececec24); */
  background: ${(props: ContainerProps) =>
    props.background ? props.background : "#FFFFFF"};
  flex-direction: column;
  color: ${(props: ContainerProps) =>
    props.textColor ? props.textColor : "#00000"};
  justify-content: space-between;
  backdrop-filter: blur(100px);
  /* border-right: 0.02px solid #ececec1f; */
`;
