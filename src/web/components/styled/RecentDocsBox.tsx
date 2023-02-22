import styled from "styled-components";

export interface RecentDocsBoxProps {
  background?: string;
}

export const RecentDocsBox = styled.div`
  background: ${(props: RecentDocsBoxProps) =>
    props.background ? props.background : "white"};
  width: 80%;
  margin: auto;
  height: 80vh;
  border-radius: 10px;
  backdrop-filter: blur(500px);
`;
