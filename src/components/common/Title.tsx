import React from "react";
import styled from "styled-components";
import { TITLE } from "constants/searchConst";
const Title = () => {
  return <STitle>{TITLE}</STitle>;
};
const STitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;
export default Title;
