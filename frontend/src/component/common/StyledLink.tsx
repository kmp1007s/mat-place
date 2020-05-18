import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import * as theme from "colorTheme";

const StyledLink = styled(Link)`
  text-decoration: none;
  position: relative;
  color: ${theme.PRIMARY};
  z-index: 2;

  &:hover {
    color: ${theme.PRIMARY_DARK};
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 0%;
    height: 12%;
    background-color: ${theme.PRIMARY};
    bottom: 1px;
    left: 50%;
    // left: -5%;
    transform: translateX(-50%);
    z-index: 1;
    transition: all 0.5s;
  }

  &:hover::after {
    width: 101%;
    transition: all 0.5s;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default StyledLink;
