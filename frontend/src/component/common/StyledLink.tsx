import * as React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import * as theme from "schema/colors";

interface PropType {
  children: React.ReactNode;
  to: string;
  className?: string;
  color?: string;
  size?: string | number;
}

export default (props: PropType) => {
  const StyledLink = styled(Link)`
    text-decoration: none;
    position: relative;
    color: ${props.color || theme.PRIMARY};
    z-index: 2;
    font-size: ${props.size || 1}rem;

    &:hover {
      color: ${props.color || theme.PRIMARY_DARK};
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 0%;
      height: 12%;
      background-color: ${props.color || theme.PRIMARY};
      bottom: 1px;
      // left: 50%;
      left: -5%;
      transform: translateX(-50%);
      z-index: 1;
      transition: all 0.5s;
    }

    &:hover::after {
      width: 100%;
      transition: all 0.5s;
      left: 50%;
      transform: translateX(-50%);
    }
  `;

  return <StyledLink {...props} />;
};
