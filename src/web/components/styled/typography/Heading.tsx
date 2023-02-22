import styled from "styled-components";

export interface HeadingProps {
  color?: string;
}

export const Heading = styled.h1`
  font-weight: lighter;
  color: ${(props: HeadingProps) => (props.color ? props.color : "black")};
`;
