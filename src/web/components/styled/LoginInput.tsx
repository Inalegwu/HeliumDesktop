import styled from "styled-components";
import { Link } from "react-router-dom";

export const LoginInput = styled.button`
  padding: 10px;
  background: #ffffffc3;
  border-radius: 5px;
  width: 80%;
  height: 8%;
  border: none;
  outline: none;
  margin-top: 20px;

  :active {
    outline: none;
  }

  ::placeholder {
    color: #2b2b2bba;
  }
`;
