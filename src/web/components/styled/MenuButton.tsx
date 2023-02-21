import styled from "styled-components";

export const MenuButton = styled.button`
  border: none;
  background: ${(props) => (props.color ? props.color : "#ECECEC")};
  height: 12px;
  width: 12px;
  border-radius: 50%;
  margin-left: 3px;
  margin-right: 3px;

  active: {
    border: none;
    outline: none;
  }

  :hover {
    animation: bounce 10ms infinite;
  }

  @keyframes bounce {
    from {
      transform: translateY(10);
    }
    to {
      transform: translateY(-10);
    }
  }
`;
